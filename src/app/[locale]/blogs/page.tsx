import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./BlogsPage.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import OurBlogs from "@/components/OurBlogs/OurBlogs";
import Testimonials from "@/components/Testimonials/Testimonials";

export async function generateMetadata({ params }: {
    params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/dashboard/section/blogs`);
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
                    'ar-EG': `/ar/blogs`,
                    'en-US': `/en/blogs`,
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

// --- 2. Page Component ---
const BlogsPage = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    return (
        <main className="blogs-page">
            <HeadPage title={isEn ? "Blogs" : "مقالات"} />

            <OurBlogs isBlogPage={true} />

            <Testimonials />
        </main>
    );
}

export default BlogsPage;