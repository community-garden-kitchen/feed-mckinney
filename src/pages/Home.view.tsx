import type { FC } from "hono/jsx";

import { Layout } from "@/components/Layout";
import { HomeLoaderData } from "@/pages/Home.route";
import { ResourceItem } from "@/components/ResourceItem";
import translations from "@/data/translations";

type HomeViewProps = {
	loaderData: HomeLoaderData;
};

export const HomeView: FC<HomeViewProps> = ({ loaderData }) => {
	const { language, resources } = loaderData;
	const switchToLanguage = language === "en" ? "es" : "en";

	return (
		<Layout
			title="Feed McKinney - Texas"
			description={translations.description[language]}
			language={language}
		>
			<header class="container">
				<hgroup>
					<div class="title-language">
						<a
							href={`?lang=${switchToLanguage}`}
							lang={`${switchToLanguage}`}
							hreflang={`${switchToLanguage}`}
						>
							{translations.languageVersion[switchToLanguage]}
						</a>
						<h1>
							{translations.feedMckinney[language]}{" "}
							{language !== "en"
								? `(${translations.feedMckinney["en"]})`
								: null}
						</h1>
					</div>
					<h2>{translations.mission[language]}</h2>
				</hgroup>
			</header>

			<main class="container">
				<ul>
					{resources.map((resource) => (
						<ResourceItem resource={resource} language={language} />
					))}
				</ul>
			</main>

			<footer class="container">
				<p>{translations.siteMaintainenance[language]}</p>
				<p>
					{translations.updatesText[language]}
					<a href="mailto:info@feedmckinney.org"> info@feedmckinney.org</a>.
				</p>
			</footer>
		</Layout>
	);
};
