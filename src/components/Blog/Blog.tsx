import "./Blog.scss";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// 1. تعريف الـ Interface هنا (أو استيراده)
export interface IBlog {
    id: string | number;
    image: string;
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    details_ar?: string;
    details_en?: string;
    created_date: string; // التأكد من مطابقة مسمى الـ API
}

interface BlogProps {
    el: IBlog;
}

// 2. المكون مع استخدام الـ Interface الموحد
const Blog = async ({ el }: BlogProps) => {
    const locale = await getLocale();
    const isEn = locale === "en";

    return (
        <div className="blog">
            <div className="image">
                <Image
                    src={el?.image || "/images/placeholder.jpg"}
                    alt={`blog ${isEn ? el?.name_en : el?.name_ar}`}
                    width={500}
                    height={300}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className="info">
                <h3>{isEn ? el?.name_en : el?.name_ar}</h3>

                <p>{isEn ? el?.description_en : el?.description_ar}</p>

                <div className="control">
                    <p className="date">
                        {el?.created_date ? el.created_date.split('T')[0] : "---"}
                    </p>

                    <Link href={`/blogs/blog-details/${el?.id}`}>
                        {isEn ? "Read More" : "اقرأ المزيد"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Blog;