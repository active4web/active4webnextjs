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
    description_ar?: string;
    description_en?: string;
}

export async function generateMetadata({ params }: {
    params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/dashboard/section/services`);
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
                    'ar-EG': `/ar/services`,
                    'en-US': `/en/services`,
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