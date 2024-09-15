/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
    images: {
        domains: ['cryptologos.cc'], 
        dangerouslyAllowSVG: true,   
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", 
    },
}

export default nextConfig;
