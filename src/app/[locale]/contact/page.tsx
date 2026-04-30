import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./ContactPage.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import Contact from "@/components/Contact/Contact";
import OurBlogs from "@/components/OurBlogs/OurBlogs";
import Testimonials from "@/components/Testimonials/Testimonials";
import OurClient from "@/components/OurClient/OurClient";

// --- 1. SEO Metadata ---
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const isAr = locale === "ar";

    const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";
    const pageTitle = isAr ? "تواصل معنا" : "Contact Us";

    return {
        title: pageTitle,
        description: isAr
            ? "تواصل مع أكتيف فور ويب للاستفسار عن خدمات تطوير المواقع والتطبيقات، طلبات المشاريع، والاستشارات التقنية والحلول الرقمية الاحترافية."
            : "Get in touch with Active4Web for web and app development services, project inquiries, consultations, and professional digital solutions.",
        keywords: isAr
            ? ["تواصل مع أكتيف فور ويب", "اتصل بنا", "شركة تطوير مواقع", "تطوير تطبيقات", "حلول رقمية"]
            : ["Contact Active4Web", "contact us", "web development services", "app development company", "business inquiries"],
        alternates: {
            languages: {
                'ar-EG': '/ar/contact',
                'en-US': '/en/contact',
            },
        },
        openGraph: {
            title: `${pageTitle} | ${siteName}`,
            description: isAr ? "نحن هنا لمساعدتك في بناء مشروعك الرقمي القادم." : "We are here to help you build your next digital project.",
            url: `https://active4web.com/${locale}/contact`,
            siteName: siteName,
            locale: isAr ? 'ar_EG' : 'en_US',
            type: 'website',
        },
    };
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