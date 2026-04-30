import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./ServicesPage.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import HeadSec from "@/components/HeadSec/HeadSec";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import Contact from "@/components/Contact/Contact";
import Testimonials from "@/components/Testimonials/Testimonials";
import Service from "@/components/Service/Service";

export interface IService {
    id: number | string;
    image: string;
    name_ar: string;
    name_en: string;
    description_ar?: string; // أضفتها لو هتحتاجها في التفاصيل
    description_en?: string;
}

// --- 1. SEO Metadata ---
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const isAr = locale === "ar";

    const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";
    const pageTitle = isAr ? "خدماتنا" : "Our Services";

    return {
        title: pageTitle,
        description: isAr
            ? "اكتشف مجموعة الخدمات الاحترافية التي تقدمها شركة أكتيف فور ويب، بما في ذلك تطوير المواقع، تطوير التطبيقات، تصميم UX/UI، وتحسين محركات البحث."
            : "Discover professional services by Active4Web, including web and mobile app development, UX/UI design, and SEO optimization.",
        keywords: isAr
            ? ["تطوير مواقع", "تطوير تطبيقات", "تصميم UX/UI", "أكتيف فور ويب", "خدمات برمجية"]
            : ["web development", "mobile app development", "UX/UI design", "Active4Web", "software services"],
        alternates: {
            languages: {
                'ar-EG': '/ar/services',
                'en-US': '/en/services',
            },
        },
        openGraph: {
            title: `${pageTitle} | ${siteName}`,
            url: `https://active4web.com/${locale}/services`,
            siteName: siteName,
            type: 'website',
        },
    };
}

// --- 2. Data Fetching ---
async function getServices() {
    try {
        const res = await fetch("https://api.active4web.com/api/services", {
            cache: "no-store"
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        return result?.data || [];
    } catch {
        return [];
    }
}

// --- 3. Page Component ---
const ServicesPage = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";
    const services = await getServices();

    return (
        <main className="services-page">
            {/* Header القسم العلوي */}
            <HeadPage title={isEn ? "Services" : "الخدمات"} />

            {/* سكشن الخدمات الأساسي */}
            <section className="current-services">
                <div className="container">
                    <HeadSec title={isEn ? "Our Services" : "خدماتنا"} />

                    <p className="sub-heading">
                        {isEn ?
                            "Services We Provide to Elevate Your Business" :
                            "الخدمات التي نقدمها للارتقاء بأعمالك"}
                    </p>

                    <div className="all-services">
                        {services.map((el: IService) => (
                            <Service el={el} key={el.id} />
                        ))}
                    </div>
                </div>
            </section>

            {/* مكونات مشتركة */}
            <WhyChoose />
            <Contact />
            <Testimonials />
        </main>
    );
}

export default ServicesPage;