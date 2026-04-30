import "./ServicesComp.scss";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeadSec from "@/components/HeadSec/HeadSec";
import Service from "@/components/Service/Service";

async function getServices() {
    try {
        const res = await fetch("https://api.active4web.com/api/services", {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
    } catch {
        return null;
    }
}

const ServicesComp = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    const servicesData = await getServices();
    const services = servicesData?.data?.slice(0, 4) || [];

    return (
        <section className="services-comp">
            <div className="container">
                <HeadSec title={isEn ? "Our Services" : "خدماتنا"} />

                <p className="sub-header">
                    {isEn ?
                        "Services We Provide to Elevate Your Business" :
                        "الخدمات التي نقدمها للارتقاء بأعمالك"}
                </p>

                <div className="all-services">
                    {services.map((el) => (
                        <Service el={el} key={el.id} />
                    ))}
                </div>

                <div className="center-link">
                    <Link href="/services" className="show-more">
                        {isEn ? "View All Services" : "عرض جميع الخدمات"}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ServicesComp;