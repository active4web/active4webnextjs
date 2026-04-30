import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./BlogsPage.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import OurBlogs from "@/components/OurBlogs/OurBlogs";
import Testimonials from "@/components/Testimonials/Testimonials";

// --- 1. SEO Metadata (Server Side) ---
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const isAr = locale === "ar";

    const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";
    const pageTitle = isAr ? "المقالات" : "Blog";

    return {
        title: pageTitle,
        description: isAr
            ? "اطّلع على أحدث مقالات أكتيف فور ويب في تطوير المواقع، البرمجة، تصميم UI/UX، تحسين محركات البحث (SEO)، والحلول الرقمية الحديثة."
            : "Read the latest articles from Active4Web about web development, programming tips, UI UX design, SEO strategies, and modern digital solutions.",
        keywords: isAr
            ? ["مقالات أكتيف فور ويب", "مدونة برمجة", "مقالات تطوير مواقع", "نصائح UI UX", "مقالات SEO"]
            : ["Active4Web blog", "web development articles", "programming blog", "UI UX tips", "SEO articles"],
        alternates: {
            languages: {
                'ar-EG': '/ar/blogs',
                'en-US': '/en/blogs',
            },
        },
        openGraph: {
            title: `${pageTitle} | ${siteName}`,
            description: isAr ? "دليلك للتقنية والبرمجة الحديثة" : "Your guide to modern tech and programming",
            url: `https://active4web.com/${locale}/blogs`,
            siteName: siteName,
            locale: isAr ? 'ar_EG' : 'en_US',
            type: 'website',
        },
    };
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