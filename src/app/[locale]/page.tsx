import AboutSec from "@/components/AboutSec/AboutSec";
import Hero from "@/components/HomeComp/Hero/Hero";
import WorkProcess from "@/components/WorkProcess/WorkProcess";
import ServicesComp from "@/components/HomeComp/ServicesComp/ServicesComp";
import MarqueeComp from "@/components/Marquee/Marquee";
import { Metadata } from "next";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import OurProjects from "@/components/HomeComp/OurProjects/OurProjects";
import OurClient from "@/components/OurClient/OurClient";
import OurBlogs from "@/components/OurBlogs/OurBlogs";
import Testimonials from "@/components/Testimonials/Testimonials";

// --- 1. الـ Metadata مع فك الـ Promise ---
export async function generateMetadata({ params }: {
    params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/dashboard/section/home`);
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
                    'ar-EG': `/ar`,
                    'en-US': `/en`,
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
