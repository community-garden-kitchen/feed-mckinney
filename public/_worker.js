// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/types.js
var FetchEventLike = class {};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
	const paths = path.split("/");
	if (paths[0] === "") {
		paths.shift();
	}
	return paths;
};
var splitRoutingPath = (path) => {
	const groups = [];
	for (let i = 0; ; ) {
		let replaced = false;
		path = path.replace(/\{[^}]+\}/g, (m) => {
			const mark = `@\\${i}`;
			groups[i] = [mark, m];
			i++;
			replaced = true;
			return mark;
		});
		if (!replaced) {
			break;
		}
	}
	const paths = path.split("/");
	if (paths[0] === "") {
		paths.shift();
	}
	for (let i = groups.length - 1; i >= 0; i--) {
		const [mark] = groups[i];
		for (let j = paths.length - 1; j >= 0; j--) {
			if (paths[j].indexOf(mark) !== -1) {
				paths[j] = paths[j].replace(mark, groups[i][1]);
				break;
			}
		}
	}
	return paths;
};
var patternCache = {};
var getPattern = (label) => {
	if (label === "*") {
		return "*";
	}
	const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
	if (match) {
		if (!patternCache[label]) {
			if (match[2]) {
				patternCache[label] = [
					label,
					match[1],
					new RegExp("^" + match[2] + "$"),
				];
			} else {
				patternCache[label] = [label, match[1], true];
			}
		}
		return patternCache[label];
	}
	return null;
};
var getPath = (request) => {
	const match = request.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
	return match ? match[1] : "";
};
var getQueryStrings = (url) => {
	const queryIndex = url.indexOf("?", 8);
	return queryIndex === -1 ? "" : "?" + url.slice(queryIndex + 1);
};
var getPathNoStrict = (request) => {
	const result = getPath(request);
	return result.length > 1 && result[result.length - 1] === "/"
		? result.slice(0, -1)
		: result;
};
var mergePath = (...paths) => {
	let p = "";
	let endsWithSlash = false;
	for (let path of paths) {
		if (p[p.length - 1] === "/") {
			p = p.slice(0, -1);
			endsWithSlash = true;
		}
		if (path[0] !== "/") {
			path = `/${path}`;
		}
		if (path === "/" && endsWithSlash) {
			p = `${p}/`;
		} else if (path !== "/") {
			p = `${p}${path}`;
		}
		if (path === "/" && p === "") {
			p = "/";
		}
	}
	return p;
};
var checkOptionalParameter = (path) => {
	const match = path.match(/^(.+|)(\/\:[^\/]+)\?$/);
	if (!match) return null;
	const base = match[1];
	const optional = base + match[2];
	return [base === "" ? "/" : base.replace(/\/$/, ""), optional];
};
var _decodeURI = (value) => {
	if (!/[%+]/.test(value)) {
		return value;
	}
	if (value.indexOf("+") !== -1) {
		value = value.replace(/\+/g, " ");
	}
	return /%/.test(value) ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
	let encoded;
	if (!multiple && key && !/[%+]/.test(key)) {
		let keyIndex2 = url.indexOf(`?${key}`, 8);
		if (keyIndex2 === -1) {
			keyIndex2 = url.indexOf(`&${key}`, 8);
		}
		while (keyIndex2 !== -1) {
			const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
			if (trailingKeyCode === 61) {
				const valueIndex = keyIndex2 + key.length + 2;
				const endIndex = url.indexOf("&", valueIndex);
				return _decodeURI(
					url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex),
				);
			} else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
				return "";
			}
			keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
		}
		encoded = /[%+]/.test(url);
		if (!encoded) {
			return void 0;
		}
	}
	const results = {};
	encoded ?? (encoded = /[%+]/.test(url));
	let keyIndex = url.indexOf("?", 8);
	while (keyIndex !== -1) {
		const nextKeyIndex = url.indexOf("&", keyIndex + 1);
		let valueIndex = url.indexOf("=", keyIndex);
		if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
			valueIndex = -1;
		}
		let name = url.slice(
			keyIndex + 1,
			valueIndex === -1
				? nextKeyIndex === -1
					? void 0
					: nextKeyIndex
				: valueIndex,
		);
		if (encoded) {
			name = _decodeURI(name);
		}
		keyIndex = nextKeyIndex;
		if (name === "") {
			continue;
		}
		let value;
		if (valueIndex === -1) {
			value = "";
		} else {
			value = url.slice(
				valueIndex + 1,
				nextKeyIndex === -1 ? void 0 : nextKeyIndex,
			);
			if (encoded) {
				value = _decodeURI(value);
			}
		}
		if (multiple) {
			(results[name] ?? (results[name] = [])).push(value);
		} else {
			results[name] ?? (results[name] = value);
		}
	}
	return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
	return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/utils/cookie.js
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = (cookie, name) => {
	const pairs = cookie.trim().split(";");
	return pairs.reduce((parsedCookie, pairStr) => {
		pairStr = pairStr.trim();
		const valueStartPos = pairStr.indexOf("=");
		if (valueStartPos === -1) return parsedCookie;
		const cookieName = pairStr.substring(0, valueStartPos).trim();
		if ((name && name !== cookieName) || !validCookieNameRegEx.test(cookieName))
			return parsedCookie;
		let cookieValue = pairStr.substring(valueStartPos + 1).trim();
		if (cookieValue.startsWith('"') && cookieValue.endsWith('"'))
			cookieValue = cookieValue.slice(1, -1);
		if (validCookieValueRegEx.test(cookieValue))
			parsedCookie[cookieName] = decodeURIComponent_(cookieValue);
		return parsedCookie;
	}, {});
};
var _serialize = (name, value, opt = {}) => {
	let cookie = `${name}=${value}`;
	if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
		cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
	}
	if (opt.domain) {
		cookie += `; Domain=${opt.domain}`;
	}
	if (opt.path) {
		cookie += `; Path=${opt.path}`;
	}
	if (opt.expires) {
		cookie += `; Expires=${opt.expires.toUTCString()}`;
	}
	if (opt.httpOnly) {
		cookie += "; HttpOnly";
	}
	if (opt.secure) {
		cookie += "; Secure";
	}
	if (opt.sameSite) {
		cookie += `; SameSite=${opt.sameSite}`;
	}
	if (opt.partitioned) {
		cookie += "; Partitioned";
	}
	return cookie;
};
var serialize = (name, value, opt = {}) => {
	value = encodeURIComponent(value);
	return _serialize(name, value, opt);
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/utils/stream.js
var StreamingApi = class {
	constructor(writable) {
		this.writable = writable;
		this.writer = writable.getWriter();
		this.encoder = new TextEncoder();
	}
	async write(input) {
		try {
			if (typeof input === "string") {
				input = this.encoder.encode(input);
			}
			await this.writer.write(input);
		} catch (e) {}
		return this;
	}
	async writeln(input) {
		await this.write(input + "\n");
		return this;
	}
	sleep(ms) {
		return new Promise((res) => setTimeout(res, ms));
	}
	async close() {
		try {
			await this.writer.close();
		} catch (e) {}
	}
	async pipe(body) {
		this.writer.releaseLock();
		await body.pipeTo(this.writable, { preventClose: true });
		this.writer = this.writable.getWriter();
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var Context = class {
	constructor(req, options) {
		this.env = {};
		this._var = {};
		this.finalized = false;
		this.error = void 0;
		this._status = 200;
		this._h = void 0;
		this._pH = void 0;
		this._init = true;
		this._renderer = (content) => this.html(content);
		this.notFoundHandler = () => new Response();
		this.render = (...args) => this._renderer(...args);
		this.setRenderer = (renderer) => {
			this._renderer = renderer;
		};
		this.header = (name, value, options2) => {
			if (value === void 0) {
				if (this._h) {
					this._h.delete(name);
				} else if (this._pH) {
					delete this._pH[name.toLocaleLowerCase()];
				}
				if (this.finalized) {
					this.res.headers.delete(name);
				}
				return;
			}
			if (options2?.append) {
				if (!this._h) {
					this._init = false;
					this._h = new Headers(this._pH);
					this._pH = {};
				}
				this._h.append(name, value);
			} else {
				if (this._h) {
					this._h.set(name, value);
				} else {
					this._pH ?? (this._pH = {});
					this._pH[name.toLowerCase()] = value;
				}
			}
			if (this.finalized) {
				if (options2?.append) {
					this.res.headers.append(name, value);
				} else {
					this.res.headers.set(name, value);
				}
			}
		};
		this.status = (status) => {
			this._status = status;
		};
		this.set = (key, value) => {
			this._var ?? (this._var = {});
			this._var[key] = value;
		};
		this.get = (key) => {
			return this._var ? this._var[key] : void 0;
		};
		this.newResponse = (data, arg, headers) => {
			if (this._init && !headers && !arg && this._status === 200) {
				return new Response(data, {
					headers: this._pH,
				});
			}
			if (arg && typeof arg !== "number") {
				const res = new Response(data, arg);
				const contentType = this._pH?.["content-type"];
				if (contentType) {
					res.headers.set("content-type", contentType);
				}
				return res;
			}
			const status = arg ?? this._status;
			this._pH ?? (this._pH = {});
			this._h ?? (this._h = new Headers());
			for (const [k, v] of Object.entries(this._pH)) {
				this._h.set(k, v);
			}
			if (this._res) {
				this._res.headers.forEach((v, k) => {
					this._h?.set(k, v);
				});
				for (const [k, v] of Object.entries(this._pH)) {
					this._h.set(k, v);
				}
			}
			headers ?? (headers = {});
			for (const [k, v] of Object.entries(headers)) {
				if (typeof v === "string") {
					this._h.set(k, v);
				} else {
					this._h.delete(k);
					for (const v2 of v) {
						this._h.append(k, v2);
					}
				}
			}
			return new Response(data, {
				status,
				headers: this._h,
			});
		};
		this.body = (data, arg, headers) => {
			return typeof arg === "number"
				? this.newResponse(data, arg, headers)
				: this.newResponse(data, arg);
		};
		this.text = (text, arg, headers) => {
			if (!this._pH) {
				if (this._init && !headers && !arg) {
					return new Response(text);
				}
				this._pH = {};
			}
			if (this._pH["content-type"]) {
				this._pH["content-type"] = TEXT_PLAIN;
			}
			return typeof arg === "number"
				? this.newResponse(text, arg, headers)
				: this.newResponse(text, arg);
		};
		this.json = (object, arg, headers) => {
			const body = JSON.stringify(object);
			this._pH ?? (this._pH = {});
			this._pH["content-type"] = "application/json; charset=UTF-8";
			return typeof arg === "number"
				? this.newResponse(body, arg, headers)
				: this.newResponse(body, arg);
		};
		this.jsonT = (object, arg, headers) => {
			const response =
				typeof arg === "number"
					? this.json(object, arg, headers)
					: this.json(object, arg);
			return {
				response,
				data: object,
				format: "json",
				status: response.status,
			};
		};
		this.html = (html2, arg, headers) => {
			this._pH ?? (this._pH = {});
			this._pH["content-type"] = "text/html; charset=UTF-8";
			return typeof arg === "number"
				? this.newResponse(html2, arg, headers)
				: this.newResponse(html2, arg);
		};
		this.redirect = (location, status = 302) => {
			this._h ?? (this._h = new Headers());
			this._h.set("Location", location);
			return this.newResponse(null, status);
		};
		this.streamText = (cb, arg, headers) => {
			headers ?? (headers = {});
			this.header("content-type", TEXT_PLAIN);
			this.header("x-content-type-options", "nosniff");
			this.header("transfer-encoding", "chunked");
			return this.stream(cb, arg, headers);
		};
		this.stream = (cb, arg, headers) => {
			const { readable, writable } = new TransformStream();
			const stream = new StreamingApi(writable);
			cb(stream).finally(() => stream.close());
			return typeof arg === "number"
				? this.newResponse(readable, arg, headers)
				: this.newResponse(readable, arg);
		};
		this.cookie = (name, value, opt) => {
			const cookie = serialize(name, value, opt);
			this.header("set-cookie", cookie, { append: true });
		};
		this.notFound = () => {
			return this.notFoundHandler(this);
		};
		this.req = req;
		if (options) {
			this._exCtx = options.executionCtx;
			this.env = options.env;
			if (options.notFoundHandler) {
				this.notFoundHandler = options.notFoundHandler;
			}
		}
	}
	get event() {
		if (this._exCtx instanceof FetchEventLike) {
			return this._exCtx;
		} else {
			throw Error("This context has no FetchEvent");
		}
	}
	get executionCtx() {
		if (this._exCtx) {
			return this._exCtx;
		} else {
			throw Error("This context has no ExecutionContext");
		}
	}
	get res() {
		this._init = false;
		return (
			this._res || (this._res = new Response("404 Not Found", { status: 404 }))
		);
	}
	set res(_res) {
		this._init = false;
		if (this._res && _res) {
			this._res.headers.delete("content-type");
			this._res.headers.forEach((v, k) => {
				_res.headers.set(k, v);
			});
		}
		this._res = _res;
		this.finalized = true;
	}
	get var() {
		return { ...this._var };
	}
	get runtime() {
		const global = globalThis;
		if (global?.Deno !== void 0) {
			return "deno";
		}
		if (global?.Bun !== void 0) {
			return "bun";
		}
		if (typeof global?.WebSocketPair === "function") {
			return "workerd";
		}
		if (typeof global?.EdgeRuntime === "string") {
			return "edge-light";
		}
		if (global?.fastly !== void 0) {
			return "fastly";
		}
		if (global?.__lagon__ !== void 0) {
			return "lagon";
		}
		if (global?.process?.release?.name === "node") {
			return "node";
		}
		return "other";
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
	const middlewareLength = middleware.length;
	return (context, next) => {
		let index = -1;
		return dispatch(0);
		function dispatch(i) {
			if (i <= index) {
				throw new Error("next() called multiple times");
			}
			let handler = middleware[i];
			index = i;
			if (i === middlewareLength && next) handler = next;
			let res;
			let isError = false;
			if (!handler) {
				if (
					context instanceof Context &&
					context.finalized === false &&
					onNotFound
				) {
					res = onNotFound(context);
				}
			} else {
				try {
					res = handler(context, () => {
						const dispatchRes = dispatch(i + 1);
						return dispatchRes instanceof Promise
							? dispatchRes
							: Promise.resolve(dispatchRes);
					});
				} catch (err) {
					if (err instanceof Error && context instanceof Context && onError) {
						context.error = err;
						res = onError(err, context);
						isError = true;
					} else {
						throw err;
					}
				}
			}
			if (!(res instanceof Promise)) {
				if (res !== void 0 && "response" in res) {
					res = res["response"];
				}
				if (res && (context.finalized === false || isError)) {
					context.res = res;
				}
				return context;
			} else {
				return res
					.then((res2) => {
						if (res2 !== void 0 && "response" in res2) {
							res2 = res2["response"];
						}
						if (res2 && context.finalized === false) {
							context.res = res2;
						}
						return context;
					})
					.catch(async (err) => {
						if (err instanceof Error && context instanceof Context && onError) {
							context.error = err;
							context.res = await onError(err, context);
							return context;
						}
						throw err;
					});
			}
		}
	};
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/http-exception.js
var HTTPException = class extends Error {
	constructor(status = 500, options) {
		super(options?.message);
		this.res = options?.res;
		this.status = status;
	}
	getResponse() {
		if (this.res) {
			return this.res;
		}
		return new Response(this.message, {
			status: this.status,
		});
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/utils/body.js
var parseBody = async (request) => {
	let body = {};
	const contentType = request.headers.get("Content-Type");
	if (
		contentType &&
		(contentType.startsWith("multipart/form-data") ||
			contentType.startsWith("application/x-www-form-urlencoded"))
	) {
		const formData = await request.formData();
		if (formData) {
			const form = {};
			formData.forEach((value, key) => {
				if (key.slice(-2) === "[]") {
					if (!form[key]) {
						form[key] = [value.toString()];
					} else {
						if (Array.isArray(form[key])) {
							form[key].push(value.toString());
						}
					}
				} else {
					form[key] = value;
				}
			});
			body = form;
		}
	}
	return body;
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/request.js
var HonoRequest = class {
	constructor(request, path = "/", paramData) {
		this.bodyCache = {};
		this.cachedBody = (key) => {
			const { bodyCache, raw: raw2 } = this;
			const cachedBody = bodyCache[key];
			if (cachedBody) return cachedBody;
			if (bodyCache.arrayBuffer) {
				return (async () => {
					return await new Response(bodyCache.arrayBuffer)[key]();
				})();
			}
			return (bodyCache[key] = raw2[key]());
		};
		this.raw = request;
		this.path = path;
		this.paramData = paramData;
		this.vData = {};
	}
	param(key) {
		if (this.paramData) {
			if (key) {
				const param = this.paramData[key];
				return param
					? /\%/.test(param)
						? decodeURIComponent_(param)
						: param
					: void 0;
			} else {
				const decoded = {};
				for (const [key2, value] of Object.entries(this.paramData)) {
					if (value && typeof value === "string") {
						decoded[key2] = /\%/.test(value)
							? decodeURIComponent_(value)
							: value;
					}
				}
				return decoded;
			}
		}
		return null;
	}
	query(key) {
		return getQueryParam(this.url, key);
	}
	queries(key) {
		return getQueryParams(this.url, key);
	}
	header(name) {
		if (name) return this.raw.headers.get(name.toLowerCase()) ?? void 0;
		const headerData = {};
		this.raw.headers.forEach((value, key) => {
			headerData[key] = value;
		});
		return headerData;
	}
	cookie(key) {
		const cookie = this.raw.headers.get("Cookie");
		if (!cookie) return;
		const obj = parse(cookie);
		if (key) {
			const value = obj[key];
			return value;
		} else {
			return obj;
		}
	}
	async parseBody() {
		if (this.bodyCache.parsedBody) return this.bodyCache.parsedBody;
		const parsedBody = await parseBody(this);
		this.bodyCache.parsedBody = parsedBody;
		return parsedBody;
	}
	json() {
		return this.cachedBody("json");
	}
	text() {
		return this.cachedBody("text");
	}
	arrayBuffer() {
		return this.cachedBody("arrayBuffer");
	}
	blob() {
		return this.cachedBody("blob");
	}
	formData() {
		return this.cachedBody("formData");
	}
	addValidatedData(target, data) {
		this.vData[target] = data;
	}
	valid(target) {
		return this.vData[target];
	}
	get url() {
		return this.raw.url;
	}
	get method() {
		return this.raw.method;
	}
	get headers() {
		return this.raw.headers;
	}
	get body() {
		return this.raw.body;
	}
	get bodyUsed() {
		return this.raw.bodyUsed;
	}
	get integrity() {
		return this.raw.integrity;
	}
	get keepalive() {
		return this.raw.keepalive;
	}
	get referrer() {
		return this.raw.referrer;
	}
	get signal() {
		return this.raw.signal;
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var UnsupportedPathError = class extends Error {};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/hono-base.js
function defineDynamicClass() {
	return class {};
}
var notFoundHandler = (c) => {
	return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}
	console.trace(err);
	const message = "Internal Server Error";
	return c.text(message, 500);
};
var Hono = class extends defineDynamicClass() {
	constructor(init = {}) {
		super();
		this._basePath = "/";
		this.path = "/";
		this.routes = [];
		this.notFoundHandler = notFoundHandler;
		this.errorHandler = errorHandler;
		this.head = () => {
			console.warn(
				"`app.head()` is no longer used. `app.get()` implicitly handles the HEAD method.",
			);
			return this;
		};
		this.handleEvent = (event) => {
			return this.dispatch(event.request, event, void 0, event.request.method);
		};
		this.fetch = (request, Env, executionCtx) => {
			return this.dispatch(request, executionCtx, Env, request.method);
		};
		this.request = (input, requestInit, Env, executionCtx) => {
			if (input instanceof Request) {
				if (requestInit !== void 0) {
					input = new Request(input, requestInit);
				}
				return this.fetch(input, Env, executionCtx);
			}
			input = input.toString();
			const path = /^https?:\/\//.test(input)
				? input
				: `http://localhost${mergePath("/", input)}`;
			const req = new Request(path, requestInit);
			return this.fetch(req, Env, executionCtx);
		};
		this.fire = () => {
			addEventListener("fetch", (event) => {
				event.respondWith(
					this.dispatch(event.request, event, void 0, event.request.method),
				);
			});
		};
		const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
		allMethods.map((method) => {
			this[method] = (args1, ...args) => {
				if (typeof args1 === "string") {
					this.path = args1;
				} else {
					this.addRoute(method, this.path, args1);
				}
				args.map((handler) => {
					if (typeof handler !== "string") {
						this.addRoute(method, this.path, handler);
					}
				});
				return this;
			};
		});
		this.on = (method, path, ...handlers) => {
			if (!method) return this;
			this.path = path;
			for (const m of [method].flat()) {
				handlers.map((handler) => {
					this.addRoute(m.toUpperCase(), this.path, handler);
				});
			}
			return this;
		};
		this.use = (arg1, ...handlers) => {
			if (typeof arg1 === "string") {
				this.path = arg1;
			} else {
				handlers.unshift(arg1);
			}
			handlers.map((handler) => {
				this.addRoute(METHOD_NAME_ALL, this.path, handler);
			});
			return this;
		};
		const strict = init.strict ?? true;
		delete init.strict;
		Object.assign(this, init);
		this.getPath = strict ? init.getPath ?? getPath : getPathNoStrict;
	}
	clone() {
		const clone = new Hono({
			router: this.router,
			getPath: this.getPath,
		});
		clone.routes = this.routes;
		return clone;
	}
	route(path, app2) {
		const subApp = this.basePath(path);
		if (!app2) {
			return subApp;
		}
		app2.routes.map((r) => {
			const handler =
				app2.errorHandler === errorHandler
					? r.handler
					: async (c, next) =>
							(await compose([r.handler], app2.errorHandler)(c, next)).res;
			subApp.addRoute(r.method, r.path, handler);
		});
		return this;
	}
	basePath(path) {
		const subApp = this.clone();
		subApp._basePath = mergePath(this._basePath, path);
		return subApp;
	}
	onError(handler) {
		this.errorHandler = handler;
		return this;
	}
	notFound(handler) {
		this.notFoundHandler = handler;
		return this;
	}
	showRoutes() {
		const length = 8;
		this.routes.map((route) => {
			console.log(
				`\x1B[32m${route.method}\x1B[0m ${" ".repeat(
					length - route.method.length,
				)} ${route.path}`,
			);
		});
	}
	mount(path, applicationHandler, optionHandler) {
		const mergedPath = mergePath(this._basePath, path);
		const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
		const handler = async (c, next) => {
			let executionContext = void 0;
			try {
				executionContext = c.executionCtx;
			} catch {}
			const options = optionHandler
				? optionHandler(c)
				: [c.env, executionContext];
			const optionsArray = Array.isArray(options) ? options : [options];
			const queryStrings = getQueryStrings(c.req.url);
			const res = await applicationHandler(
				new Request(
					new URL(
						(c.req.path.slice(pathPrefixLength) || "/") + queryStrings,
						c.req.url,
					),
					c.req.raw,
				),
				...optionsArray,
			);
			if (res) return res;
			await next();
		};
		this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
		return this;
	}
	get routerName() {
		this.matchRoute("GET", "/");
		return this.router.name;
	}
	addRoute(method, path, handler) {
		method = method.toUpperCase();
		if (this._basePath) {
			path = mergePath(this._basePath, path);
		}
		this.router.add(method, path, handler);
		const r = { path, method, handler };
		this.routes.push(r);
	}
	matchRoute(method, path) {
		return this.router.match(method, path) || { handlers: [], params: {} };
	}
	handleError(err, c) {
		if (err instanceof Error) {
			return this.errorHandler(err, c);
		}
		throw err;
	}
	dispatch(request, executionCtx, env, method) {
		const path = this.getPath(request, { env });
		if (method === "HEAD") {
			return (async () =>
				new Response(
					null,
					await this.dispatch(request, executionCtx, env, "GET"),
				))();
		}
		const { handlers, params } = this.matchRoute(method, path);
		const c = new Context(new HonoRequest(request, path, params), {
			env,
			executionCtx,
			notFoundHandler: this.notFoundHandler,
		});
		if (handlers.length === 1) {
			let res;
			try {
				res = handlers[0](c, async () => {});
				if (!res) {
					return this.notFoundHandler(c);
				}
			} catch (err) {
				return this.handleError(err, c);
			}
			if (res.constructor.name === "Response") return res;
			if ("response" in res) {
				res = res.response;
			}
			if (res.constructor.name === "Response") return res;
			return (async () => {
				let awaited;
				try {
					awaited = await res;
					if (awaited !== void 0 && "response" in awaited) {
						awaited = awaited["response"];
					}
					if (!awaited) {
						return this.notFoundHandler(c);
					}
				} catch (err) {
					return this.handleError(err, c);
				}
				return awaited;
			})();
		}
		const composed = compose(handlers, this.errorHandler, this.notFoundHandler);
		return (async () => {
			try {
				const tmp = composed(c);
				const context = tmp.constructor.name === "Promise" ? await tmp : tmp;
				if (!context.finalized) {
					throw new Error(
						"Context is not finalized. You may forget returning Response object or `await next()`",
					);
				}
				return context.res;
			} catch (err) {
				return this.handleError(err, c);
			}
		})();
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
function compareKey(a, b) {
	if (a.length === 1) {
		return b.length === 1 ? (a < b ? -1 : 1) : -1;
	}
	if (b.length === 1) {
		return 1;
	}
	if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
		return 1;
	} else if (
		b === ONLY_WILDCARD_REG_EXP_STR ||
		b === TAIL_WILDCARD_REG_EXP_STR
	) {
		return -1;
	}
	if (a === LABEL_REG_EXP_STR) {
		return 1;
	} else if (b === LABEL_REG_EXP_STR) {
		return -1;
	}
	return a.length === b.length ? (a < b ? -1 : 1) : b.length - a.length;
}
var Node = class {
	constructor() {
		this.children = {};
	}
	insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
		if (tokens.length === 0) {
			if (this.index !== void 0) {
				throw PATH_ERROR;
			}
			if (pathErrorCheckOnly) {
				return;
			}
			this.index = index;
			return;
		}
		const [token, ...restTokens] = tokens;
		const pattern =
			token === "*"
				? restTokens.length === 0
					? ["", "", ONLY_WILDCARD_REG_EXP_STR]
					: ["", "", LABEL_REG_EXP_STR]
				: token === "/*"
				? ["", "", TAIL_WILDCARD_REG_EXP_STR]
				: token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
		let node;
		if (pattern) {
			const name = pattern[1];
			const regexpStr = pattern[2] || LABEL_REG_EXP_STR;
			node = this.children[regexpStr];
			if (!node) {
				if (
					Object.keys(this.children).some(
						(k) =>
							k !== ONLY_WILDCARD_REG_EXP_STR &&
							k !== TAIL_WILDCARD_REG_EXP_STR,
					)
				) {
					throw PATH_ERROR;
				}
				if (pathErrorCheckOnly) {
					return;
				}
				node = this.children[regexpStr] = new Node();
				if (name !== "") {
					node.varIndex = context.varIndex++;
				}
			}
			if (!pathErrorCheckOnly && name !== "") {
				if (paramMap.some((p) => p[0] === name)) {
					throw new Error("Duplicate param name");
				}
				paramMap.push([name, node.varIndex]);
			}
		} else {
			node = this.children[token];
			if (!node) {
				if (
					Object.keys(this.children).some(
						(k) =>
							k.length > 1 &&
							k !== ONLY_WILDCARD_REG_EXP_STR &&
							k !== TAIL_WILDCARD_REG_EXP_STR,
					)
				) {
					throw PATH_ERROR;
				}
				if (pathErrorCheckOnly) {
					return;
				}
				node = this.children[token] = new Node();
			}
		}
		node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
	}
	buildRegExpStr() {
		const childKeys = Object.keys(this.children).sort(compareKey);
		const strList = childKeys.map((k) => {
			const c = this.children[k];
			return (
				(typeof c.varIndex === "number" ? `(${k})@${c.varIndex}` : k) +
				c.buildRegExpStr()
			);
		});
		if (typeof this.index === "number") {
			strList.unshift(`#${this.index}`);
		}
		if (strList.length === 0) {
			return "";
		}
		if (strList.length === 1) {
			return strList[0];
		}
		return "(?:" + strList.join("|") + ")";
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
	constructor() {
		this.context = { varIndex: 0 };
		this.root = new Node();
	}
	insert(path, index, pathErrorCheckOnly) {
		const paramMap = [];
		const groups = [];
		for (let i = 0; ; ) {
			let replaced = false;
			path = path.replace(/\{[^}]+\}/g, (m) => {
				const mark = `@\\${i}`;
				groups[i] = [mark, m];
				i++;
				replaced = true;
				return mark;
			});
			if (!replaced) {
				break;
			}
		}
		const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
		for (let i = groups.length - 1; i >= 0; i--) {
			const [mark] = groups[i];
			for (let j = tokens.length - 1; j >= 0; j--) {
				if (tokens[j].indexOf(mark) !== -1) {
					tokens[j] = tokens[j].replace(mark, groups[i][1]);
					break;
				}
			}
		}
		this.root.insert(tokens, index, paramMap, this.context, pathErrorCheckOnly);
		return paramMap;
	}
	buildRegExp() {
		let regexp = this.root.buildRegExpStr();
		if (regexp === "") {
			return [/^$/, [], []];
		}
		let captureIndex = 0;
		const indexReplacementMap = [];
		const paramReplacementMap = [];
		regexp = regexp.replace(
			/#(\d+)|@(\d+)|\.\*\$/g,
			(_, handlerIndex, paramIndex) => {
				if (typeof handlerIndex !== "undefined") {
					indexReplacementMap[++captureIndex] = Number(handlerIndex);
					return "$()";
				}
				if (typeof paramIndex !== "undefined") {
					paramReplacementMap[Number(paramIndex)] = ++captureIndex;
					return "";
				}
				return "";
			},
		);
		return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/router/reg-exp-router/router.js
var methodNames = [METHOD_NAME_ALL, ...METHODS].map((method) =>
	method.toUpperCase(),
);
var emptyParam = {};
var nullMatcher = [/^$/, [], {}];
var wildcardRegExpCache = {};
function buildWildcardRegExp(path) {
	return (
		wildcardRegExpCache[path] ??
		(wildcardRegExpCache[path] = new RegExp(
			path === "*" ? "" : `^${path.replace(/\/\*/, "(?:|/.*)")}$`,
		))
	);
}
function clearWildcardRegExpCache() {
	wildcardRegExpCache = {};
}
function buildMatcherFromPreprocessedRoutes(routes) {
	const trie = new Trie();
	const handlerData = [];
	if (routes.length === 0) {
		return nullMatcher;
	}
	const routesWithStaticPathFlag = routes
		.map((route) => [!/\*|\/:/.test(route[0]), ...route])
		.sort(([isStaticA, pathA], [isStaticB, pathB]) =>
			isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length,
		);
	const staticMap = {};
	for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
		const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
		if (pathErrorCheckOnly) {
			staticMap[path] = { handlers, params: emptyParam };
		} else {
			j++;
		}
		let paramMap;
		try {
			paramMap = trie.insert(path, j, pathErrorCheckOnly);
		} catch (e) {
			throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
		}
		if (pathErrorCheckOnly) {
			continue;
		}
		handlerData[j] =
			paramMap.length === 0
				? [{ handlers, params: emptyParam }, null]
				: [handlers, paramMap];
	}
	const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
	for (let i = 0, len = handlerData.length; i < len; i++) {
		const paramMap = handlerData[i][1];
		if (paramMap) {
			for (let j = 0, len2 = paramMap.length; j < len2; j++) {
				paramMap[j][1] = paramReplacementMap[paramMap[j][1]];
			}
		}
	}
	const handlerMap = [];
	for (const i in indexReplacementMap) {
		handlerMap[i] = handlerData[indexReplacementMap[i]];
	}
	return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
	if (!middleware) {
		return void 0;
	}
	for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
		if (buildWildcardRegExp(k).test(path)) {
			return [...middleware[k]];
		}
	}
	return void 0;
}
var RegExpRouter = class {
	constructor() {
		this.name = "RegExpRouter";
		this.middleware = { [METHOD_NAME_ALL]: {} };
		this.routes = { [METHOD_NAME_ALL]: {} };
	}
	add(method, path, handler) {
		var _a;
		const { middleware, routes } = this;
		if (!middleware || !routes) {
			throw new Error(
				"Can not add a route since the matcher is already built.",
			);
		}
		if (methodNames.indexOf(method) === -1) methodNames.push(method);
		if (!middleware[method]) {
			[middleware, routes].forEach((handlerMap) => {
				handlerMap[method] = {};
				Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
					handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
				});
			});
		}
		if (path === "/*") {
			path = "*";
		}
		if (/\*$/.test(path)) {
			const re = buildWildcardRegExp(path);
			if (method === METHOD_NAME_ALL) {
				Object.keys(middleware).forEach((m) => {
					var _a2;
					(_a2 = middleware[m])[path] ||
						(_a2[path] =
							findMiddleware(middleware[m], path) ||
							findMiddleware(middleware[METHOD_NAME_ALL], path) ||
							[]);
				});
			} else {
				(_a = middleware[method])[path] ||
					(_a[path] =
						findMiddleware(middleware[method], path) ||
						findMiddleware(middleware[METHOD_NAME_ALL], path) ||
						[]);
			}
			Object.keys(middleware).forEach((m) => {
				if (method === METHOD_NAME_ALL || method === m) {
					Object.keys(middleware[m]).forEach((p) => {
						re.test(p) && middleware[m][p].push(handler);
					});
				}
			});
			Object.keys(routes).forEach((m) => {
				if (method === METHOD_NAME_ALL || method === m) {
					Object.keys(routes[m]).forEach(
						(p) => re.test(p) && routes[m][p].push(handler),
					);
				}
			});
			return;
		}
		const paths = checkOptionalParameter(path) || [path];
		for (let i = 0, len = paths.length; i < len; i++) {
			const path2 = paths[i];
			Object.keys(routes).forEach((m) => {
				var _a2;
				if (method === METHOD_NAME_ALL || method === m) {
					(_a2 = routes[m])[path2] ||
						(_a2[path2] = [
							...(findMiddleware(middleware[m], path2) ||
								findMiddleware(middleware[METHOD_NAME_ALL], path2) ||
								[]),
						]);
					routes[m][path2].push(handler);
				}
			});
		}
	}
	match(method, path) {
		clearWildcardRegExpCache();
		const matchers = this.buildAllMatchers();
		this.match = (method2, path2) => {
			const matcher = matchers[method2];
			const staticMatch = matcher[2][path2];
			if (staticMatch) {
				return staticMatch;
			}
			const match = path2.match(matcher[0]);
			if (!match) {
				return null;
			}
			const index = match.indexOf("", 1);
			const [handlers, paramMap] = matcher[1][index];
			if (!paramMap) {
				return handlers;
			}
			const params = {};
			for (let i = 0, len = paramMap.length; i < len; i++) {
				params[paramMap[i][0]] = match[paramMap[i][1]];
			}
			return { handlers, params };
		};
		return this.match(method, path);
	}
	buildAllMatchers() {
		const matchers = {};
		methodNames.forEach((method) => {
			matchers[method] = this.buildMatcher(method) || matchers[METHOD_NAME_ALL];
		});
		this.middleware = this.routes = void 0;
		return matchers;
	}
	buildMatcher(method) {
		const routes = [];
		let hasOwnRoute = method === METHOD_NAME_ALL;
		[this.middleware, this.routes].forEach((r) => {
			const ownRoute = r[method]
				? Object.keys(r[method]).map((path) => [path, r[method][path]])
				: [];
			if (ownRoute.length !== 0) {
				hasOwnRoute || (hasOwnRoute = true);
				routes.push(...ownRoute);
			} else if (method !== METHOD_NAME_ALL) {
				routes.push(
					...Object.keys(r[METHOD_NAME_ALL]).map((path) => [
						path,
						r[METHOD_NAME_ALL][path],
					]),
				);
			}
		});
		if (!hasOwnRoute) {
			return null;
		} else {
			return buildMatcherFromPreprocessedRoutes(routes);
		}
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
	constructor(init) {
		this.name = "SmartRouter";
		this.routers = [];
		this.routes = [];
		Object.assign(this, init);
	}
	add(method, path, handler) {
		if (!this.routes) {
			throw new Error(
				"Can not add a route since the matcher is already built.",
			);
		}
		this.routes.push([method, path, handler]);
	}
	match(method, path) {
		if (!this.routes) {
			throw new Error("Fatal error");
		}
		const { routers, routes } = this;
		const len = routers.length;
		let i = 0;
		let res;
		for (; i < len; i++) {
			const router = routers[i];
			try {
				routes.forEach((args) => {
					router.add(...args);
				});
				res = router.match(method, path);
			} catch (e) {
				if (e instanceof UnsupportedPathError) {
					continue;
				}
				throw e;
			}
			this.match = router.match.bind(router);
			this.routers = [router];
			this.routes = void 0;
			break;
		}
		if (i === len) {
			throw new Error("Fatal error");
		}
		this.name = `SmartRouter + ${this.activeRouter.name}`;
		return res || null;
	}
	get activeRouter() {
		if (this.routes || this.routers.length !== 1) {
			throw new Error("No active router has been determined yet.");
		}
		return this.routers[0];
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/router/trie-router/node.js
function findParam(node, name) {
	for (let i = 0, len = node.patterns.length; i < len; i++) {
		if (typeof node.patterns[i] === "object" && node.patterns[i][1] === name) {
			return true;
		}
	}
	const nodes = Object.values(node.children);
	for (let i = 0, len = nodes.length; i < len; i++) {
		if (findParam(nodes[i], name)) {
			return true;
		}
	}
	return false;
}
var Node2 = class {
	constructor(method, handler, children) {
		this.order = 0;
		this.children = children || {};
		this.methods = [];
		this.name = "";
		if (method && handler) {
			const m = {};
			m[method] = { handler, score: 0, name: this.name };
			this.methods = [m];
		}
		this.patterns = [];
		this.handlerSetCache = {};
	}
	insert(method, path, handler) {
		this.name = `${method} ${path}`;
		this.order = ++this.order;
		let curNode = this;
		const parts = splitRoutingPath(path);
		const parentPatterns = [];
		const errorMessage = (name) => {
			return `Duplicate param name, use another name instead of '${name}' - ${method} ${path} <--- '${name}'`;
		};
		for (let i = 0, len = parts.length; i < len; i++) {
			const p = parts[i];
			if (Object.keys(curNode.children).includes(p)) {
				parentPatterns.push(...curNode.patterns);
				curNode = curNode.children[p];
				continue;
			}
			curNode.children[p] = new Node2();
			const pattern = getPattern(p);
			if (pattern) {
				if (typeof pattern === "object") {
					for (let j = 0, len2 = parentPatterns.length; j < len2; j++) {
						if (
							typeof parentPatterns[j] === "object" &&
							parentPatterns[j][1] === pattern[1]
						) {
							throw new Error(errorMessage(pattern[1]));
						}
					}
					if (
						Object.values(curNode.children).some((n) =>
							findParam(n, pattern[1]),
						)
					) {
						throw new Error(errorMessage(pattern[1]));
					}
				}
				curNode.patterns.push(pattern);
				parentPatterns.push(...curNode.patterns);
			}
			parentPatterns.push(...curNode.patterns);
			curNode = curNode.children[p];
		}
		if (!curNode.methods.length) {
			curNode.methods = [];
		}
		const m = {};
		const handlerSet = { handler, name: this.name, score: this.order };
		m[method] = handlerSet;
		curNode.methods.push(m);
		return curNode;
	}
	gHSets(node, method, wildcard) {
		var _a, _b;
		return (
			(_a = node.handlerSetCache)[(_b = `${method}:${wildcard ? "1" : "0"}`)] ||
			(_a[_b] = (() => {
				const handlerSets = [];
				for (let i = 0, len = node.methods.length; i < len; i++) {
					const m = node.methods[i];
					const handlerSet = m[method] || m[METHOD_NAME_ALL];
					if (handlerSet !== void 0) {
						handlerSets.push(handlerSet);
					}
				}
				return handlerSets;
			})())
		);
	}
	search(method, path) {
		const handlerSets = [];
		const params = {};
		const curNode = this;
		let curNodes = [curNode];
		const parts = splitPath(path);
		for (let i = 0, len2 = parts.length; i < len2; i++) {
			const part = parts[i];
			const isLast = i === len2 - 1;
			const tempNodes = [];
			let matched = false;
			for (let j = 0, len22 = curNodes.length; j < len22; j++) {
				const node = curNodes[j];
				const nextNode = node.children[part];
				if (nextNode) {
					if (isLast === true) {
						if (nextNode.children["*"]) {
							handlerSets.push(
								...this.gHSets(nextNode.children["*"], method, true),
							);
						}
						handlerSets.push(...this.gHSets(nextNode, method));
						matched = true;
					} else {
						tempNodes.push(nextNode);
					}
				}
				for (let k = 0, len3 = node.patterns.length; k < len3; k++) {
					const pattern = node.patterns[k];
					if (pattern === "*") {
						const astNode = node.children["*"];
						if (astNode) {
							handlerSets.push(...this.gHSets(astNode, method));
							tempNodes.push(astNode);
						}
						continue;
					}
					if (part === "") continue;
					const [key, name, matcher] = pattern;
					const child = node.children[key];
					const restPathString = parts.slice(i).join("/");
					if (matcher instanceof RegExp && matcher.test(restPathString)) {
						handlerSets.push(...this.gHSets(child, method));
						params[name] = restPathString;
						continue;
					}
					if (
						matcher === true ||
						(matcher instanceof RegExp && matcher.test(part))
					) {
						if (typeof key === "string") {
							if (isLast === true) {
								handlerSets.push(...this.gHSets(child, method));
								if (child.children["*"]) {
									handlerSets.push(...this.gHSets(child.children["*"], method));
								}
							} else {
								tempNodes.push(child);
							}
						}
						if (typeof name === "string" && !matched) {
							params[name] = part;
						} else {
							if (node.children[part]) {
								params[name] = part;
							}
						}
					}
				}
			}
			curNodes = tempNodes;
		}
		const len = handlerSets.length;
		if (len === 0) return null;
		if (len === 1) return { handlers: [handlerSets[0].handler], params };
		const handlers = handlerSets
			.sort((a, b) => {
				return a.score - b.score;
			})
			.map((s) => {
				return s.handler;
			});
		return { handlers, params };
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
	constructor() {
		this.name = "TrieRouter";
		this.node = new Node2();
	}
	add(method, path, handler) {
		const results = checkOptionalParameter(path);
		if (results) {
			for (const p of results) {
				this.node.insert(method, p, handler);
			}
			return;
		}
		this.node.insert(method, path, handler);
	}
	match(method, path) {
		return this.node.search(method, path);
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
	constructor(init = {}) {
		super(init);
		this.router =
			init.router ??
			new SmartRouter({
				routers: [new RegExpRouter(), new TrieRouter()],
			});
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/utils/html.js
var escapeRe = /[&<>'"]/;
var escapeToBuffer = (str, buffer) => {
	const match = str.search(escapeRe);
	if (match === -1) {
		buffer[0] += str;
		return;
	}
	let escape;
	let index;
	let lastIndex = 0;
	for (index = match; index < str.length; index++) {
		switch (str.charCodeAt(index)) {
			case 34:
				escape = "&quot;";
				break;
			case 39:
				escape = "&#39;";
				break;
			case 38:
				escape = "&amp;";
				break;
			case 60:
				escape = "&lt;";
				break;
			case 62:
				escape = "&gt;";
				break;
			default:
				continue;
		}
		buffer[0] += str.substring(lastIndex, index) + escape;
		lastIndex = index + 1;
	}
	buffer[0] += str.substring(lastIndex, index);
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/helper/html/index.js
var raw = (value) => {
	const escapedString = new String(value);
	escapedString.isEscaped = true;
	return escapedString;
};
var html = (strings, ...values) => {
	const buffer = [""];
	for (let i = 0, len = strings.length - 1; i < len; i++) {
		buffer[0] += strings[i];
		const children =
			values[i] instanceof Array ? values[i].flat(Infinity) : [values[i]];
		for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
			const child = children[i2];
			if (typeof child === "string") {
				escapeToBuffer(child, buffer);
			} else if (
				typeof child === "boolean" ||
				child === null ||
				child === void 0
			) {
				continue;
			} else if (
				(typeof child === "object" && child.isEscaped) ||
				typeof child === "number"
			) {
				buffer[0] += child;
			} else {
				escapeToBuffer(child.toString(), buffer);
			}
		}
	}
	buffer[0] += strings[strings.length - 1];
	return raw(buffer[0]);
};

// src/components/Layout.tsx
var Layout = ({ children, description, title }) => {
	console.log("Layout children", children);
	return html`<!doctype html>
		<html
			lang="en"
			class="h-full scroll-smooth antialiased [font-feature-settings:'ss01']"
		>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content="${description}" />
				<link rel="canonical" href="https://feedmckinney.org/" />

				<title>${title}</title>

				<link rel="stylesheet" href="/assets/pico.min.css" />
				<link rel="stylesheet" href="/assets/custom.css" />
				<link rel="shortcut icon" href="/assets/favicon.ico" />
			</head>
			<body>
				${children}
			</body>
		</html>`;
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/jsx/index.js
var emptyTags = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
];
var booleanAttributes = [
	"allowfullscreen",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"defer",
	"disabled",
	"formnovalidate",
	"hidden",
	"inert",
	"ismap",
	"itemscope",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"selected",
];
var childrenToStringToBuffer = (children, buffer) => {
	for (let i = 0, len = children.length; i < len; i++) {
		const child = children[i];
		if (typeof child === "string") {
			escapeToBuffer(child, buffer);
		} else if (
			typeof child === "boolean" ||
			child === null ||
			child === void 0
		) {
			continue;
		} else if (child instanceof JSXNode) {
			child.toStringToBuffer(buffer);
		} else if (typeof child === "number" || child.isEscaped) {
			buffer[0] += child;
		} else {
			childrenToStringToBuffer(child, buffer);
		}
	}
};
var JSXNode = class {
	constructor(tag, props, children) {
		this.isEscaped = true;
		this.tag = tag;
		this.props = props;
		this.children = children;
	}
	toString() {
		const buffer = [""];
		this.toStringToBuffer(buffer);
		return buffer[0];
	}
	toStringToBuffer(buffer) {
		const tag = this.tag;
		const props = this.props;
		let { children } = this;
		buffer[0] += `<${tag}`;
		const propsKeys = Object.keys(props || {});
		for (let i = 0, len = propsKeys.length; i < len; i++) {
			const key = propsKeys[i];
			const v = props[key];
			if (key === "style" && typeof v === "object") {
				const styles = Object.keys(v)
					.map((k) => `${k}:${v[k]}`)
					.join(";")
					.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
				buffer[0] += ` style="${styles}"`;
			} else if (typeof v === "string") {
				buffer[0] += ` ${key}="`;
				escapeToBuffer(v, buffer);
				buffer[0] += '"';
			} else if (typeof v === "number") {
				buffer[0] += ` ${key}="${v}"`;
			} else if (v === null || v === void 0) {
			} else if (typeof v === "boolean" && booleanAttributes.includes(key)) {
				if (v) {
					buffer[0] += ` ${key}=""`;
				}
			} else if (key === "dangerouslySetInnerHTML") {
				if (children.length > 0) {
					throw "Can only set one of `children` or `props.dangerouslySetInnerHTML`.";
				}
				const escapedString = new String(v.__html);
				escapedString.isEscaped = true;
				children = [escapedString];
			} else {
				buffer[0] += ` ${key}="`;
				escapeToBuffer(v.toString(), buffer);
				buffer[0] += '"';
			}
		}
		if (emptyTags.includes(tag)) {
			buffer[0] += "/>";
			return;
		}
		buffer[0] += ">";
		childrenToStringToBuffer(children, buffer);
		buffer[0] += `</${tag}>`;
	}
};
var JSXFunctionNode = class extends JSXNode {
	toStringToBuffer(buffer) {
		const { children } = this;
		const res = this.tag.call(null, {
			...this.props,
			children: children.length <= 1 ? children[0] : children,
		});
		if (res instanceof JSXNode) {
			res.toStringToBuffer(buffer);
		} else if (typeof res === "number" || res.isEscaped) {
			buffer[0] += res;
		} else {
			escapeToBuffer(res, buffer);
		}
	}
};
var jsxFn = (tag, props, ...children) => {
	if (typeof tag === "function") {
		return new JSXFunctionNode(tag, props, children);
	} else {
		return new JSXNode(tag, props, children);
	}
};

// node_modules/.pnpm/hono@3.7.2/node_modules/hono/dist/jsx/jsx-dev-runtime.js
function jsxDEV(tag, props) {
	const children = props.children ?? [];
	delete props["children"];
	return Array.isArray(children)
		? jsxFn(tag, props, ...children)
		: jsxFn(tag, props, children);
}

// src/components/ResourceItem.tsx
var ResourceItem = ({ language = "en", resource }) => {
	return /* @__PURE__ */ jsxDEV("li", {
		children: [
			/* @__PURE__ */ jsxDEV("div", {
				class: "underline name",
				children: resource.name[language],
			}),
			/* @__PURE__ */ jsxDEV("div", { children: resource.address }),
			resource.phone
				? /* @__PURE__ */ jsxDEV("div", { children: resource.phone })
				: null,
			resource.email
				? /* @__PURE__ */ jsxDEV("div", { children: resource.email })
				: null,
			resource.website
				? /* @__PURE__ */ jsxDEV("a", {
						href: resource.website,
						class: "underline",
						children: resource.website,
				  })
				: null,
			resource.services[language]
				? /* @__PURE__ */ jsxDEV("div", {
						children: [
							/* @__PURE__ */ jsxDEV("span", {
								class: "bold",
								children: "Services: ",
							}),
							resource.services[language],
						],
				  })
				: null,
			resource.notes[language]
				? /* @__PURE__ */ jsxDEV("div", {
						children: [
							/* @__PURE__ */ jsxDEV("span", {
								class: "bold",
								children: "Notes: ",
							}),
							resource.notes[language],
						],
				  })
				: null,
			/* @__PURE__ */ jsxDEV("div", {
				children: [
					/* @__PURE__ */ jsxDEV("span", {
						class: "bold",
						children: "ID Required: ",
					}),
					resource.idRequired ? "Yes" : "No",
				],
			}),
			resource.hours[language]
				? /* @__PURE__ */ jsxDEV("ul", {
						children: [
							/* @__PURE__ */ jsxDEV("summary", {
								class: "secondary",
								children: "Hours:",
							}),
							resource.hours[language].map((hour) =>
								/* @__PURE__ */ jsxDEV("li", { children: hour }),
							),
						],
				  })
				: null,
			resource.image
				? /* @__PURE__ */ jsxDEV("div", { children: resource.image })
				: null,
			resource.additionalResources
				? /* @__PURE__ */ jsxDEV("ul", {
						class: "secondary",
						children: [
							/* @__PURE__ */ jsxDEV("summary", {
								class: "secondary",
								children: [
									"Additional resources at ",
									resource.name[language],
									":",
								],
							}),
							resource.additionalResources.map((resource2) =>
								/* @__PURE__ */ jsxDEV(ResourceItem, {
									resource: resource2,
									language,
								}),
							),
						],
				  })
				: null,
		],
	});
};

// src/pages/Home.view.tsx
var HomeView = ({ loaderData }) => {
	const { resources: resources2 } = loaderData;
	const description =
		"Food pantries and other resources available to citizens of McKinney, Texas.";
	return /* @__PURE__ */ jsxDEV(Layout, {
		title: "Feed McKinney - Texas",
		description,
		children: [
			/* @__PURE__ */ jsxDEV("header", {
				class: "container",
				children: /* @__PURE__ */ jsxDEV("hgroup", {
					children: [
						/* @__PURE__ */ jsxDEV("h1", { children: "Feed McKinney" }),
						/* @__PURE__ */ jsxDEV("h2", {
							children:
								"Helping you find the best resources in McKinney and Collin County, Texas to help provide for your family.",
						}),
					],
				}),
			}),
			/* @__PURE__ */ jsxDEV("main", {
				class: "container",
				children: /* @__PURE__ */ jsxDEV("ul", {
					children: resources2.map((resource) =>
						/* @__PURE__ */ jsxDEV(ResourceItem, { resource, language: "en" }),
					),
				}),
			}),
			/* @__PURE__ */ jsxDEV("footer", {
				class: "container",
				children: [
					/* @__PURE__ */ jsxDEV("p", {
						children:
							"Website maintained by Justin Noel in cooperation with the Community Garden Kitchen.",
					}),
					/* @__PURE__ */ jsxDEV("p", {
						children: [
							"To add your organization to this site or if corrections are needed for your organization, please send additions or corrections to",
							/* @__PURE__ */ jsxDEV("a", {
								href: "mailto:info@feedmckinney.org",
								children: " info@feedmckinney.org",
							}),
							".",
						],
					}),
				],
			}),
		],
	});
};

// src/data/resources.ts
var resources = [
	{
		address: "501 Howard Street McKinney, TX 75069",
		hours: {
			en: [
				"Monday 6:00 PM - 8:00 PM",
				"Tuesday 6:00 PM - 8:00 PM",
				"Wednesday 6:00 PM - 8:00 PM",
				"Thursday 6:00 PM - 8:00 PM",
			],
			es: [
				"Lunes 6:00 PM - 8:00 PM",
				"Martes 6:00 PM - 8:00 PM",
				"Mi\xE9rcoles 6:00 PM - 8:00 PM",
				"Jueves 6:00 PM - 8:00 PM",
			],
		},
		idRequired: false,
		name: {
			en: "Community Garden Kitchen",
			es: "Cocina con Jard\xEDn Comunitario",
		},
		notes: {
			en: "",
			es: "",
		},
		phone: "",
		services: {
			en: "Free restaurant style meals for your whole family",
			es: "Comidas estilo restaurante gratuitas para toda tu familia.",
		},
		website: "https://communitygardenkitchen.org/",
	},
	{
		address: "604 Rike Street McKinney, TX 75069",
		hours: {
			en: [
				"2nd Saturday 9:00 AM - 12:00 PM",
				"4th Sunday 11:30 AM - 1:00 PM",
				"Tuesday 9:00 AM - 11:00 AM",
				"Thursday 10:00 AM - 11:00 AM",
			],
			es: [
				"2do s\xE1bado 9:00 AM - 12:00 PM",
				"4to domingo 11:30 AM - 1:00 PM",
				"Martes 9:00 AM - 11:00 AM",
				"Jueves 10:00 AM - 11:00 AM",
			],
		},
		idRequired: false,
		name: {
			en: "Renovaci\xF3n",
			es: "Renovaci\xF3n",
		},
		notes: {
			en: "",
			es: "",
		},
		phone: "(214) 944-7260",
		services: {
			en: "",
			es: "",
		},
		website: "https://mckinneyrenovacion.wixsite.com/renovacion-nazareno",
	},
	{
		address: "901 N. McDonald, Mckinney, TX 75069",
		hours: {
			en: [
				"Monday 10:00 AM - 4:00 PM",
				"Tuesday 10:00 AM - 4:00 PM",
				"Wednesday 10:00 AM - 4:00 PM",
				"Thursday 10:00 AM - 4:00 PM",
				"Friday 10:00 AM - 4:00 PM",
			],
			es: [
				"Lunes 10:00 AM - 4:00 PM",
				"Martes 10:00 AM - 4:00 PM",
				"Mi\xE9rcoles 10:00 AM - 4:00 PM",
				"Jueves 10:00 AM - 4:00 PM",
				"Viernes 10:00 AM - 4:00 PM",
			],
		},
		idRequired: false,
		name: {
			en: "iRise DFW",
			es: "iRise DFW",
		},
		notes: {
			en: "",
			es: "",
		},
		phone: "(214) 548-4447",
		services: {
			en: "Food Pantry and support for single moms",
			es: "Despensa de alimentos y apoyo para madres solteras",
		},
		website: "https://www.irisedfw.org",
	},
	{
		address: "600 Wilson Creek Pkwy, Mckinney 75069",
		hours: {
			en: [
				"Monday 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Wednesday 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Thursday 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Friday 9:00 AM - 12:00 PM",
			],
			es: [
				"Lunes 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Mi\xE9rcoles 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Jueves 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Viernes 9:00 AM - 12:00 PM",
			],
		},
		idRequired: true,
		name: {
			en: "Salvation Army Collin County",
			es: "Ej\xE9rcito de Salvaci\xF3n Collin County",
		},
		notes: {
			en: "Bring photo ID and proof of residency (utility bill or similar). Fresh produce available on Monday and Wednesday mornings.",
			es: "Traer identificaci\xF3n con fotograf\xEDa y comprobante de residencia (factura de servicios p\xFAblicos o similar). Productos frescos disponibles los lunes y mi\xE9rcoles por la ma\xF1ana.",
		},
		phone: "(972) 542-6694",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		website: "https://salvationarmyntx.org/north-texas/cure-hunger",
	},
	{
		address: "1601 N. Waddill, Suite 102, Mckinney 75069",
		hours: {
			en: [
				"Tuesday 10:00 AM - 3:00 PM",
				"Wednesday 10:00 AM - 3:00 PM",
				"Thursday 10:00 AM - 3:00 PM",
				"Friday 10:00 AM - 3:00 PM",
			],
			es: [
				"Martes 10:00 AM - 3:00 PM",
				"Mi\xE9rcoles 10:00 AM - 3:00 PM",
				"Jueves 10:00 AM - 3:00 PM",
				"Viernes 10:00 AM - 3:00 PM",
			],
		},
		idRequired: true,
		name: {
			en: "Community Lifeline Center",
			es: "Centro Comunitario de Salvavidas",
		},
		notes: {
			en: "Complete online application for financial assistance if qualified.",
			es: "Complete la solicitud en l\xEDnea para asistencia financiera si califica.",
		},
		phone: "(972) 542-0020",
		services: {
			en: "Food pantry. Financial assistance available to CoServ, TXU, McKinney Water, or Atmos customers.",
			es: "Despensa de alimentos. Asistencia financiera disponible para clientes de CoServ, TXU, McKinney Water o Atmos.",
		},
		website: "https://www.communitylifeline.org/rent--utility-help.html",
		additionalResources: [
			{
				address: "455 Monte Carlo Blvd., Princeton, TX 75407",
				hours: {
					en: [
						"October 21, 2023 9:00 AM - 11:00 AM",
						"November 4, 2023 9:00 AM - 11:00 AM",
						"November 18, 2023 9:00 AM - 11:00 AM",
						"December 2, 2023 9:00 AM - 11:00 AM",
						"December 16, 2023 9:00 AM - 11:00 AM",
					],
					es: [
						"Octubre 21, 2023 9:00 AM - 11:00 AM",
						"Noviembre 4, 2023 9:00 AM - 11:00 AM",
						"Noviembre 18, 2023 9:00 AM - 11:00 AM",
						"Diciembre 2, 2023 9:00 AM - 11:00 AM",
						"Diciembre 16, 2023 9:00 AM - 11:00 AM",
					],
				},
				idRequired: false,
				name: {
					en: "Southard Middle School",
					es: "Southard Middle School",
				},
				notes: {
					en: "",
					es: "",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribuci\xF3n m\xF3vil de alimentos",
				},
			},
			{
				address: "401 Erwin, McKinney, TX 75069",
				hours: {
					en: [
						"October 21, 2023 9:00 AM - 11:00 AM",
						"November 18, 2023 9:00 AM - 11:00 AM",
						"December 16, 2023 9:00 AM - 11:00 AM",
					],
					es: [
						"Octubre 21, 2023 9:00 AM - 11:00 AM",
						"Noviembre 4, 2023 9:00 AM - 11:00 AM",
						"Diciembre 16, 2023 9:00 AM - 11:00 AM",
					],
				},
				idRequired: false,
				name: {
					en: "McKinney First Baptist Church",
					es: "McKinney First Baptist Church",
				},
				notes: {
					en: "",
					es: "",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribuci\xF3n m\xF3vil de alimentos",
				},
			},
			{
				address: "300 Main St in Weston, TX",
				hours: {
					en: ["October 14, 2023 9:00 AM - 11:00 AM"],
					es: ["Octubre 14, 2023 9:00 AM - 11:00 AM"],
				},
				idRequired: false,
				name: {
					en: "First Baptist Church Weston",
					es: "First Baptist Church Weston",
				},
				notes: {
					en: "",
					es: "",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribuci\xF3n m\xF3vil de alimentos",
				},
			},
			{
				address: "115 West St in Celina TX",
				hours: {
					en: ["November 11, 2023 9:00 AM - 11:00 AM"],
					es: ["Noviembre 11, 2023 9:00 AM - 11:00 AM"],
				},
				idRequired: false,
				name: {
					en: "Bethel Baptist Church Celina",
					es: "Bethel Baptist Church Celina",
				},
				notes: {
					en: "",
					es: "",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribuci\xF3n m\xF3vil de alimentos",
				},
			},
			{
				address: "1800 West Hunt, McKinney, TX 75069",
				hours: {
					en: [
						"October 7, 2023 9:00 AM - 10:30 AM",
						"November 4, 2023 9:00 AM - 10:30 AM",
						"December 2, 2023 9:00 AM - 10:30 AM",
					],
					es: [
						"Octubre 7, 2023 9:00 AM - 10:30 AM",
						"Noviembre 4, 2023 9:00 AM - 10:30 AM",
						"Diciembre 2, 2023 9:00 AM - 10:30 AM",
					],
				},
				idRequired: false,
				name: {
					en: "First Christian Church McKinney",
					es: "First Christian Church McKinney",
				},
				notes: {
					en: "",
					es: "",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribuci\xF3n m\xF3vil de alimentos",
				},
			},
			{
				address: "102 W. Lamar St, McKinney, TX 75069",
				hours: {
					en: [
						"October 14, 2023 9:30 AM - 10:30 AM",
						"October 28, 2023 9:30 AM - 10:30 AM",
						"November 11, 2023 9:30 AM - 10:30 AM",
						"November 25, 2023 9:30 AM - 10:30 AM",
						"December 9, 2023 9:30 AM - 10:30 AM",
					],
					es: [
						"Octubre 14, 2023 9:30 AM - 10:30 AM",
						"Octubre 28, 2023 9:30 AM - 10:30 AM",
						"Noviembre 11, 2023 9:30 AM - 10:30 AM",
						"Noviembre 25, 2023 9:30 AM - 10:30 AM",
						"Diciembre 9, 2023 9:30 AM - 10:30 AM",
					],
				},
				idRequired: false,
				name: {
					en: "First United Methodist Church",
					es: "First United Methodist Church",
				},
				notes: {
					en: "",
					es: "",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribuci\xF3n m\xF3vil de alimentos",
				},
			},
			{
				address: "6400 McKinney Ranch Pkwy, McKinney, TX 75070",
				hours: {
					en: ["October 28, 2023 9:00 AM - 10:30 AM"],
					es: ["Octubre 28, 2023 9:00 AM - 10:30 AM"],
				},
				idRequired: false,
				name: {
					en: "St. Andrews Episcopal Church",
					es: "St. Andrews Episcopal Church",
				},
				notes: {
					en: "",
					es: "",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribuci\xF3n m\xF3vil de alimentos",
				},
			},
		],
	},
	{
		address: "107 E. Lamar St., McKinney, 75069",
		hours: {
			en: ["Sunday 4:00 PM"],
			es: ["Domingo 4:00 PM"],
		},
		idRequired: false,
		name: {
			en: "Roadside Church",
			es: "Roadside Church",
		},
		notes: {
			en: "",
			es: "",
		},
		services: {
			en: "Hot meals",
			es: "Hot meals",
		},
		website: "",
	},
	{
		address: "600 Wilson Creek Pkwy, McKinney, 75069",
		hours: {
			en: ["Sunday 11:45 AM - 1:00 PM"],
			es: ["Domingo 11:45 AM - 1:00 PM"],
		},
		idRequired: false,
		name: {
			en: "The Parks Church",
			es: "The Parks Church",
		},
		notes: {
			en: "",
			es: "",
		},
		phone: "",
		services: {
			en: "Produce, canned goods, eggs and meat offered with a hot meal.",
			es: "Productos agr\xEDcolas, conservas, huevos y carnes que se ofrecen con una comida caliente.",
		},
		website: "",
	},
	{
		address: "1711 Parker Road Wylie, 75098",
		hours: {
			en: [
				"Tuesday 10:00 AM - 2:00 PM",
				"Thursday 6:00 PM - 8:00 PM, Closed November 25, 2023",
				"Saturday 8:00 PM - 12:00 PM",
			],
			es: [
				"Martes 10:00 AM - 2:00 PM",
				"Jueves 6:00 PM - 8:00 PM, Cerrado el 25 de noviembre de 2023",
				"S\xE1bado  8:00 PM - 12:00 PM",
			],
		},
		idRequired: false,
		name: {
			en: "Amazing Grace Food Pantry",
			es: "Amazing Grace Food Pantry",
		},
		notes: {
			en: "",
			es: "",
		},
		phone: "(972) 292-7241",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		website: "http://www.AmazingGracePantry.org",
	},
	{
		address: "652 N. Redbud Blvd, Mckinney, 75069",
		hours: {
			en: [
				"Tuesday 2:00 PM - 4:00 PM",
				"First and Third Thursday 2:00 PM - 4:00 PM",
			],
			es: [
				"Martes 2:00 PM - 4:00 PM",
				"Primer y tercer jueves 2:00 PM - 4:00 PM",
			],
		},
		idRequired: true,
		name: {
			en: "St. Vincent de Paul",
			es: "St. Vincent de Paul",
		},
		notes: {
			en: "Must bring photo ID and proof of residency (utility bill or similar). once every 4 weeks",
			es: "Debe traer identificaci\xF3n con fotograf\xEDa y comprobante de residencia (factura de servicios p\xFAblicos o similar). una vez cada 4 semanas",
		},
		phone: "(214) 973-3435",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		website: "https://stmichaelmckinney.org/st-vincent-de-paul-",
	},
	{
		address: "3107 Hwy 5 (Mckinney St), Melissae, 75454",
		email: "Dena@project.org",
		hours: {
			en: ["Monday 5:00 PM - 6:30 PM", "Thursday 5:00 PM - 6:30 PM"],
			es: ["Lunes 5:00 PM - 6:30 PM", "Jueves 5:00 PM - 6:30 PM"],
		},
		idRequired: false,
		name: {
			en: "Melissa Community Outreach",
			es: "Melissa Community Outreach",
		},
		notes: {
			en: "May come once every 2 weeks.",
			es: "Puede venir una vez cada 2 semanas.",
		},
		phone: "(972) 521-7325",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		website: "https://25project.org",
	},
	{
		address: "801 E. Main St, Allen, 75002",
		hours: {
			en: [
				"Tuesday 9:00 AM - 11:00 AM, 5:00 PM - 7:00 PM",
				"Thursday 9:00 AM - 11:00 AM",
				"Saturday 9:00 AM - 11:00 AM",
			],
			es: ["Lunes 5:00 PM - 6:30 PM", "Jueves 5:00 PM - 6:30 PM"],
		},
		idRequired: true,
		name: {
			en: "Allen Community Outreach",
			es: "Allen Community Outreach",
		},
		notes: {
			en: "Proof of Collin County residency is required. For new clients, a QR code will be emailed after completion of a brief application in the drive-thru line. The QR code is required for future visits. Sometimes the need for food is NOW. For those extreme situations ACO\u2019s 801 E. Main Street location stocks a limited number of basic food supplies in our main office. If you are in need of emergency food, call ACO\u2019s office at 972-727-9131.",
			es: "Se requiere prueba de residencia en el condado de Collin. Para los nuevos clientes, se les enviar\xE1 un c\xF3digo QR por correo electr\xF3nico despu\xE9s de completar una breve solicitud en la fila del autoservicio. El c\xF3digo QR es necesario para futuras visitas. A veces la necesidad de comida es AHORA. Para esas situaciones extremas, la ubicaci\xF3n de ACO en 801 E. Main Street almacena una cantidad limitada de suministros de alimentos b\xE1sicos en nuestra oficina principal. Si necesita alimentos de emergencia, llame a la oficina de ACO al 972-727-9131.",
		},
		phone: "(972)-727-9131",
		services: {
			en: "Food pantry and financial assistance",
			es: "Despensa de alimentos y asistencia financiera",
		},
		website: "https://www.acocares.org/need-help/",
	},
	{
		address: "Hope Fellowship Church, 1702 W University Dr, McKinney, 75069",
		email: "hhkhut33@gmail.com",
		hours: {
			en: ["Second Saturday Mornings"],
			es: ["Segundo s\xE1bado por la ma\xF1ana"],
		},
		idRequired: true,
		name: {
			en: "Baby Booties Diaper Bank",
			es: "Banco de pa\xF1ales para patucos de beb\xE9",
		},
		notes: {
			en: "Eligibility Requirements: 1) Child under three years old 2) You find it hard to buy diapers and wipes each month 3) You are the main caregiver for the child 4) Collin County resident",
			es: "Se requiere prueba de residencia en el condado de Collin. Para los nuevos clientes, se les enviar\xE1 un c\xF3digo QR por correo electr\xF3nico despu\xE9s de completar una breve solicitud en la fila del autoservicio. El c\xF3digo QR es necesario para futuras visitas. A veces la necesidad de comida es AHORA. Para esas situaciones extremas, la ubicaci\xF3n de ACO en 801 E. Main Street almacena una cantidad limitada de suministros de alimentos b\xE1sicos en nuestra oficina principal. Si necesita alimentos de emergencia, llame a la oficina de ACO al 972-727-9131.",
		},
		phone: "(469) 939\u20139316",
		services: {
			en: "Provides diapers, wipes, period products, and occasionally formula to families",
			es: "Proporciona pa\xF1ales, toallitas h\xFAmedas, productos para la menstruaci\xF3n y, ocasionalmente, f\xF3rmula a las familias.",
		},
		website: "https://babybootiesdiaperbank.org/get-help/",
	},
];
var resources_default = resources;

// src/pages/Home.route.tsx
var HomeRoute = async ({ c }) => {
	const loaderData = {
		resources: resources_default,
	};
	return c.html(/* @__PURE__ */ jsxDEV(HomeView, { loaderData }));
};

// src/index.tsx
var app = new Hono2();
app.get("/", async (c) => {
	return HomeRoute({ c });
});
app.get("/assets/*", async (c) => {
	return await c.env.ASSETS.fetch(c.req);
});
var src_default = app;
export { src_default as default };
