"use client";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const banners: { index: number; src: string; alt: string }[] = [
    {
        index: 1,
        src: "/Navy_Blue_Futuristic_Virtual_Technology_Banner.png",
        alt: "Navy Blue Futuristic Virtual Technology Banner",
    },
    {
        index: 2,
        src: "/Orange_Red_Flash_Sale_9.9_Promotion_Banner.png",
        alt: "Orange Red Flash Sale 9.9 Promotion Banner",
    },
    {
        index: 3,
        src: "/Brown_Minimalist_Fashion_Sale_Banner.png",
        alt: "Brown Minimalist Fashion Sale Banner",
    },
];

function Hero() {
    return (
        <Box className="pt-3">
            <Swiper
                navigation={true}
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.index} className="rounded">
                        <Image
                            src={banner.src}
                            alt={banner.alt}
                            width={1300}
                            height={400}
                            className="rounded"
                            sizes="100vw"
                            style={{
                                width: "100%",
                                height: "600px",
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}

export default Hero;
