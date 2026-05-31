import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/dashboard/',
                '/login',
                '/register',
                '/password/reset',
                '/api/',
                '/storage/',
                '/vendor/',
                '/.env',
            ],
        },
        sitemap: 'https://go.active4web.com/sitemap.xml',
    }
}