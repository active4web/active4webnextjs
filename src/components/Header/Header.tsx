"use client";

import "./Header.scss";
import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu } from "lucide-react";
import Image from "next/image";

interface SettingsResponse {
    data: {
        phone?: { value: string };
        whatsapp?: { value: string };
        email?: { value: string };
        facebook?: { value: string };
        instagram?: { value: string };
        tiktok?: { value: string };
        snapchat?: { value: string };
    };
    status?: boolean;
}

interface HeaderProps {
    settings: SettingsResponse | null;
}

const Header = ({ settings }: HeaderProps) => {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState(false);
    const contactInfo = settings?.data || {};

    const links = [
        { title: t("home"), url: "/" },
        { title: t("about"), url: "/about" },
        { title: t("service"), url: "/services" },
        { title: t("project"), url: "/projects" },
        { title: t("blog"), url: "/blogs" },
        { title: t("contact"), url: "/contact" },
    ];

    const changeLang = () => {
        const nextLocale = locale === "en" ? "ar" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <header className="header">
            <div className="bar">
                <div className="container">
                    <div className="contact-bar">
                        <div className="box">
                            <Image src="/icons/phone.svg" width={18} height={18} alt="phone" />
                            <span>{contactInfo?.phone?.value}</span>
                        </div>
                        <div className="box">
                            <Image src="/icons/whatsapp.svg" width={18} height={18} alt="whatsapp" />
                            <span>{contactInfo?.whatsapp?.value}</span>
                        </div>
                        <div className="box">
                            <Image src="/icons/email.svg" width={18} height={18} alt="email" />
                            <span>{contactInfo?.email?.value}</span>
                        </div>
                    </div>

                    <div className="social">
                        {contactInfo?.facebook?.value && (
                            <a href={contactInfo.facebook.value} target="_blank" rel="noreferrer">
                                <Image src="/icons/facebook.svg" width={18} height={18} alt="facebook" />
                            </a>
                        )}
                        {contactInfo?.instagram?.value && (
                            <a href={contactInfo.instagram.value} target="_blank" rel="noreferrer">
                                <Image src="/icons/instagram.svg" width={18} height={18} alt="instagram" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="head">
                <div className="container">
                    <Link href="/" className="logo">
                        <Image
                            src="/logo.png"
                            width={70}
                            height={70}
                            alt="Active4Web Logo"
                            priority
                            style={{
                                objectFit: "contain"
                            }}
                        />
                    </Link>

                    <nav className={`${activeMenu ? "active-menu" : ""}`} onClick={() => setActiveMenu(false)}>
                        <div className="box" onClick={(e) => e.stopPropagation()}>
                            <ul className="links">
                                {links.map((el, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={el.url}
                                            className={pathname === el.url ? "active" : ""}
                                            onClick={() => setActiveMenu(false)}
                                        >
                                            {el.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    <div className="icons">
                        <button onClick={changeLang} className="lang">
                            {locale === "ar" ? "EN" : "AR"}
                        </button>
                        <button className="menu" onClick={() => setActiveMenu(!activeMenu)}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;