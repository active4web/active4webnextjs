import "./OurClient.scss";
import { getLocale } from "next-intl/server";
import HeadSec from "../HeadSec/HeadSec";
import ClientsSlider from "../ClientsSlider/ClientsSlider";

export interface Partner {
    id: number | string;
    image: string;
}

async function getPartners() {
    try {
        const res = await fetch("https://api.active4web.com/dashboard/partners", {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch partners");
        const result = await res.json();
        return result?.data || [];
    } catch {
        return [];
    }
}

const OurClient = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";
    const partners = await getPartners();

    return (
        <section className="our-clients">
            <HeadSec title={isEn ? "Our Clients" : "عملاؤنا"} />

            <div className="container">
                <ClientsSlider partners={partners} locale={locale} />
            </div>
        </section>
    );
};

export default OurClient;