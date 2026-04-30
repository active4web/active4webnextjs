import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./ProjectsPage.scss";

// استيراد المكونات
import HeadPage from "@/components/HeadPage/HeadPage";
import HeadSec from "@/components/HeadSec/HeadSec";
import Project from "@/components/Project/Project";
import Contact from "@/components/Contact/Contact";

// --- 1. تعريف الـ Interface الخاص بالمشروع ---
export interface IProject {
    id: number | string;
    image: string;
    name_ar: string;
    name_en: string;
    category_ar?: string;
    category_en?: string;
    link?: string;
}

// --- 2. SEO Metadata ---
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const isAr = locale === "ar";

    const siteName = isAr ? "أكتيف فور ويب" : "Active4Web";
    const pageTitle = isAr ? "أعمالنا" : "Our Projects";

    return {
        title: pageTitle,
        description: isAr
            ? "اطّلع على أعمال أكتيف فور ويب واستكشف مشاريعنا في تصميم وتطوير المواقع والتطبيقات، مع تصاميم حديثة وحلول رقمية عالية الأداء."
            : "Explore Active4Web portfolio and discover our latest web and mobile app development projects with modern designs.",
        keywords: isAr
            ? ["مشاريعنا", "معرض الأعمال", "تطوير مواقع", "تطبيقات موبايل", "أكتيف فور ويب"]
            : ["projects", "portfolio", "web projects", "app development", "Active4Web"],
        alternates: {
            languages: {
                'ar-EG': '/ar/projects',
                'en-US': '/en/projects',
            },
        },
        openGraph: {
            title: `${pageTitle} | ${siteName}`,
            locale: isAr ? 'ar_EG' : 'en_US',
            type: 'website',
            url: `https://active4web.com/${locale}/projects`,
        }
    };
}

// --- 3. جلب البيانات من الـ API ---
async function getProjects(): Promise<IProject[]> {
    try {
        const res = await fetch("https://api.active4web.com/api/projects", {
            next: { revalidate: 3600 } // تحديث كل ساعة
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const result = await res.json();
        return result?.data || [];
    } catch {
        return [];
    }
}

// --- 4. المكون الرئيسي ---
const ProjectsPage = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";
    const projects = await getProjects();

    return (
        <main className="projects-page">
            <HeadPage title={isEn ? "Projects" : "مشاريعنا"} />

            <div className="page-content">
                <div className="container">
                    <HeadSec title={isEn ? "Latest Projects" : "أحدث المشاريع"} />

                    <p className="sub-title">
                        {isEn
                            ? "Explore Our Showcase Of Featured Works"
                            : "استكشف معرضنا للأعمال المميزة"}
                    </p>
                </div>

                <div className="all-projects">
                    <div className="container">
                        {projects.length > 0 ? (
                            projects.map((el: IProject) => (
                                <Project data={el} key={el.id} />
                            ))
                        ) : (
                            <p className="no-data">
                                {isEn ? "No projects found" : "لا توجد مشاريع حالياً"}
                            </p>
                        )}
                    </div>
                </div>

                <Contact />
            </div>
        </main>
    );
};

export default ProjectsPage;