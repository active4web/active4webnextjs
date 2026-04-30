import "./WorkProcess.scss";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import HeadSec from "@/components/HeadSec/HeadSec";

const WorkProcess = async () => {
    const locale = await getLocale();
    const isEn = locale === "en";

    const steps = [
        {
            title: isEn ? "Contract" : "التعاقد",
            desc: isEn
                ? "Sign the contract and NDA to protect both parties."
                : "امضاء العقد و اتفاقية السرية لضمان حق الطرفين",
        },
        {
            title: isEn ? "Logo & Design" : "تنفيذ اللوجو و التصميمات",
            desc: isEn
                ? "Start implementing logo and designs based on client preferences."
                : "البدء في تنفيذ اللوجو و التصميمات بناء علي رغبة العميل",
        },
        {
            title: isEn ? "Project Analysis" : "التحليل الشامل",
            desc: isEn
                ? "Conduct a full analysis to ensure project success."
                : "عمل تحليل شامل للمشروع لضمان نجاحه",
        },
        {
            title: isEn ? "Development Phase" : "مرحلة البرمجة",
            desc: isEn
                ? "Develop control panels and upload to a private link for review."
                : "برمجة لوحات التحكم ورفعها على رابط خاص للمتابعة",
        },
        {
            title: isEn ? "Testing Phase" : "مرحلة الاختبار",
            desc: isEn
                ? "Full testing by our team to ensure everything works perfectly."
                : "عمل اختبار كامل للتأكد من صحة سير العمل",
        },
        {
            title: isEn ? "Launch Phase" : "مرحلة الأنطلق",
            desc: isEn
                ? "Launch the project on its official accounts after successful testing."
                : "رفع المشروع على الحسابات الرسمية بعد انتهاء الاختبارات",
        },
    ];

    return (
        <section className="work-process">
            <div className="container">
                <HeadSec title={isEn ? "Our Work Process" : "خطوات العمل لدينا"} />

                <p className="sub-title">
                    {isEn ? "Our Proven Work Process" : "عملية العمل التي أثبتت نجاحها"}
                </p>

                <div className="image-process">
                    {/* بما أن الصور في public/images نكتب المسار مباشرة */}
                    <Image
                        src={isEn ? "/images/steps-process.png" : "/images/steps-process-ar.png"}
                        alt="active4web work process steps"
                        width={1000} // بما أنها صورة من مسار خارجي/String يجب تحديد الأبعاد
                        height={500}
                        priority
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>

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