
"use client";

import { useParams } from "next/navigation";

type Locale = "fa" | "en";

type ContactTexts = {
    badge: string;
    title: string;
    formtitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
};

const content: Record<Locale, ContactTexts> = {
    fa: {
        badge: "تماس با ما",
        title: "برای پرسیدن سوالات یا همکاری با ما، لطفاً از طریق اطلاعات زیر با ما تماس بگیرید:",
        formtitle: "فرم تماس",
        name: "نام",
        email: "ایمیل",
        subject: "موضوع",
        message: "پیام",
        namePlaceholder: "نام خود را وارد کنید",
        emailPlaceholder: "ایمیل خود را وارد کنید",
        subjectPlaceholder: "موضوع پیام خود را وارد کنید",
        messagePlaceholder: "پیام خود را اینجا بنویسید",
        submit: "ارسال",
        
    
    },
    en: {
        badge: "Contact Us",
        title: "For inquiries or collaboration, please contact us using the information below:",
        formtitle: "Send Us a Message",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your email",
        subjectPlaceholder: "Enter the subject of your message",
        messagePlaceholder: "Enter your message",
        submit: "Submit"
    }

};
export default function ContactPage() {
    const params = useParams<{ locale?: string }>();
    const locale: Locale = params?.locale === "en" ? "en" : "fa";
    const texts = content[locale] ?? content.fa;
    const isFa = locale === "fa";

    return (
        <main
           dir = {isFa ? "rtl" : "ltr"}
           className="flex min-h-[72svh] md:min-h-screen items-center justify-center bg-gray-100 px-5 py-14 sm:px-8 md:py-0">
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">{texts.badge}</h1>
                <p className="text-gray-600 mb-6">{texts.title}</p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            {texts.name}
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder={texts.namePlaceholder}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {texts.email}
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder={texts.emailPlaceholder}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            {texts.subject}
                        </label>
                        <input
                            type="text"
                            id="subject"
                            placeholder={texts.subjectPlaceholder}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            {texts.message}
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            placeholder={texts.messagePlaceholder}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        {texts.submit}
                    </button>
                </form>
            </section>
        </main>
    );
}