import "./AboutPage.scss";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";
import HeadPage from "@/components/HeadPage/HeadPage";
import AboutSec from "@/components/AboutSec/AboutSec";
import MarqueeComp from "@/components/Marquee/Marquee";
import WorkProcess from "@/components/WorkProcess/WorkProcess";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import OurClient from "@/components/OurClient/OurClient";
import HeadSec from "@/components/HeadSec/HeadSec";
import OurTeamSlider from "@/components/OurTeamSlider/OurTeamSlider";
import Statistics from "@/components/Statistics/Statistics";

export async function generateMetadata({ params }: {
    params: Promise<{ id: string, locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/dashboard/section/about`);
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
                    'ar-EG': `/ar/about`,
                    'en-US': `/en/about`,
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

const AboutPage = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    const employees = [
        { name: "Beshoy Hamam", job: "Frontend - Team Leader", image: "/images/Beshoy.png" },
        { name: "Mohamed Tarek", job: "UI / UX", image: "/images/mohamed.png" },
        { name: "Atif Rizk", job: "Backend", image: "/images/atif.png" },
        { name: "Abdulaziz", job: "Flutter", image: "/images/Adobe-Express.png" },
        { name: "Yousef Ahmed", job: "Backend", image: "/images/yousef.png" },
        { name: "Mostafa Hesham", job: "Frontend", image: "/images/mostafa.png" },
    ];

    return (
        <div className="about-page">
            <HeadPage title={isEn ? "About Us" : "من نحن"} />

            <AboutSec />
            <MarqueeComp />

            <section className="our-vision-mission">
                <div className="head">
                    <div className="container">
                        <div className="box">
                            <div className="name-image">
                                <Image src="/icons/icon001.png" alt="Mission" width={50} height={50} />
                                <h4>{isEn ? "Our Mission" : "مهمتنا"}</h4>
                            </div>
                            <p>
                                {isEn
                                    ? "To provide high-quality services focused on innovation and user experience..."
                                    : "تقديم خدمات عالية الجودة تركز على الابتكار وتجربة المستخدم..."}
                            </p>
                            <Image src="/icons/icon003.png" alt="icon" width={80} height={80} className="abs-icon" />
                        </div>

                        <div className="box">
                            <div className="name-image">
                                <Image src="/icons/icon002.png" alt="Vision" width={50} height={50} />
                                <h4>{isEn ? "Our Vision" : "رؤيتنا"}</h4>
                            </div>
                            <p>
                                {isEn
                                    ? "To be pioneers in designing and developing applications..."
                                    : "أن نكون روادًا في تصميم وتطوير التطبيقات والمواقع..."}
                            </p>
                            <Image src="/icons/icon004.png" alt="icon" width={80} height={80} className="abs-icon" />
                        </div>
                    </div>
                </div>

                <div className="video-sec">
                    <div className="container">
                        <div className="poster">
                            <Image
                                src="/images/creative-people.png"
                                alt="poster"
                                width={1200}
                                height={500}
                                className="main-poster"
                            />
                        </div>
                    </div>
                </div>

                <Statistics />
            </section>

            <MarqueeComp />
            <WorkProcess />
            <OurClient />

            <section className="our-team">
                <HeadSec title={isEn ? "Our Team" : "فريقنا"} />
                <div className="container">
                    <OurTeamSlider members={employees} />
                </div>
            </section>

            <WhyChoose />
            <Contact />
            <Testimonials />
        </div>
    );
};

export default AboutPage;