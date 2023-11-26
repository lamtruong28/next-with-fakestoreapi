/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.NEXT_PUBLIC_BASE_URL,
                port: "",
                pathname: "/img/**",
            },
        ],
    },
};

module.exports = nextConfig;
