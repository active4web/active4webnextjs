import "./OurProjects.scss";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeadSec from "../../HeadSec/HeadSec";
import ProjectsSlider from "@/components/ProjectsSlider/ProjectsSlider";

async function getProjects() {
    try {
        const res = await fetch("https://api.active4web.com/api/projects", {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
    } catch {
        return null;
    }
}

const OurProjects = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";
    const projectsData = await getProjects();
    const projects = projectsData?.data?.slice(0, 10) || [];

    return (
        <section className="our-projects">
            <HeadSec title={isEn ? "Our Projects" : "مشاريعنا"} />

            <p className="sub-title">
                {isEn ?
                    "Explore Our Showcase of featured works" :
                    "استكشف معرضنا للأعمال المميزة"}
            </p>

            <div className="slider-categories">
                <ProjectsSlider projects={projects} locale={locale} />
            </div>

            <div className="center-link">
                <Link href="/projects" className="show-more">
                    {isEn ? "View All Works" : "عرض جميع الأعمال"}
                </Link>
            </div>
        </section>
    );
}

export default OurProjects;