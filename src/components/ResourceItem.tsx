import type { FC } from "hono/jsx";

import { Resource } from "@/data/resources";
import { Language } from "@/pages/Home.route";
import translations from "@/data/translations";

type ResourceProps = {
	language: Language;
	resource: Resource;
};

export const ResourceItem: FC<ResourceProps> = ({
	language = "en",
	resource,
}) => {
	const addressUrl = `http://maps.apple.com/?daddr=${resource.address}`;
	return (
		<li>
			<h2 class="underline name">{resource.name[language]}</h2>
			<div>
				<a href={addressUrl} class="underline">
					{resource.address}
				</a>
			</div>

			{resource.phone ? <div>{resource.phone}</div> : null}

			{resource.email ? <div>{resource.email}</div> : null}

			{resource.website ? (
				<a href={resource.website} class="underline">
					{resource.website}
				</a>
			) : null}

			{resource?.services?.[language] ? (
				<div>
					<span class="bold">{translations.services[language]}: </span>
					{resource.services[language]}
				</div>
			) : null}

			{resource?.notes?.[language] ? (
				<div>
					<span class="bold">{translations.notes[language]}: </span>
					{resource.notes[language]}
				</div>
			) : null}

			<div>
				<span class="bold">{translations.idRequired[language]}: </span>

				{resource.idRequired ? "Yes" : "No"}
			</div>

			<h3 class="secondary-list">{translations.hours[language]}:</h3>
			{resource.hours[language] ? (
				<ul>
					{resource.hours[language].map((hour) => (
						<li>{hour}</li>
					))}
				</ul>
			) : null}

			{resource.additionalResources ? (
				<>
					<h3 class="secondary-list">
						{translations.additionalResources[language]}{" "}
						{resource.name[language]}:
					</h3>
					<ul class="subsection secondary">
						{resource.additionalResources.map((resource) => (
							<ResourceItem resource={resource} language={language} />
						))}
					</ul>
				</>
			) : null}
		</li>
	);
};
