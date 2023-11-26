"use client";
import { CategoryOutlined } from "@mui/icons-material";
import {
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import request from "~/api/request";
import { routes } from "~/api/routes";
import { CardProduct } from "~/components";
import { fetcher } from "~/utils";

function Search() {
    const searchParam = useSearchParams();
    const { data, error, isLoading } = useSWR(routes.products, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const [result, setResult] = useState<IProduct[]>([]);
    const searchText = searchParam.get("q");

    useEffect(() => {
        (async () => {
            const res = await request.get(routes.categories);
            setCategories(res.payload as string[]);
        })();
    }, []);

    useEffect(() => {
        searchText &&
            setResult(
                (data as IProduct[])?.filter((product) =>
                    product.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            );
    }, [searchText]);

    const [categories, setCategories] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const handleSelectCategory = (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
        setFilter(value);
    };
    return (
        <>
            <Stack spacing={1.5} className="pt-3">
                <Typography variant="h1" fontSize={26}>
                    Search results
                </Typography>
                <Typography>
                    <strong>Keyword:</strong> {searchText}
                </Typography>
                <Typography>
                    <strong className="text-success">{result?.length}</strong>{" "}
                    {result?.length > 1 ? "products" : "product"} found.
                </Typography>
                <Grid
                    container
                    spacing={2}
                    style={{
                        marginLeft: -16,
                    }}
                >
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

                                        {isLoading ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            categories?.map(
                                                (category: string) => (
                                                    <FormControlLabel
                                                        value={category}
                                                        control={<Radio />}
                                                        label={
                                                            category[0].toUpperCase() +
                                                            category.slice(1)
                                                        }
                                                    />
                                                )
                                            )
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        {result?.length ? (
                            <Grid
                                container
                                spacing={2}
                                justifyContent={"center"}
                            >
                                {filter === "all"
                                    ? result?.map((product) => (
                                          <CardProduct
                                              key={product.id}
                                              product={product}
                                          />
                                      ))
                                    : result
                                          ?.filter(
                                              (item) => item.category === filter
                                          )
                                          ?.map((product) => (
                                              <CardProduct
                                                  key={product.id}
                                                  product={product}
                                              />
                                          ))}
                            </Grid>
                        ) : (
                            <Typography textAlign={"center"}>
                                No results.
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
}

export default Search;
