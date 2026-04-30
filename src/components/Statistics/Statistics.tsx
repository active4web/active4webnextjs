import { getLocale } from "next-intl/server";

const Statistics = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    const stats = [
        { id: 1, val: "10+", label: isEn ? "Team Members" : "أعضاء الفريق" },
        { id: 2, val: "2000+", label: isEn ? "Happy Clients" : "عملاء سعداء" },
        { id: 3, val: "99%", label: isEn ? "Client Satisfaction" : "رضا العملاء" },
        { id: 4, val: "15+", label: isEn ? "Years Experience" : "سنوات الخبرة" },
    ];

    return (
        <div className="statistics">
            <div className="container">
                {stats.map((stat) => (
                    <div className="box" key={stat.id}>
                        <span>{stat.val}</span>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Statistics;