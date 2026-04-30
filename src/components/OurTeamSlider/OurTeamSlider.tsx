"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

interface Member {
    name: string;
    job: string;
    image: string;
}

const OurTeamSlider = ({ members }: { members: Member[] }) => {
    return (
        <Swiper
            dir="ltr"
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            initialSlide={1}
            slidesPerView={1}
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
                rotate: 50,
                depth: 120,
                modifier: 1,
                slideShadows: true,
            }}
            loop
            speed={1000}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="mySwiper"
        >
            {members.map((el, idx) => (
                <SwiperSlide key={idx}>
                    <div className="employee">
                        <div className="image">
                            <Image src={el.image} alt={el.name} width={250} height={250} />
                        </div>
                        <div className="info">
                            <h3>{el.name}</h3>
                            <div className="job-social">
                                <p>{el.job}</p>
                                <div className="social">
                                    {/* مسارات الأيقونات من public مباشرة */}
                                    <a href="#"><Image src="/icons/facebook.png" alt="fb" width={20} height={20} /></a>
                                    <a href="#"><Image src="/icons/instagram.png" alt="ig" width={20} height={20} /></a>
                                    <a href="#"><Image src="/icons/x.png" alt="x" width={20} height={20} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default OurTeamSlider;