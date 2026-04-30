"use client";

import Marquee from "react-fast-marquee";
import Project from "../Project/Project";

export interface ProjectType {
    id: number | string;
    image: string;
    name_en: string;
    name_ar: string;
}

interface ProjectsSliderProps {
    projects: ProjectType[];
    locale: string;
}

const ProjectsSlider = ({ projects, locale }: ProjectsSliderProps) => {
    return (
        <Marquee
            pauseOnHover={true}
            speed={80}
            direction={locale === "en" ? "left" : "right"}
            gradient={false}
            autoFill={true}
            style={{
                direction: "ltr"
            }}
        >
            {projects.map((el) => (
                <Project data={el} key={el.id} />
            ))}
        </Marquee>
    );
}

export default ProjectsSlider;