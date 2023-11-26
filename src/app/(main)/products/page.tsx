"use client";
import {
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import useSWR from "swr";
import Box from "@mui/material/Box";
import { fetcher } from "~/utils";
import { CardProduct } from "~/components";
import { routes } from "~/api/routes";
import { CategoryOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import request from "~/api/request";

function Products() {
    const { data, error, isLoading } = useSWR(routes.products, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const [categories, setCategories] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("all");

    useEffect(() => {
        (async () => {
            const res = await request.get(routes.categories);
            setCategories(res.payload as string[]);
        })();
    }, []);

    const handleSelectCategory = (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
        setFilter(value);
    };

    return (
        <>
            <Grid container spacing={2} className="py-3">
                <Grid item xs={3}>
                    <Paper
                        sx={{
                            px: 1,
                            py: 2,
                            minHeight: "50%",
                        }}
                        className="h-100"
                    >
                        <Stack
                            spacing={1}
                            style={{ top: 100 }}
                            className="position-sticky border-bottom pb-2 px-3"
                        >
                            <Stack
                                direction={"row"}
                                spacing={1}
                                className="border-bottom pb-2"
                            >
                                <CategoryOutlined />
                                <Typography
                                    variant="h2"
                                    marginBottom={2}
                                    fontSize={18}
                                    fontWeight={"bold"}
                                >
                                    Categories
                                </Typography>
                            </Stack>

                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="categories"
                                    defaultValue={"all"}
                                    name="categories"
                                    onChange={handleSelectCategory}
                                >
                                    <FormControlLabel
                                        value={"all"}
                                        control={<Radio />}
                                        label={"All"}
                                    />
                                    {categories?.map((category) => (
                                        <FormControlLabel
                                            key={category}
                                            value={category}
                                            control={<Radio />}
                                            label={
                                                category[0].toUpperCase() +
                                                category.slice(1)
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Box>
                        {isLoading ? <CircularProgress /> : null}
                        <Grid container spacing={2} justifyContent={"center"}>
                            {filter === "all"
                                ? data?.map((prod: IProduct) => (
                                      <CardProduct
                                          key={prod.id}
                                          product={prod}
                                      />
                                  ))
                                : data
                                      ?.filter(
                                          (item: IProduct) =>
                                              item.category === filter
                                      )
                                      ?.map((prod: IProduct) => (
                                          <CardProduct
                                              key={prod.id}
                                              product={prod}
                                          />
                                      ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Products;
