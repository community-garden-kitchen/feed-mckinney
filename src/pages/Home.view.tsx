import type { FC } from "hono/jsx";

import { Layout } from "@/components/Layout";
import { HomeLoaderData } from "@/pages/Home.route";
import { ResourceItem } from "@/components/ResourceItem";

type HomeView = {
	loaderData: HomeLoaderData;
};

export const HomeView: FC<HomeView> = ({ loaderData }) => {
	const { resources } = loaderData;
	const description =
		"Food pantries and other resources available to citizens of McKinney, Texas.";

	return (
		<Layout title="Feed McKinney - Texas" description={description}>
			<header class="container">
				<hgroup>
					<h1>Feed McKinney</h1>
					<h2>
						Helping you find the best resources in McKinney and Collin County,
						Texas to help provide for your family.
					</h2>
				</hgroup>
			</header>

			<main class="container">
				<ul>
					{resources.map((resource) => (
						<ResourceItem resource={resource} language="en" />
					))}
				</ul>
			</main>

			<footer class="container">
				<p>
					Website maintained by Justin Noel in cooperation with the Community
					Garden Kitchen.
				</p>
				<p>
					To add your organization to this site or if corrections are needed for
					your organization, please send additions or corrections to
					<a href="mailto:info@feedmckinney.org"> info@feedmckinney.org</a>.
				</p>
			</footer>
		</Layout>
	);
};
