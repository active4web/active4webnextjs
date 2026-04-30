import "./Hero.scss";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Hero = () => {
    const t = useTranslations("welcome");

    return (
        <div className="hero">
            <Image
                src="/images/image-welcome.jpg"
                alt="welcome-active4web"
                fill
                priority
                style={{ objectFit: 'cover' }}
            />

            <div className="box-text">
                <p>
                    <span>{"//"}</span>
                    <span>{t("sub")}</span>
                </p>

                <h1>{t("title")}</h1>

                <p>{t("desc")}</p>

                <Link href="/services">
                    {t("more")}
                </Link>
            </div>
        </div>
    );
}

export default Hero;