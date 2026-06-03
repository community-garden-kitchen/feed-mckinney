import { chromium } from "playwright";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { flatten, loadResources, pinNames } from "./lib-resources.mjs";

const STATE_DIR = join(process.cwd(), "scripts", "state");
const PROBE_FILE = join(STATE_DIR, "probe.json");
const PICKS_FILE = join(STATE_DIR, "picks.json");
const OUT_FILE = join(STATE_DIR, "map-links.json");
const SITE = "https://map2me.link";
const LINK_RE = /^https:\/\/map2me\.link\/.+/;

const readJson = (f, fallback) =>
	existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : fallback;
const writeJson = (f, data) =>
	writeFileSync(f, `${JSON.stringify(data, null, 2)}\n`);
const slug = (s) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")
		.slice(0, 50);

const newPage = async (browser) => {
	const page = await browser.newPage({
		viewport: { width: 1280, height: 1600 },
	});
	await page.goto(SITE, { waitUntil: "domcontentloaded", timeout: 60000 });
	await page.waitForSelector("#place-search", { timeout: 30000 });
	await page.waitForTimeout(2500);
	return page;
};

// Type an address and return the suggestion list [{index, id, text}].
const search = async (page, address) => {
	await page.fill("#place-search", "");
	await page.fill("#place-search", address);
	try {
		await page.waitForSelector("li[role=option]", {
			state: "visible",
			timeout: 7000,
		});
	} catch {
		return [];
	}
	await page.waitForTimeout(600);
	return page.$$eval("li[role=option]", (els) =>
		els.map((el, index) => ({
			index,
			id: el.id || null,
			text: (el.innerText || "").trim(),
		})),
	);
};

// Select suggestion[index], set the pin name, create the (permanent) link, return its URL.
const createLink = async (page, index, pinName) => {
	await page.click(`#search-result-${index}`);
	await page.waitForFunction(
		() => !!document.querySelector("#pin-address")?.value,
		null,
		{ timeout: 8000 },
	);
	const prev = (await page.getAttribute("#result-url", "href")) || "";
	await page.fill("#pin-name", "");
	await page.fill("#pin-name", pinName);
	await page.click("#btn-create");
	await page.waitForSelector("#btn-confirm-create", {
		state: "visible",
		timeout: 10000,
	});
	await page.click("#btn-confirm-create");
	// Wait for a NEW link value (not visibility — that was flaky and captured stale hrefs).
	await page.waitForFunction(
		(prevHref) => {
			const h =
				document.querySelector("#result-url")?.getAttribute("href") || "";
			return /^https:\/\/map2me\.link\/.+/.test(h) && h !== prevHref;
		},
		prev,
		{ timeout: 35000 },
	);
	const href = await page.getAttribute("#result-url", "href");
	if (!LINK_RE.test(href || "")) throw new Error(`bad link captured: ${href}`);
	return href;
};

const resetForm = async (page) => {
	await page.click("#btn-new-pin");
	await page.waitForSelector("#place-search", {
		state: "visible",
		timeout: 10000,
	});
	await page.waitForTimeout(500);
};

// ---- PROBE MODE: search every entry, capture suggestions + screenshot, no creation ----
const probe = async () => {
	mkdirSync(STATE_DIR, { recursive: true });
	const entries = flatten(await loadResources());
	const done = readJson(OUT_FILE, {});
	const probed = readJson(PROBE_FILE, {});
	const browser = await chromium.launch({ headless: true });
	const page = await newPage(browser);
	for (const e of entries) {
		if (done[e.address] || probed[e.address]) continue;
		const suggestions = await search(page, e.address);
		const shot = join(STATE_DIR, `probe-${slug(e.address)}.png`);
		await page.screenshot({ path: shot, fullPage: true });
		const { enPin, esPin } = pinNames(e);
		probed[e.address] = { ...e, enPin, esPin, suggestions, screenshot: shot };
		writeJson(PROBE_FILE, probed);
		console.log(`probed: ${e.address} -> ${suggestions.length} suggestion(s)`);
		for (const s of suggestions) console.log(`   [${s.index}] ${s.text}`);
		await resetForm(page).catch(() => {});
	}
	await browser.close();
	console.log(
		`\nPROBE DONE. ${Object.keys(probed).length} entries -> ${PROBE_FILE}`,
	);
};

// ---- CREATE MODE: for each picked entry, create en + es permanent links ----
const create = async () => {
	const probed = readJson(PROBE_FILE, {});
	const picks = readJson(PICKS_FILE, {});
	const out = readJson(OUT_FILE, {});
	const browser = await chromium.launch({ headless: true });
	let page = await newPage(browser);
	for (const [address, pick] of Object.entries(picks)) {
		if (out[address]) {
			console.log(`skip (done): ${address}`);
			continue;
		}
		const info = probed[address];
		if (!info) {
			console.log(`skip (no probe): ${address}`);
			continue;
		}
		const index = typeof pick === "number" ? pick : pick.index;
		try {
			await search(page, address);
			const en = await createLink(page, index, info.enPin);
			await resetForm(page);
			await search(page, address);
			const es = await createLink(page, index, info.esPin);
			await resetForm(page);
			out[address] = {
				en,
				es,
				enPin: info.enPin,
				esPin: info.esPin,
				suggestion: info.suggestions[index]?.text,
			};
			writeJson(OUT_FILE, out);
			console.log(`created: ${address}\n   en: ${en}\n   es: ${es}`);
		} catch (err) {
			console.log(`ERROR: ${address} -> ${err.message.split("\n")[0]}`);
			const shot = join(STATE_DIR, `fail-${slug(address)}.png`);
			await page.screenshot({ path: shot, fullPage: true }).catch(() => {});
			const dbg = await page
				.evaluate(() => ({
					resultUrl: document
						.querySelector("#result-url")
						?.getAttribute("href"),
					confirmVisible: !!document.querySelector("#btn-confirm-create")
						?.offsetParent,
					bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 400),
				}))
				.catch(() => ({}));
			console.log(`   DEBUG ${JSON.stringify(dbg)}`);
			console.log(`   shot -> ${shot}`);
			// fresh page so one failure doesn't poison the rest
			await page.close().catch(() => {});
			page = await newPage(browser);
		}
	}
	await browser.close();
	console.log(
		`\nCREATE DONE. ${Object.keys(out).length} entries -> ${OUT_FILE}`,
	);
};

const mode = process.argv[2];
if (mode === "probe") await probe();
else if (mode === "create") await create();
else {
	console.log("usage: node scripts/gen-map-links.mjs <probe|create>");
	process.exit(1);
}
