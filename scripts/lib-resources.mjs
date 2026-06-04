import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { join } from "node:path";

const SKIP_ADDRESS = "Varies by location";

// Transpile resources.ts (no runtime imports) and load its default export.
export const loadResources = async () => {
	const out = join(process.cwd(), "scripts", ".resources.gen.mjs");
	await build({
		entryPoints: ["src/data/resources.ts"],
		bundle: true,
		format: "esm",
		outfile: out,
		logLevel: "silent",
	});
	const mod = await import(`${pathToFileURL(out).href}?t=${Date.now()}`);
	return mod.default;
};

// Flatten top-level + nested additionalResources into in-scope entries,
// deduped by address, skipping the ungeocodable "Varies by location" parent.
export const flatten = (resources) => {
	const out = [];
	const seen = new Set();
	const walk = (r) => {
		if (r.address && r.address !== SKIP_ADDRESS && !seen.has(r.address)) {
			seen.add(r.address);
			out.push({ address: r.address, en: r.name.en, es: r.name.es });
		}
		for (const child of r.additionalResources ?? []) walk(child);
	};
	for (const r of resources) walk(r);
	return out;
};

// Pin-name rules (decided during grilling). en pin is always the English name.
export const pinNames = ({ en, es }) => {
	let esPin;
	if (es === en) esPin = es; // identical -> no parenthetical
	else if (en.includes("("))
		esPin = en; // en already parenthesised (St. Vincent)
	else if (es.includes("("))
		esPin = es; // es already parenthesised (Christ UMC)
	else esPin = `${es} (${en})`;
	return { enPin: en, esPin };
};
