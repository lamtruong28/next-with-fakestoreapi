"use client";
import { CircularProgress, Grid, Typography } from "@mui/material";
import useSWR from "swr";
import Box from "@mui/material/Box";
import { fetcher } from "~/utils";
import { CardProduct } from "~/components";

function Products() {
    const { data, error, isLoading } = useSWR("/products", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <>
            {isLoading ? <CircularProgress /> : null}
            <Typography variant="h1" marginBottom={2} fontSize={26}>
                Products page
            </Typography>

            <Box>
                <Grid container spacing={2}>
                    {data?.map((prod: IProduct) => (
                        <CardProduct key={prod.id} product={prod} />
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default Products;
