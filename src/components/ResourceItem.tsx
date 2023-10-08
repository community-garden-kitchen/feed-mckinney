import type { FC } from "hono/jsx";

import { Resource } from "@/data/resources";

type ResourceProps = {
	language: "en" | "es";
	resource: Resource;
};

export const ResourceItem: FC<ResourceProps> = ({
	language = "en",
	resource,
}) => {
	return (
		<li>
			<div class="underline name">{resource.name[language]}</div>
			<div>{resource.address}</div>

			{resource.phone ? <div>{resource.phone}</div> : null}

			{resource.email ? <div>{resource.email}</div> : null}

			{resource.website ? (
				<a href={resource.website} class="underline">
					{resource.website}
				</a>
			) : null}

			{resource.services[language] ? (
				<div>
					<span class="bold">Services: </span>
					{resource.services[language]}
				</div>
			) : null}

			{resource.notes[language] ? (
				<div>
					<span class="bold">Notes: </span>
					{resource.notes[language]}
				</div>
			) : null}

			<div>
				<span class="bold">ID Required: </span>

				{resource.idRequired ? "Yes" : "No"}
			</div>

			{resource.hours[language] ? (
				<ul>
					<summary class="secondary">Hours:</summary>
					{resource.hours[language].map((hour) => (
						<li>{hour}</li>
					))}
				</ul>
			) : null}

			{resource.image ? <div>{resource.image}</div> : null}

			{resource.additionalResources ? (
				<ul class="secondary">
					<summary class="secondary">
						Additional resources at {resource.name[language]}:
					</summary>
					{resource.additionalResources.map((resource) => (
						<ResourceItem resource={resource} language={language} />
					))}
				</ul>
			) : null}
		</li>
	);
};
