import "./AboutSec.scss";
import Image from "next/image";
import HeadSec from "@/components/HeadSec/HeadSec";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

async function getAboutData() {
    const res = await fetch("https://api.active4web.com/api/settings/about", {
        cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
}

async function getFeaturesData() {
    const res = await fetch("https://api.active4web.com/api/settings/features", {
        cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
}

const AboutSec = async ({ isHomePage = false }: { isHomePage?: boolean }) => {
    const locale = await getLocale();

    const [aboutData, featuresData] = await Promise.all([
        getAboutData(),
        getFeaturesData()
    ]);

    const about = aboutData?.data?.about_us;
    const features = featuresData?.data;

    return (
        <section className="about">
            <div className="container">
                <div className="image">
                    {about?.image && (
                        <Image
                            src={about.image}
                            alt="active4web-about"
                            width={500}
                            height={500}
                            style={{ objectFit: "contain" }}
                        />
                    )}
                </div>

                <div className="info">
                    <HeadSec title={locale === "ar" ? "من نحن" : "About Us"} />

                    <p>
                        {locale === "ar" ? about?.value_ar : about?.value_en}
                    </p>

                    <div className="statistics">
                        <div className="box">
                            <span>{features?.feature1?.amount}</span>
                            <p>{locale === "en" ? "Team Members" : "أعضاء الفريق"}</p>
                        </div>
                        <div className="box">
                            <span>{features?.feature2?.amount}</span>
                            <p>{locale === "en" ? "Happy Clients" : "عملاء سعداء"}</p>
                        </div>
                        <div className="box">
                            <span>{features?.feature3?.amount}</span>
                            <p>{locale === "en" ? "Client Satisfaction" : "رضا العملاء"}</p>
                        </div>
                    </div>

                    <div className="ceo">
                        {isHomePage && (
                            <Link href="/about">
                                {locale === "en" ? "Show More" : "شاهد المزيد"}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSec;