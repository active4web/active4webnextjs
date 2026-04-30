"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProjectSwiper = ({ infos, locale }: { infos: any[], locale: string }) => {
    return (
        <Swiper
            dir="ltr"
            slidesPerView={1}
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
        >
            {infos.map((el) => (
                <SwiperSlide key={el.id}>
                    <div className="comment">
                        <div className="box">
                            <div className="head">
                                <h4>{locale === "en" ? el.name_en : el.name_ar}</h4>
                            </div>
                            <div className="content">
                                <p>{locale === "en" ? el.details_en : el.details_ar}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProjectSwiper;