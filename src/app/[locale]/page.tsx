import AboutSec from "@/components/AboutSec/AboutSec";
import Hero from "@/components/HomeComp/Hero/Hero";
import WorkProcess from "@/components/WorkProcess/WorkProcess";
import ServicesComp from "@/components/HomeComp/ServicesComp/ServicesComp";
import MarqueeComp from "@/components/Marquee/Marquee";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import OurProjects from "@/components/HomeComp/OurProjects/OurProjects";
import OurClient from "@/components/OurClient/OurClient";
import OurBlogs from "@/components/OurBlogs/OurBlogs";
import Testimonials from "@/components/Testimonials/Testimonials";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const isAr = locale === "ar";

    const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";
    const titleSuffix = isAr ? "تطوير مواقع وتطبيقات احترافية" : "Professional Web & App Development";

    return {
        title: {
            template: `%s | ${siteName}`,
            default: `${siteName} | ${titleSuffix}`,
        },

        description: isAr
            ? "شركة أكتيف فور ويب تقدم خدمات تطوير مواقع وتطبيقات موبايل عالية الجودة، مع التركيز على الابتكار، تجربة المستخدم، والحلول البرمجية المتكاملة."
            : "Active4Web provides high-quality web and mobile app development services, focusing on innovation, user experience, and professional software solutions.",

        keywords: isAr
            ? [
                "تطوير مواقع", "تطوير تطبيقات موبايل", "حلول برمجية",
                "تصميم UX/UI", "تحسين محركات البحث", "أكتيف فور ويب",
                "شركة برمجة في مصر", "برمجة تطبيقات"
            ]
            : [
                "web development", "mobile app development", "software solutions",
                "UX/UI design", "SEO", "Active4Web",
                "software company Egypt", "nextjs developer"
            ],

        openGraph: {
            title: isAr ? "أكتيف فور ويب - ابتكار بلا حدود" : "Active4Web - Innovation Without Limits",
            description: isAr
                ? "دليلك لتطوير حلول برمجية ومواقع ذكية تواكب العصر."
                : "Your guide to developing smart software solutions and modern websites.",
            url: 'https://active4web.com',
            siteName: siteName,
            locale: isAr ? 'ar_EG' : 'en_US',
            type: 'website',
        },

        alternates: {
            languages: {
                'ar-EG': '/ar',
                'en-US': '/en',
            },
        },

        robots: {
            index: true,
            follow: true,
        }
    };
}

export default function Home() {
    return (
        <main>
            <Hero />
            <MarqueeComp />
            <AboutSec />
            <WorkProcess />
            <ServicesComp />
            <WhyChoose />
            <OurProjects />
            <OurClient />
            <OurBlogs />
            <Testimonials />
        </main>
    );
}
