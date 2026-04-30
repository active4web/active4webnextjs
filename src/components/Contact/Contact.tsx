"use client";

import "./Contact.scss";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import HeadSec from "../HeadSec/HeadSec";

interface SettingsData {
    phone?: { value: string };
    email?: { value: string };
    map?: { value: string };
    address?: {
        address_ar: string;
        address_en: string;
    };
}

const Contact = () => {
    const locale = useLocale();
    const isEn = locale === "en";

    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<SettingsData | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("https://api.active4web.com/dashboard/settings");
                const result = await res.json();
                setSettings(result?.data || null);
            } catch {
                console.error("");
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://api.active4web.com/api/contact", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                form.reset();
                alert(isEn ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!");
            }
        } catch {
            console.error("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="contact">
            <div className="container">
                <div className="form">
                    <HeadSec title={isEn ? "Contact Us" : "تواصل معنا"} />

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder={isEn ? "Full Name" : "الاسم الكامل"}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder={isEn ? "Phone Number" : "رقم الهاتف"}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder={isEn ? "Email" : "البريد الإلكتروني"}
                            required
                        />

                        <textarea
                            name="message"
                            placeholder={isEn ? "Your Message" : "رسالتك"}
                            required
                        />

                        <button type="submit" disabled={isLoading}>
                            {isLoading
                                ? (isEn ? "Sending..." : "جاري الإرسال...")
                                : (isEn ? "Send" : "إرسال")}
                        </button>
                    </form>
                </div>

                <div className="map">
                    {settings?.map?.value && (
                        <iframe
                            src={settings.map.value}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Active4Web Location"
                        />
                    )}
                </div>
            </div>

            <div className="contact-text">
                <div className="container">
                    <div className="group">
                        <div className="box">
                            <div className="image">
                                <Image src="/icons/phone.png" alt="phone" width={30} height={30} />
                            </div>
                            <div className="info">
                                <h4>{isEn ? "Phone" : "الهاتف"}</h4>
                                <p dir="ltr">{settings?.phone?.value || "..."}</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="image">
                                <Image src="/icons/location.png" alt="location" width={30} height={30} />
                            </div>
                            <div className="info">
                                <h4>{isEn ? "Location" : "العنوان"}</h4>
                                <p>
                                    {isEn
                                        ? settings?.address?.address_en
                                        : settings?.address?.address_ar || "..."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <div className="box">
                            <div className="image">
                                <Image src="/icons/email.png" alt="email" width={30} height={30} />
                            </div>
                            <div className="info">
                                <h4>{isEn ? "Email" : "البريد الإلكتروني"}</h4>
                                <p>{settings?.email?.value || "..."}</p>
                            </div>
                        </div>

                        <div className="box note">
                            <p>
                                {isEn
                                    ? "An appointment must be booked at least one day in advance of the interview at the administration branch."
                                    : "لابد من حجز ميعاد مسبق على الأقل بيوم من موعد المقابلة بفرع الإدارة"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;