import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./ContactPage.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import Contact from "@/components/Contact/Contact";
import OurBlogs from "@/components/OurBlogs/OurBlogs";
import Testimonials from "@/components/Testimonials/Testimonials";
import OurClient from "@/components/OurClient/OurClient";

export async function generateMetadata({ params }: {
    params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/dashboard/section/contact`);
        const result = await res.json();
        const data = result?.data?.[0];

        const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";

        return {
            title: (isAr ? data?.meta_title_ar : data?.meta_title_en) || siteName,
            description: isAr ? data?.meta_description_ar : data?.meta_description_en,
            keywords: isAr ? data?.meta_keywords_ar : data?.meta_keywords_en,

            openGraph: {
                title: isAr ? data?.meta_title_ar : data?.meta_title_en,
                description: isAr ? data?.meta_description_ar : data?.meta_description_en,
                url: 'https://active4web.com',
                siteName: siteName,
                locale: isAr ? 'ar_EG' : 'en_US',
                type: 'website',
            },

            alternates: {
                languages: {
                    'ar-EG': `/ar/contact`,
                    'en-US': `/en/contact`,
                },
            },

            robots: {
                index: true,
                follow: true,
            }
        };
    } catch {
        return { title: isAr ? "تفاصيل المشروع" : "Project Details" };
    }
}

const ContactPage = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    return (
        <main className="contact-page">

            <HeadPage title={isEn ? "Contact" : "تواصل معنا"} />

            <Contact />

            <OurClient />

            <OurBlogs />

            <Testimonials />
        </main>
    );
}

export default ContactPage;