import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import "./ServicesDetails.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import Contact from "@/components/Contact/Contact";
import Testimonials from "@/components/Testimonials/Testimonials";

// تعريف هيكل المميزات أو المعلومات الإضافية للخدمة
export interface IServiceInfo {
    id: number | string;
    name_ar: string;
    name_en: string;
    details_ar: string;
    details_en: string;
}

// تعريف هيكل الخدمة بالكامل
export interface IService {
    id: number | string;
    image: string;
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    infos: IServiceInfo[];
}

// --- 1. الديناميك SEO Metadata ---
export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
    const { id, locale } = await params;
    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/api/services/show/${id}`);
        const result = await res.json();
        const service = result?.data;

        const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";

        return {
            title: (isAr ? service?.meta_title_ar : service?.meta_title_en) || siteName,
            description: isAr ? service?.meta_description_ar : service?.meta_description_en,
            keywords: isAr ? service?.meta_keywords_ar : service?.meta_keywords_en,

            openGraph: {
                title: isAr ? service?.meta_title_ar : service?.meta_title_en,
                description: isAr ? service?.meta_description_ar : service?.meta_description_en,
                url: 'https://active4web.com',
                siteName: siteName,
                locale: isAr ? 'ar_EG' : 'en_US',
                type: 'website',
            },

            alternates: {
                languages: {
                    'ar-EG': `/ar/services/services-details/${id}`,
                    'en-US': `/en/services/services-details/${id}`,
                },
            },

            robots: {
                index: true,
                follow: true,
            }
        };
    } catch {
        return { title: isAr ? "تفاصيل الخدمة" : "Service Details" };
    }
}

// --- 2. جلب بيانات الخدمة ---
async function getServiceData(id: string) {
    const res = await fetch(`https://api.active4web.com/api/services/show/${id}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
}

// --- 3. مكون الصفحة الرئيسي ---
const ServicesDetails = async ({
    params
}: {
    params: Promise<{ id: string }>
}) => {
    // فك الـ Promise الخاص بالـ params (Next.js 15)
    const { id } = await params;

    const locale = await getLocale();
    const isEn = locale === "en";

    const serviceResponse = await getServiceData(id);
    const service = serviceResponse?.data;

    if (!service) {
        return <div className="not-found">Service not found</div>;
    }

    return (
        <main className="services-details">
            <HeadPage title={isEn ? service.name_en : service.name_ar} />

            <section className="details">
                <div className="container">
                    <div className="head">
                        <div className="image">
                            <Image
                                src={service.image}
                                alt={isEn ? service.name_en : service.name_ar}
                                width={600}
                                height={400}
                                priority
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                        <div className="info">
                            <h2>{isEn ? "Service Details" : "تفاصيل الخدمة"}</h2>
                            <p>{isEn ? service.description_en : service.description_ar}</p>
                        </div>
                    </div>

                    {service.infos?.length > 0 && (
                        <div className="features-section">
                            <h3>{isEn ? "What We Offer" : "ما نقدمه"}</h3>

                            <div className="featuer">
                                {service.infos.map((el: IServiceInfo, idx: number) => (
                                    <div className="box" key={el.id || idx}>
                                        <div className="num">
                                            <p>{idx + 1}</p>
                                        </div>

                                        <div className="info-box">
                                            <h4>{isEn ? el.name_en : el.name_ar}</h4>
                                            <p>{isEn ? el.details_en : el.details_ar}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <WhyChoose />
            <Contact />
            <Testimonials />
        </main>
    );
};

export default ServicesDetails;