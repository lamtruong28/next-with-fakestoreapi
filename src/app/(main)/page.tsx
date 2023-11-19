"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetcher, localStore } from "~/utils";
import { env } from "~/configs";
import useSWR from "swr";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { CardProduct } from "~/components";

export default function Home() {
    const { data, error, isLoading } = useSWR("/products", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const [featured, setFeatured] = useState<IProduct[]>([]);
    useEffect(() => {
        if (data) {
            const uniqueNumbers = new Set(data);

            const newArr = Array.from(uniqueNumbers, (number) => number);
            setFeatured(newArr as IProduct[]);
        }
    }, [data]);
    return (
        <main>
            <Box>Hero</Box>
            <Stack spacing={2}>
                <Typography variant="h1" fontSize={26}>
                    Featured products
                </Typography>
                <Grid container spacing={2}>
                    {featured?.map((item: IProduct) => (
                        <CardProduct key={item.id} product={item} />
                    ))}
                </Grid>
            </Stack>
        </main>
    );
}
