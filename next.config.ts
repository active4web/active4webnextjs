import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'standalone',

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.active4web.com',
                pathname: '**',
            },
        ],
    },

    async redirects() {
        return [
            {
                source: '/webmail',
                destination: 'https://webmail.active4web.com',
                permanent: true,
            },
            {
                source: '/mail',
                destination: 'https://webmail.active4web.com',
                permanent: true,
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);