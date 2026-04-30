import "./Testimonials.scss";
import { getLocale } from "next-intl/server";
import HeadSec from "../HeadSec/HeadSec";
import TestimonialsSlider from "../TestimonialsSlider/TestimonialsSlider";

export interface Review {
    id: number | string;
    image: string | null;
    name_ar: string;
    name_en: string;
    comment_ar: string;
    comment_en: string;
}

async function getReviews() {
    try {
        const res = await fetch("https://api.active4web.com/dashboard/reviews", {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const result = await res.json();
        return result?.data || [];
    } catch {
        return [];
    }
}

const Testimonials = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";
    const reviews = await getReviews();

    return (
        <section className="testimonials">
            <HeadSec title={isEn ? "Testimonials" : "آراء العملاء"} />

            <p className="sub-title">
                {isEn ?
                    "What do our customers say about us?" :
                    "ماذا يقول عملاؤنا عنا؟"}
            </p>

            <div className="all-comments">
                <div className="container">
                    <TestimonialsSlider reviews={reviews} locale={locale} />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;