import "./WorkProcess.scss";
// import Image from "next/image";
import { getLocale } from "next-intl/server";
import HeadSec from "@/components/HeadSec/HeadSec";

const WorkProcess = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    const steps = [
        {
            title: isEn ? "Listening & Analysis" : "الاستماع والتحليل",
            desc: isEn
                ? "We start with a brainstorming session to understand your project requirements, define your goals, and study the target audience to map out a precise and customized action plan."
                : "نبدأ بجلسة عصف ذهني لفهم متطلبات مشروعك، تحديد أهدافك، ودراسة الجمهور المستهدف لرسم خطة عمل دقيقة ومخصصة.",
        },
        {
            title: isEn ? "UI/UX Design" : "التصميم وواجهة المستخدم (UI/UX Design)",
            desc: isEn
                ? "We translate ideas into modern and attractive user interfaces (UI/UX), focusing on delivering a smooth and comfortable browsing experience for your clients."
                : "نترجم الأفكار إلى واجهات مستخدم (UI/UX) عصرية وجذابة، مع التركيز على تقديم تجربة تصفح سلسة ومريحة لعملائك",
        },
        {
            title: isEn ? "Development & Coding" : "البرمجة واالتنفيذ  (Development & Coding)",
            desc: isEn
                ? "Our team turns designs into clean and fast code, building robust management systems that guarantee exceptional performance and full SEO compatibility."
                : "يحول فريقنا التصاميم إلى أكواد برمجية نظيفة وسريعة، مع بناء أنظمة إدارة قوية تضمن أداءً استثنائياً وتوافقاً كاملاً مع محركات البحث (SEO).",
        },
        {
            title: isEn ? "Testing & Launch" : "الاختبار والإطلاق (Testing & Launch)",
            desc: isEn
                ? "We thoroughly test the project to ensure it is completely bug-free, then officially launch your website or application into the market while providing the necessary technical support."
                : "نقوم باختبار المشروع بدقة للتأكد من خلوه من أي أخطاء، ثم نطلق موقعك أو تطبيقك رسمياً في السوق مع تقديم الدعم الفني اللازم",
        },
    ];

    return (
        <section className="work-process">
            <div className="container">
                <HeadSec title={isEn ? "Our Work Process" : "تفاصيل مراحل العمل"} />

                <p className="sub-title">
                    {isEn ? "Our Journey Together: How We Turn Your Vision Into Reality"
                        : "رحلتنا معاً: كيف نحول فكرتك إلى واقع"}
                </p>

                {/* <div className="image-process">
                    <Image
                        src={isEn ? "/images/steps-process.png" : "/images/steps-process-ar.png"}
                        alt="active4web work process steps"
                        width={1000} 
                        height={500}
                        priority
                        style={{ width: "100%", height: "auto" }}
                    />
                </div> */}

                <div className="steps">
                    {steps.map((step, index) => (
                        <div className="box" key={index}>
                            <h4>{step.title}</h4>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkProcess;