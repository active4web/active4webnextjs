"use client";

import "./Hero.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

interface ISliderItem {
    id: number;
    alt_txt: string | null;
    image: string;
    badge: string | null;
    title: string | null;
    description: string | null;
}

const Hero: React.FC = () => {
    const locale = useLocale();
    const [sliders, setSliders] = useState<ISliderItem[]>([]);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const response = await fetch(`https://api.active4web.com/api/sliders/home?lang=${locale}`);
                const result = await response.json();

                if (result?.data) {
                    setSliders(result.data);
                } else if (Array.isArray(result)) {
                    setSliders(result);
                }
            } catch (error) {
                console.error("Error fetching sliders:", error);
            }
        };

        fetchSliders();
    }, [locale]);

    if (sliders.length === 0) return null;

    return (
        <div className="hero">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect={"fade"}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={sliders.length > 1}
                className="hero-swiper"
            >
                {sliders.map((slide: ISliderItem) => (
                    <SwiperSlide key={slide.id} className="hero-slide">
                        <div className="image-wrapper">
                            <Image
                                src={slide.image}
                                alt={slide.alt_txt || "welcome-active4web"}
                                fill
                                priority
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        <div className="box-text">
                            {slide.badge && (
                                <p>
                                    <span>{"//"}</span>
                                    <span>{slide.badge}</span>
                                </p>
                            )}

                            {slide.title && <h1> {slide.title}</h1>}

                            {slide.description && <p>{slide.description}</p>}

                            <Link href="/services">
                                {locale === "ar" ? "المزيد" : "More"}
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Hero;