import "./WhyChoose.scss";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import MarqueeComp from "../Marquee/Marquee";
import HeadSec from "../HeadSec/HeadSec";

const WhyChoose = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    const features = [
        {
            id: 1,
            icon: "/icons/why-choose-1.png",
            title: isEn ? "Expert Team" : "فريق الخبراء",
            desc: isEn
                ? "Years of experience in web, app, and software development."
                : "سنوات من الخبرة في تطوير مواقع الويب والتطبيقات والبرمجيات."
        },
        {
            id: 2,
            icon: "/icons/why-choose-2.png",
            title: isEn ? "Custom Solutions" : "حلول مخصصة",
            desc: isEn
                ? "Tailored designs that fit your business needs perfectly."
                : "تصاميم مصممة خصيصاً لتناسب احتياجات عملك تماماً."
        },
        {
            id: 3,
            icon: "/icons/why-choose-3.png",
            title: isEn ? "On Time Delivery" : "التسليم في الموعد المحدد",
            desc: isEn
                ? "We deliver projects promptly without compromising quality."
                : "نُنجز المشاريع بسرعة دون المساس بالجودة."
        },
        {
            id: 4,
            icon: "/icons/why-choose-4.png",
            title: isEn ? "Reliable Support" : "دعم موثوق",
            desc: isEn
                ? "Continuous maintenance and assistance after launch."
                : "الصيانة والمساعدة المستمرة بعد الإطلاق."
        }
    ];

    return (
        <section className="why-choose">
            <MarqueeComp />

            <div className="content">
                <div className="container">
                    <HeadSec title={isEn ? "Why Choose Us" : "لماذا تختارنا؟"} />

                    <p className="main-desc">
                        {isEn ?
                            "We offer commercial software services. We work with you, not for you." :
                            "نحن نقدم خدمات برمجية والتسويقة . نحن نعمل معك وليس من أجلك"}
                    </p>

                    <div className="info">
                        <div className="image">
                            <Image
                                src="/images/team.png"
                                alt="active4web team"
                                width={600}
                                height={450}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                        <div className="why-choose-items">
                            {features.map((item) => (
                                <div className="box" key={item.id}>
                                    <div className="icon-wrapper">
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <MarqueeComp />
        </section>
    );
}

export default WhyChoose;