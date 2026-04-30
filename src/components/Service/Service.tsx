import "./Service.scss";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// تعريف الواجهة للبيانات القادمة من الـ API
interface ServiceProps {
    el: {
        id: number | string;
        image: string;
        name_ar: string;
        name_en: string;
    };
}

const Service = async ({ el }: ServiceProps) => {
    const locale = await getLocale();
    const isAr = locale === "ar";

    return (
        <div className="service">
            <div className="image">
                <Image
                    src={el.image}
                    alt={`image-service-${el.id}`}
                    width={400}
                    height={300}
                    style={{ objectFit: 'cover' }}
                    className="service-img"
                />
            </div>
            <div className="info">
                <h3>{isAr ? el.name_ar : el.name_en}</h3>

                <Link href={`/services/services-details/${el.id}`}>
                    {isAr ? "شاهد المزيد" : "Show More"}
                </Link>
            </div>
        </div>
    );
};

export default Service;