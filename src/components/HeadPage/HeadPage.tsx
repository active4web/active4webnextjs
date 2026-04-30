import "./HeadPage.scss";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface HeadPageProps {
    title: string;
}

const HeadPage = async ({ title }: HeadPageProps) => {
    const locale = await getLocale();
    const isEn = locale === "en";

    return (
        <section className="head-page">
            <Image
                src="/images/image-welcome2.jpg"
                alt="welcome-active4web"
                fill
                priority
                style={{ objectFit: 'cover' }}
                quality={90}
            />

            <div className="content">
                <h1>{title}</h1>
                <div className="breadcrumb">
                    <Link href="/">
                        {isEn ? "Home" : "الرئيسية"}
                    </Link>
                    <span className="separator">/</span>
                    <span className="current">{title}</span>
                </div>
            </div>
        </section>
    );
}

export default HeadPage;