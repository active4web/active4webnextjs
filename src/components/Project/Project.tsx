"use client";

import "./Project.scss";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

interface ProjectProps {
    data: {
        id: number | string;
        image: string;
        name_en: string;
        name_ar: string;
    };
}

const Project = ({ data }: ProjectProps) => {
    const locale = useLocale();
    const isEn = locale === "en";

    return (
        <div className="project">
            <div className="content">
                <div className="image">
                    <Image
                        src={data.image}
                        alt={`project-${data.id}`}
                        width={400}
                        height={300}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div
                    className="info"
                    style={{
                        direction: isEn ? "ltr" : "rtl"
                    }}>
                    <h3>{isEn ? data.name_en : data.name_ar}</h3>

                    {/* رابط التفاصيل الذكي اللي بيضيف اللغة تلقائياً */}
                    <Link href={`/projects/project-details/${data.id}`}>
                        {isEn ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Project;