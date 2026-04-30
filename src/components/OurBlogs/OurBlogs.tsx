import "./OurBlogs.scss";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeadSec from "../HeadSec/HeadSec";
import MarqueeComp from "../Marquee/Marquee";
import Blog from "../Blog/Blog";

export interface Article {
    id: number | string;
    image: string;
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    created_at: string;
}

async function getBlogs() {
    try {
        const res = await fetch("https://api.active4web.com/api/articles", {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const result = await res.json();
        return result?.data || [];
    } catch {
        return [];
    }
}

interface OurBlogsProps {
    isBlogPage?: boolean;
}

const OurBlogs = async ({ isBlogPage = false }: OurBlogsProps) => {
    const locale = await getLocale();
    const isEn = locale === "en";
    const blogs: Article[] = await getBlogs();
    const displayedBlogs = isBlogPage ? blogs : blogs.slice(0, 3);

    return (
        <section className="our-blogs">
            <HeadSec title={isEn ? "News & Blogs" : "الأخبار والمدونات"} />

            <p className="sub-title">
                {isEn ? "Our Latest News & Blogs" : "آخر الأخبار والمدونات"}
            </p>

            <div className="all-blogs">
                <div className="container">
                    {displayedBlogs.map((el) => (
                        <Blog key={el.id} el={el} />
                    ))}
                </div>
            </div>

            {!isBlogPage && (
                <div className="center-btn">
                    <Link href="/blogs" className="show-more">
                        {isEn ? "Show More" : "شاهد المزيد"}
                    </Link>
                </div>
            )}

            <MarqueeComp />
        </section>
    );
};

export default OurBlogs;