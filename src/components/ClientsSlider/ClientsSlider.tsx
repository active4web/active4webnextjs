"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

interface Partner {
    id: number | string;
    image: string;
}

interface ClientsSliderProps {
    partners: Partner[];
    locale: string;
}

const ClientsSlider = ({ partners, locale }: ClientsSliderProps) => {
    return (
        <Marquee
            pauseOnHover={true}
            speed={100}
            direction={locale === "en" ? "right" : "left"}
            gradient={false}
            autoFill={true}
            style={{ direction: "ltr" }}
        >
            {partners.map((el, idx) => (
                <div className="client" key={el.id || idx}>
                    <Image
                        src={el.image}
                        alt={`Client-Logo-${idx + 1}`}
                        width={150}
                        height={80}
                        style={{ objectFit: 'contain' }}
                        // معالجة صور الـ SVG لضمان أفضل جودة
                        unoptimized={el.image.endsWith('.svg')}
                    />
                </div>
            ))}
        </Marquee>
    );
};

export default ClientsSlider;