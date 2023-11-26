"use client";
import _ from "lodash";
import useSWR from "swr";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetcher } from "~/utils";
import { CardProduct, Hero } from "~/components";
import { routes } from "~/api/routes";

export default function Home() {
    const { data, error, isLoading } = useSWR(routes.products, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const [featured, setFeatured] = useState<IProduct[]>([]);
    useEffect(() => {
        if (data) {
            const newArr = _.sampleSize(data, 4);
            setFeatured(newArr as IProduct[]);
        }
    }, [data]);
    return (
        <Stack spacing={3}>
            <Hero />
            <Stack spacing={1}>
                <Typography variant="h1" fontSize={26}>
                    Featured products
                </Typography>
                {isLoading ? (
                    <CircularProgress size={30} />
                ) : (
                    <Grid
                        container
                        spacing={2}
                        style={{
                            marginLeft: -16,
                        }}
                    >
                        {featured?.map((item: IProduct) => (
                            <CardProduct
                                key={item.id}
                                product={item}
                                label="HOT"
                            />
                        ))}
                    </Grid>
                )}
            </Stack>
        </Stack>
    );
}
