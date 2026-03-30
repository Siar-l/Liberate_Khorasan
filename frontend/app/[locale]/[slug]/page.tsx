import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{
		locale: "fa" | "en";
		slug: string;
	}>;
};

export default async function LocaleSlugPage({ params }: PageProps) {
	await params;
	notFound();
}

