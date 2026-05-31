import { MetadataRoute } from 'next'

export const revalidate = 86400 // التحديث تلقائياً كل يوم

interface BaseItem {
    id: number | string
    created_date?: string
    updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://go.active4web.com'
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

    // دالة مساعدة مرنة للخدمات والمشاريع (تتعامل مع المصفوفة المباشرة أو كائن data)
    async function fetchAndAddDynamicRoutes(
        fullApiUrl: string,
        routePath: string,
        priority: number
    ) {
        try {
            const response = await fetch(fullApiUrl, {
                next: { revalidate: 86400 }
            })

            if (response.ok) {
                const resData = await response.json()

                // فحص هل البيانات مصفوفة مباشرة أم بداخل كائن مثل resData.data
                const items: BaseItem[] = Array.isArray(resData)
                    ? resData
                    : (resData && Array.isArray(resData.data) ? resData.data : [])

                items.forEach((item) => {
                    if (item && item.id) {
                        locales.forEach((locale) => {
                            sitemapEntries.push({
                                url: `${baseUrl}/${locale}/${routePath}/${item.id}`,
                                lastModified: new Date(item.created_date || item.updatedAt || new Date()),
                                changeFrequency: 'weekly',
                                priority: priority,
                            })
                        })
                    }
                })
            }
        } catch (error) {
            console.error(`Error fetching dynamic routes for ${routePath}:`, error)
        }
    }

    // 2. جلب وتوليد الروابط الديناميكية بالتوازي (مع تخصيص رابط المقالات بالكامل)
    await Promise.all([
        // الخدمات
        fetchAndAddDynamicRoutes('https://api.active4web.com/api/services', 'services/services-details', 0.7),

        // الأعمال / المشاريع
        fetchAndAddDynamicRoutes('https://api.active4web.com/api/projects', 'projects/project-details', 0.7),

        // المقالات (رابط منفصل تماماً عن الـ api الأساسي)
        fetchAndAddDynamicRoutes('https://api.active4web.com/dashboard/section/blogs', 'blogs/blog-details', 0.7)
    ])

    return sitemapEntries
}