import Link from "next/link";
import AnnouncementCard from "@/components/AnnouncementCard";
import { getAnnouncements, STRAPI_URL } from "@/lib/api";

type HomeAnnouncementsSectionProps = {
	locale: "fa" | "en";
};

type StrapiItem = {
	id: number;
	attributes?: Record<string, unknown>;
	[key: string]: unknown;
};

const readField = (item: StrapiItem, key: string): unknown => {
	if (key in item) return item[key];
	if (item.attributes && key in item.attributes) return item.attributes[key];
	return undefined;
};

const extractMediaUrl = (value: unknown): string | undefined => {
	const getUrl = (source: unknown): string | undefined => {
		if (!source || typeof source !== "object") return undefined;
		const raw = (source as { url?: unknown }).url;
		if (typeof raw === "string" && raw.length > 0) return raw;
		const attrs = (source as { attributes?: { url?: unknown } }).attributes;
		if (attrs && typeof attrs.url === "string" && attrs.url.length > 0) return attrs.url;
		return undefined;
	};

	if (Array.isArray(value)) return getUrl(value[0]);

	if (value && typeof value === "object") {
		const data = (value as { data?: unknown }).data;
		if (Array.isArray(data)) return getUrl(data[0]);
		if (data && typeof data === "object") return getUrl(data);
		return getUrl(value);
	}

	return undefined;
};

const toAbsoluteUrl = (url: string | undefined): string | undefined => {
	if (!url) return undefined;
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	return `${STRAPI_URL}${url}`;
};

export default async function HomeAnnouncementsSection({
	locale,
}: HomeAnnouncementsSectionProps) {
	const isFa = locale === "fa";
	let items: StrapiItem[] = [];

	try {
		const response = await getAnnouncements(locale);
		const data = (response as { data?: unknown }).data;
		if (Array.isArray(data)) {
			items = (data as StrapiItem[]).slice(0, 3);
		}
	} catch {
		items = [];
	}

	return (
		<section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
			<div className="mb-10 flex items-center justify-between gap-4">
				<div>
					<span className="text-sm font-medium text-gray-500">
						{isFa ? "بخش اطلاعیه ها" : "Announcements Section"}
					</span>
					<h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
						{isFa ? "اطلاعیه ها" : "Announcements"}
					</h2>
					<p className="mt-3 max-w-2xl leading-7 text-gray-600">
						{isFa
							? "آخرین اطلاعیه ها و به روزرسانی ها را در این بخش دنبال کنید."
							: "Follow the latest announcements, notices, and updates in this section."}
					</p>
				</div>

				<Link
					href={`/${locale}/announcements`}
					className="hidden rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 md:inline-block"
				>
					{isFa ? "همه اطلاعیه ها" : "All Announcements"}
				</Link>
			</div>

			<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
				{items.map((item) => {
					const title = (readField(item, "title") as string | undefined) ?? (isFa ? "بدون عنوان" : "Untitled");
					const excerpt = (readField(item, "excerpt") as string | undefined) ?? "";
					const slug = (readField(item, "slug") as string | undefined) ?? String(item.id);
					const type = (readField(item, "type") as string | undefined) ?? (isFa ? "اطلاعیه" : "Announcement");
					const date =
						(readField(item, "publishedAtCustom") as string | undefined) ??
						(readField(item, "publishedAt") as string | undefined) ??
						"";
					const image = toAbsoluteUrl(extractMediaUrl(readField(item, "attachment")));

					return (
						<AnnouncementCard
							key={item.id}
							locale={locale}
							announcement={{
								id: item.id,
								title,
								excerpt,
								slug,
								date,
								type,
								image,
							}}
						/>
					);
				})}
			</div>

			<div className="mt-8 md:hidden">
				<Link
					href={`/${locale}/announcements`}
					className="inline-block rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
				>
					{isFa ? "همه اطلاعیه ها" : "All Announcements"}
				</Link>
			</div>
		</section>
	);
}
