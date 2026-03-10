import * as cheerio from "cheerio";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const url = searchParams.get("url");

	if (!url) {
		return Response.json({ error: "URL required" }, { status: 400 });
	}

	try {
		const res = await fetch(url);
		const html = await res.text();

		const $ = cheerio.load(html);

		const title = $("meta[property='og:title']").attr("content") || $("title").text();

		const description =
			$("meta[property='og:description']").attr("content") ||
			$("meta[name='description']").attr("content");

		const faviconHref =
			$("link[rel='icon']").attr("href") ||
			$("link[rel='shortcut icon']").attr("href") ||
			"/favicon.ico";

		const favicon = new URL(faviconHref, url).href;

		return Response.json(
			{
				title,
				description,
				favicon,
			},
			{ status: 200 }
		);
	} catch {
		return Response.json({ error: "Failed to fetch site" }, { status: 500 });
	}
}
