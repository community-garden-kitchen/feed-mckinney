import { html } from "hono/html";
import type { FC } from "hono/jsx";

import { Language } from "@/pages/Home.route";

type LayoutProps = {
	children?: unknown;
	description?: string;
	language: Language;
	title: string;
};

export const Layout: FC<LayoutProps> = ({
	children,
	description,
	language,
	title,
}) => {
	return html`<!doctype html>
		<html
			lang="${language}"
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
				<script
					async
					defer
					src="https://visitors.feedmckinney.org/latest.js"
				></script>
				<noscript
					><img
						src="https://visitors.feedmckinney.org/noscript.gif"
						alt=""
						referrerpolicy="no-referrer-when-downgrade"
				/></noscript>
			</body>
		</html>`;
};
