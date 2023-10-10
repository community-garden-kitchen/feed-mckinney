import { Context, Schema, HonoRequest } from "hono/dist/context";

type Env = {
	ASSETS: Fetcher;
};

// The generic T is for the URL params like `/:recordings-id` or `/:customers-id`
type AppContext<T = string> = Context<
	T,
	{ req: HonoRequest<string, Input>; Bindings: Env }
>;
