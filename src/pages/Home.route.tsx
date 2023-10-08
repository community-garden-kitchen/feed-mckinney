import { HomeView } from "@/pages/Home.view";
import { AppContext } from "@/types";
import resources, { Resource } from "@/data/resources";

type HomeRoute = {
	c: AppContext;
};

export type HomeLoaderData = {
	resources: Resource[];
};

export const HomeRoute = async ({ c }: HomeRoute) => {
	const loaderData = {
		resources: resources,
	};

	return c.html(<HomeView loaderData={loaderData} />);
};
