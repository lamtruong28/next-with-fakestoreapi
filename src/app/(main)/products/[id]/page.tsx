"use client";
import {
    AddOutlined,
    AddShoppingCart,
    MonetizationOnOutlined,
    RemoveOutlined,
    SellOutlined,
    ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import {
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Rating,
    Skeleton,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { routes } from "~/api/routes";
import { useAppDispatch } from "~/hooks/reduxHooks";
import { addCart } from "~/store/slices/cart";
import { fetcher, showToast } from "~/utils";
import regexInput from "~/utils/regexInput";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function Detail(props: any) {
    const { params } = props;
    const dispatch = useAppDispatch();
    const {
        data,
        error,
        isLoading,
    }: { data: IProduct; error: any; isLoading: any } = useSWR(
        `${routes.products}/${params?.id}`,
        fetcher
    );
    const [quantity, setQuantity] = useState<number>(1);

    const increment = () => {
        setQuantity((prev) => prev + 1);
    };
    const decrement = () => {
        quantity > 1 && setQuantity((prev) => prev - 1);
    };

    const handleAddCart = () => {
        dispatch(
            addCart({
                productId: data?.id,
                productName: data?.title,
                image: data?.image,
                price: data?.price,
                quantity: quantity,
            })
        );

        showToast({
            message: "Added to cart",
        });
    };

    const handleBuyNowClick = () => {
        showToast({
            type: "info",
            message: "This feature is under development",
        });
    };

    return (
        <>
            <Grid container spacing={3} sx={{ my: 0 }}>
                <Grid item lg={6}>
                    <Item>
                        {data ? (
                            <Image
                                src={data?.image}
                                alt={data?.title}
                                width={1300}
                                height={500}
                                className="rounded"
                                sizes="100vw"
                                style={{
                                    maxHeight: 500,
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        ) : (
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                height={500}
                            />
                        )}
                    </Item>
                </Grid>
                <Grid item lg={6}>
                    <Stack spacing={2}>
                        <Typography variant={"h1"} fontSize={30}>
                            {data ? (
                                data?.title
                            ) : (
                                <Skeleton variant="text" animation="wave" />
                            )}
                        </Typography>

                        {data ? (
                            <Typography className="text-muted">
                                <SellOutlined />{" "}
                                {data?.category?.[0].toUpperCase() +
                                    data?.category?.slice(1)}
                            </Typography>
                        ) : (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={"40%"}
                            />
                        )}

                        {data ? (
                            <Stack
                                direction={"row"}
                                spacing={2}
                                divider={
                                    <Divider
                                        orientation="vertical"
                                        sx={{
                                            bgcolor: "red",
                                        }}
                                        flexItem
                                    />
                                }
                            >
                                <Typography>
                                    Sold: {data?.rating?.count}
                                </Typography>
                                <Rating
                                    precision={0.1}
                                    readOnly={true}
                                    value={data?.rating?.rate}
                                />
                            </Stack>
                        ) : (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={"30%"}
                            />
                        )}

                        {data ? (
                            <Typography fontSize={20}>
                                <MonetizationOnOutlined />{" "}
                                <span className="fw-bold text-danger">
                                    {data.price}$
                                </span>
                            </Typography>
                        ) : (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={"30%"}
                            />
                        )}
                        {data ? (
                            <Typography fontSize={16}>
                                {data.description}
                            </Typography>
                        ) : (
                            <Skeleton
                                variant="rounded"
                                height={100}
                                animation="wave"
                            />
                        )}

                        <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            spacing={0.5}
                        >
                            {data ? (
                                <>
                                    <IconButton
                                        onClick={decrement}
                                        disabled={quantity === 1}
                                    >
                                        <RemoveOutlined />
                                    </IconButton>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        value={quantity}
                                        sx={{
                                            width: 100,
                                        }}
                                        inputProps={{
                                            style: { textAlign: "center" },
                                        }}
                                        onChange={(event) =>
                                            setQuantity(
                                                +regexInput(
                                                    event.target.value,
                                                    "^[0-9]*$"
                                                )
                                            )
                                        }
                                    />
                                    <IconButton onClick={increment}>
                                        <AddOutlined />
                                    </IconButton>
                                </>
                            ) : (
                                <Skeleton
                                    variant="rounded"
                                    height={40}
                                    width={200}
                                    animation="wave"
                                />
                            )}
                        </Stack>

                        <Stack
                            direction={"row"}
                            spacing={2}
                            justifyContent={"center"}
                        >
                            {data ? (
                                <>
                                    <Button
                                        startIcon={<AddShoppingCart />}
                                        sx={{ width: 200 }}
                                        variant="contained"
                                        size="large"
                                        onClick={handleAddCart}
                                    >
                                        Add to cart
                                    </Button>
                                    <Button
                                        startIcon={
                                            <ShoppingCartCheckoutOutlined />
                                        }
                                        sx={{ width: 200 }}
                                        variant="contained"
                                        size={"large"}
                                        className="bg-dark"
                                        onClick={handleBuyNowClick}
                                    >
                                        Buy now
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Skeleton
                                        variant="rounded"
                                        height={40}
                                        width={200}
                                        animation="wave"
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        height={40}
                                        width={200}
                                        animation="wave"
                                    />
                                </>
                            )}
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default Detail;
