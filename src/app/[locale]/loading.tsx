"use client";

import { motion } from "framer-motion";

export default function Loading() {
    const mainColor = "#33a1e0";

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000b18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999999,
                overflow: 'hidden',
                backfaceVisibility: 'hidden',
                perspective: 1000
            }}
        >
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <div style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    transform: 'translateZ(0)' // إجبار الجهاز على استخدام كارت الشاشة
                }}>

                    {/* النبض الأساسي - قيم محددة جداً لمنع الاهتزاز */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            width: '80px',
                            height: '80px',
                            border: `2px solid ${mainColor}`,
                            borderRadius: '50%',
                            boxShadow: `0 0 20px ${mainColor}33`,
                            transform: 'translateZ(0)', // تعزيز السلاسة
                            willChange: 'transform, opacity'
                        }}
                    />

                    {/* موجات الوهج - باستخدام عدد أقل وترتيب زمني أدق */}
                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{
                                scale: 2.5,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.7,
                                ease: [0.215, 0.610, 0.355, 1.000], // Cubic Bezier لنعومة قصوى
                            }}
                            style={{
                                position: 'absolute',
                                width: '80px',
                                height: '80px',
                                border: `1px solid ${mainColor}`,
                                borderRadius: '50%',
                                transform: 'translateZ(0)',
                                willChange: 'transform, opacity'
                            }}
                        />
                    ))}
                </div>

                {/* اسم البراند */}
                <div style={{
                    color: 'white',
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    letterSpacing: '8px',
                    marginBottom: '30px',
                    textTransform: 'uppercase',
                    transform: 'translateZ(0)'
                }}>
                    ACTIVE<span style={{ color: mainColor }}>4</span>WEB
                </div>

                <div style={{
                    width: '220px',
                    height: '1px',
                    background: 'rgba(255,255,255,0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '10px'
                }}>
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(90deg, transparent, ${mainColor}, transparent)`,
                            willChange: 'transform'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}