import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import "./ProjectDetails.scss";

import HeadPage from "@/components/HeadPage/HeadPage";
import OurClient from "@/components/OurClient/OurClient";
import Contact from "@/components/Contact/Contact";
import ProjectSwiper from "@/components/ProjectSwiper/ProjectSwiper";

// --- 1. الـ Metadata مع فك الـ Promise ---
export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string, locale: string }> // تعريف الـ params كـ Promise
}): Promise<Metadata> {
    // السطر السحري لحل المشكلة:
    const { id, locale } = await params;

    const isAr = locale === "ar";

    try {
        const res = await fetch(`https://api.active4web.com/api/projects/show/${id}`);
        const result = await res.json();
        const project = result?.data;

        const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";
        const title = isAr ? project?.name_ar : project?.name_en;

        return {
            title: `${title} | ${siteName}`,
            description: isAr
                ? `تعرف على تفاصيل مشروع ${project?.name_ar}`
                : `Explore details of ${project?.name_en}`,
            openGraph: {
                images: [project?.image],
            },
        };
    } catch {
        return { title: isAr ? "تفاصيل المشروع" : "Project Details" };
    }
}

// --- 2. المكون الرئيسي مع فك الـ Promise ---
const ProjectDetailsPage = async ({
    params
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;

    const locale = await getLocale();
    const isEn = locale === "en";

    // جلب البيانات
    const res = await fetch(`https://api.active4web.com/api/projects/show/${id}`, {
        next: { revalidate: 3600 }
    });
    const result = await res.json();
    const project = result?.data;

    if (!project) return <div>Not Found</div>;

    return (
        <main className="project-details">
            <HeadPage title={isEn ? "Project Details" : "تفاصيل المشروع"} />

            <section className="details">
                <div className="container">
                    <div className="info">
                        <div className="image">
                            <Image
                                src={project.image}
                                alt={isEn ? project.name_en : project.name_ar}
                                width={600}
                                height={450}
                                priority
                            />
                        </div>

                        <div className="info-data">
                            <h3>{isEn ? project.name_en : project.name_ar}</h3>
                            <div className="links">
                                {project.google_link && (
                                    <a href={project.google_link} target="_blank">
                                        <Image src="/icons/Google-Play.png" alt="Google Play" width={160} height={48} />
                                    </a>
                                )}
                                {project.store_link && (
                                    <a href={project.store_link} target="_blank">
                                        <Image src="/icons/App-Store.png" alt="App Store" width={160} height={48} />
                                    </a>
                                )}
                                {project.website && (
                                    <a href={project.website} target="_blank">
                                        <Image src="/icons/Website.png" alt="Website" width={160} height={48} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="comments">
                        {project.infos?.length > 0 && (
                            <ProjectSwiper infos={project.infos} locale={locale} />
                        )}
                    </div>
                </div>
            </section>

            <Contact />
            <OurClient />
        </main>
    );
};

export default ProjectDetailsPage;