import { MetadataRoute } from 'next'

export const revalidate = 86400 // إعادة التحقق والتحديث تلقائياً كل يوم

// تعريف الـ Interfaces للبيانات القادمة من الـ API لمنع خطأ any
interface BaseItem {
    id: number | string
    created_date?: string
    updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://go.active4web.com'
    const apiBaseUrl = 'https://api.active4web.com/api'
    const locales = ['en', 'ar']

    // الصفحات الثابتة الأساسية
    const staticPages = ['', '/about', '/services', '/projects', '/blogs', '/contact']
    const sitemapEntries: MetadataRoute.Sitemap = []

    // 1. إضافة الصفحات الثابتة لجميع اللغات
    locales.forEach((locale) => {
        staticPages.forEach((page) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'daily' : 'monthly',
                priority: page === '' ? 1.0 : 0.8,
            })
        })
    })

    // دالة مساعدة لجلب البيانات وإضافتها للـ Sitemap لتجنب تكرار الكود
    async function fetchAndAddDynamicRoutes(
        apiUrlPath: string,
        routePath: string,
        priority: number
    ) {
        try {
            const response = await fetch(`${apiBaseUrl}/${apiUrlPath}`, {
                next: { revalidate: 86400 }
            })

            if (response.ok) {
                const items: BaseItem[] = await response.json()

                if (Array.isArray(items)) {
                    items.forEach((item) => {
                        locales.forEach((locale) => {
                            sitemapEntries.push({
                                url: `${baseUrl}/${locale}/${routePath}/${item.id}`,
                                lastModified: new Date(item.created_date || item.updatedAt || new Date()),
                                changeFrequency: 'weekly',
                                priority: priority,
                            })
                        })
                    })
                }
            }
        } catch (error) {
            console.error(`Error fetching dynamic routes for ${routePath}:`, error)
        }
    }

    // 2. جلب وتوليد الروابط الديناميكية بالتوازي لسرعة الـ Build
    await Promise.all([
        fetchAndAddDynamicRoutes('services', 'services/services-details', 0.7),
        fetchAndAddDynamicRoutes('projects', 'projects/project-details', 0.7),
        fetchAndAddDynamicRoutes('articles', 'blogs/blog-details', 0.7)
    ])

    return sitemapEntries
}