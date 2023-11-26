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
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import useSWR from "swr";
import { routes } from "~/api/routes";
import { fetcher } from "~/utils";
import "~/app/globals.scss";

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data, error, isLoading } = useSWR(routes.categories, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const [categories, setCategories] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const handleSelectCategory = (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
        setFilter(value);
    };
    return (
        <Grid container spacing={2} className="py-3">
            <Grid item xs={3}>
                <Paper
                    sx={{
                        px: 1,
                        py: 2,
                    }}
                    className="min-vh-100 h-100"
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
                                    data?.map((category: string) => (
                                        <FormControlLabel
                                            value={category}
                                            control={<Radio />}
                                            label={
                                                category[0].toUpperCase() +
                                                category.slice(1)
                                            }
                                        />
                                    ))
                                )}
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                {children}
            </Grid>
        </Grid>
    );
}
