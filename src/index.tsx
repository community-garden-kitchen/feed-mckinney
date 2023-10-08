import { Hono } from "hono";

import { HomeRoute } from "@/pages/Home.route";
import { AppContext } from "@/types";

const app = new Hono<AppContext>();

app.get("/", async (c) => {
	return HomeRoute({ c });
});

app.get("/assets/*", async (c) => {
	return await c.env.ASSETS.fetch(c.req);
});

export default app;
