"use client";

import "./Hero.scss";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

const STATIC_SLIDES = [
    { id: 1, image: "/images/image-welcome.jpg" },
    { id: 2, image: "/images/image-welcome.jpg" },
    { id: 3, image: "/images/image-welcome.jpg" },
];

const Hero = () => {
    const t = useTranslations("welcome");

    return (
        <div className="hero">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect={"fade"}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="hero-swiper"
            >
                {STATIC_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id} className="hero-slide">
                        <div className="image-wrapper">
                            <Image
                                src={slide.image}
                                alt="welcome-active4web"
                                fill
                                priority
                                style={{ objectFit: 'cover' }}
                            />
                        </div>


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
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Hero;