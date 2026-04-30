import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import "./BlogDetails.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import HeadSec from "@/components/HeadSec/HeadSec";
import Blog from "@/components/Blog/Blog";

// --- 1. تعريف الـ Interfaces ---
export interface IBlog {
    id: string | number;
    image: string;
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    details_ar?: string;
    details_en?: string;
    created_date: string; // وحدنا المسمى هنا
}

// --- 2. SEO Metadata الديناميكي ---
export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
    const { id, locale } = await params;
    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/api/articles/show/${id}`);
        const result = await res.json();
        const blog = result?.data as IBlog;

        const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";
        const title = isAr ? blog?.name_ar : blog?.name_en;

        return {
            title: `${title} | ${siteName}`,
            description: isAr ? blog?.description_ar : blog?.description_en,
            openGraph: {
                title: title,
                images: [blog?.image],
                type: 'article',
            },
        };
    } catch {
        return { title: isAr ? "تفاصيل المقال" : "Blog Details" };
    }
}

// --- 3. جلب البيانات (المقال الحالي والمقالات ذات الصلة) ---
async function getBlogData(id: string) {
    const res = await fetch(`https://api.active4web.com/api/articles/show/${id}`, {
        next: { revalidate: 3600 }
    });
    return res.json();
}

async function getAllBlogs() {
    const res = await fetch(`https://api.active4web.com/api/articles`, {
        next: { revalidate: 3600 }
    });
    return res.json();
}

// --- 4. المكون الرئيسي ---
const BlogDetails = async ({
    params
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    const locale = await getLocale();
    const isEn = locale === "en";

    // جلب البيانات من السيرفر
    const [blogRes, allBlogsRes] = await Promise.all([
        getBlogData(id),
        getAllBlogs()
    ]);

    const currentBlog = blogRes?.data as IBlog;
    const relatedBlogs = allBlogsRes?.data?.slice(0, 3) as IBlog[];

    if (!currentBlog) return <div className="not-found">Blog Not Found</div>;

    return (
        <main className="blog-details">
            {/* الـ SEO يتم التعامل معه عبر generateMetadata */}

            <HeadPage title={isEn ? "Blog Details" : "تفاصيل المقال"} />

            <div className="details">
                <div className="container">
                    <div className="image">
                        <Image
                            src={currentBlog.image}
                            alt="blog-main"
                            width={1200}
                            height={600}
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    <div>
                        <div className="head">
                            <p className="date">{currentBlog.created_date}</p>
                            <h3>{isEn ? currentBlog.name_en : currentBlog.name_ar}</h3>
                            <p className="desc">
                                {isEn ? currentBlog.description_en : currentBlog.description_ar}
                            </p>
                        </div>

                        <div className="content">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: (isEn ? currentBlog.details_en : currentBlog.details_ar) || ""
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="related">
                <HeadSec
                    title={isEn ? "Related News & Blogs" : "أخبار ومدونات ذات صلة"}
                />

                <div className="related-all">
                    <div className="container">
                        {relatedBlogs?.map((el) => (
                            <Blog key={el.id} el={el} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogDetails;