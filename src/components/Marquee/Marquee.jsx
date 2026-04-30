import "./Marquee.scss";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

async function getServices() {
    const res = await fetch("https://api.active4web.com/api/services", {
        cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
}

const MarqueeComp = async () => {
    const locale = await getLocale();
    const servicesData = await getServices();
    const services = servicesData?.data || [];

    return (
        <div className="marquee">
            <Marquee
                pauseOnHover={true}
                speed={100}
                direction={locale === "en" ? "left" : "right"}
                gradient={false}
                autoFill={true}
                style={{
                    direction: locale === "en" ? "ltr" : "ltr"
                }}
            >
                {services.map((el) => (
                    <Link
                        href={`/services/services-details/${el.id}`}
                        className="box-group"
                        key={el.id}
                    >
                        <div className="box">
                            <p>{locale === "en" ? el.name_en : el.name_ar}</p>
                        </div>

                        <div className="box star">
                            <Image
                                src="/icons/star.svg"
                                alt="star-icon"
                                width={20}
                                height={20}
                            />
                        </div>
                    </Link>
                ))}
            </Marquee>
        </div>
    );
}

export default MarqueeComp;