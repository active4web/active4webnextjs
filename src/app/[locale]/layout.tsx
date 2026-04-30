import "@/styles/global.scss";
import { Almarai, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const arabicFont = Almarai({
    subsets: ["arabic"],
    weight: ["300", "400", "700"],
    variable: "--font-ar",
});

const englishFont = Inter({
    subsets: ["latin"],
    variable: "--font-en",
    display: 'swap',
});

async function getSettings() {
    const res = await fetch("https://api.active4web.com/dashboard/settings", {
        cache: 'no-store'
    });
    return res.json();
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const [messages, settingsData] = await Promise.all([
        getMessages(),
        getSettings()
    ]);

    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={`${arabicFont.variable} ${englishFont.variable}`}
        >
            <body>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Header settings={settingsData} />
                    {children}
                    <ScrollToTop />
                    <Footer data={settingsData} />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}