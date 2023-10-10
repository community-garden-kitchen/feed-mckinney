import { parse } from "accept-language-parser";

import { HomeView } from "@/pages/Home.view";
import { AppContext } from "@/types";
import resources, { Resource } from "@/data/resources";

export type Language = (typeof acceptedLanguages)[number];
export const acceptedLanguages = ["en", "es"] as const;

type HomeRoute = {
	c: AppContext;
};

export type HomeLoaderData = {
	language: Language;
	resources: Resource[];
};

export const HomeRoute = async ({ c }: HomeRoute) => {
	const languages = parse(c.req.headers.get("Accept-Language"));
	let language = (languages?.[0]?.code as Language) || "en";
	language = acceptedLanguages.includes(language) ? language : "en";
	const { lang: preferredLanguage }: { lang: Language } = c.req.query();

	const loaderData = {
		language: preferredLanguage || language,
		resources: resources,
	};

	return c.html(<HomeView loaderData={loaderData} />);
};
