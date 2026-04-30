import "./Footer.scss";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface FooterProps {
    data: {
        data: {
            facebook?: { value: string };
            instagram?: { value: string };
            tiktok?: { value: string };
            snapchat?: { value: string };
        };
    };
}

interface ServiceSummary {
    id: number | string;
    name_en: string;
    name_ar: string;
}

async function getServices() {
    try {
        const res = await fetch("https://api.active4web.com/api/services", {
            cache: 'no-store'
        });
        const result = await res.json();
        return result?.data?.slice(0, 5) || [];
    } catch {
        return [];
    }
}

const Footer = async ({ data }: FooterProps) => {
    const locale = await getLocale();
    const isEn = locale === "en";
    const services = await getServices();

    const settings = data?.data;

    const social = [
        { icon: "/icons/facebook.svg", url: settings?.facebook?.value },
        { icon: "/icons/instagram.svg", url: settings?.instagram?.value },
        { icon: "/icons/linkedin.svg", url: settings?.tiktok?.value },
        { icon: "/icons/x.svg", url: settings?.snapchat?.value },
    ].filter(item => item.url);

    return (
        <footer className="footer">
            <div className="container">
                <div className="top">
                    {/* عمود من نحن */}
                    <div className="row">
                        <h4>{isEn ? "About" : "عننا"}</h4>
                        <p>
                            {isEn ?
                                "Active4Web is a specialized company in designing and developing mobile applications with extensive experience. It is a technology company established in 2010, specializing in website design and development, mobile application development, e-commerce platforms, digital marketing campaigns, and Snapchat advertisements." :
                                "شركة Active4Web متخصصة في تصميم وتطوير تطبيقات الجوال، وتتمتع بخبرة واسعة في هذا المجال. وهي شركة تقنية تأسست عام 2010، وتتخصص في تصميم وتطوير مواقع الويب، وتطوير تطبيقات الجوال، ومنصات التجارة الإلكترونية، وحملات التسويق الرقمي، وإعلانات سناب شات."}
                        </p>
                    </div>

                    {/* عمود الخدمات */}
                    <div className="row">
                        <h4>{isEn ? "Services" : "الخدمات"}</h4>
                        <ul>
                            {services.map((el: ServiceSummary) => (
                                <li key={el.id}>
                                    <Link href={`/services/services-details/${el.id}`}>
                                        {isEn ? el.name_en : el.name_ar}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* عمود الروابط السريعة */}
                    <div className="row">
                        <h4>{isEn ? "Quick Link" : "روابط سريعة"}</h4>
                        <ul>
                            <li><Link href="/">{isEn ? "Home" : "الرئيسية"}</Link></li>
                            <li><Link href="/about">{isEn ? "About" : "من نحن"}</Link></li>
                            <li><Link href="/blogs">{isEn ? "Blog" : "المدونة"}</Link></li>
                            <li><Link href="/projects">{isEn ? "Project" : "المشاريع"}</Link></li>
                            <li><Link href="/contact">{isEn ? "Contact" : "تواصل معنا"}</Link></li>
                        </ul>
                    </div>

                    {/* عمود اللوجو والسوشيال */}
                    <div className="row logo-col">
                        <Image
                            src="/logo.png"
                            alt="Active4Web Logo" width={90}
                            height={90}
                            style={{ objectFit: 'contain' }}
                        />

                        <div className="social">
                            {social.map((el, idx) => (
                                el.url && (
                                    <a href={el.url} key={idx} target="_blank" rel="noopener noreferrer">
                                        <Image src={el.icon} alt="social icon" width={24} height={24} />
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <p className="rights">
                        {isEn
                            ? "2026 © All rights reserved by Active4Web"
                            : "2026 © جميع الحقوق محفوظة لشركة Active4Web"}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;