"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";

// استيراد الستايلات الخاصة بـ Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Review {
    id: number | string;
    image: string | null;
    name_ar: string;
    name_en: string;
    comment_ar: string;
    comment_en: string;
}

interface Props {
    reviews: Review[];
    locale: string;
}

const TestimonialsSlider = ({ reviews, locale }: Props) => {
    const isEn = locale === "en";

    return (
        <Swiper
            dir={isEn ? "ltr" : "rtl"} // ضبط اتجاه السحب حسب اللغة
            key={locale} // لإعادة بناء السلايدر عند تغيير اللغة
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            speed={1000}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
        >
            {reviews.map((el) => (
                <SwiperSlide key={el.id}>
                    <div className="comment">
                        <div className="box">
                            <div className="head">
                                <div className="image">
                                    <Image
                                        src={el.image || "/images/image-user.png"}
                                        alt={isEn ? el.name_en : el.name_ar}
                                        width={60}
                                        height={60}
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <div className="info">
                                    <h4>{isEn ? el.name_en : el.name_ar}</h4>
                                </div>
                            </div>
                            <div className="content">
                                <p>{isEn ? el.comment_en : el.comment_ar}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TestimonialsSlider;