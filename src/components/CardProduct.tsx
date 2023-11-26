"use client";
import classNames from "classnames/bind";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Typography,
} from "@mui/material";

import {
    AddShoppingCart,
    MonetizationOnOutlined,
    SellOutlined,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { paths } from "~/configs";
import styles from "~/app/(main)/products/product.module.scss";
import { addCart } from "~/store/slices/cart";
import { useAppDispatch } from "~/hooks/reduxHooks";
import { showToast } from "~/utils";

const cx = classNames.bind(styles);
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    cursor: "pointer",
}));

function CardProduct({
    product,
    label = "",
}: {
    product: IProduct;
    label?: string;
}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleAddCart = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        dispatch(
            addCart({
                productId: product?.id,
                productName: product?.title,
                image: product?.image,
                price: product?.price,
                quantity: 1,
            })
        );
        showToast({
            message: "Added to cart",
        });
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Item
                onClick={() => {
                    router.push(`${paths.products}/${product.id}`);
                }}
                className={cx("item")}
            >
                <Card
                    key={product.id}
                    sx={{
                        boxShadow: "none",
                        position: "relative",
                    }}
                >
                    {!!label && (
                        <Chip
                            label="Hot"
                            color="error"
                            className="position-absolute start-0 top-0"
                            sx={{ zIndex: 1, borderRadius: 1 }}
                        />
                    )}

                    <CardMedia
                        className={cx("image")}
                        component="img"
                        image={product.image}
                        width={100}
                        sx={{
                            height: 250,
                            objectFit: "contain",
                        }}
                        alt={product.title}
                    />
                    <CardContent>
                        <Typography className="text-muted">
                            <SellOutlined color="primary" />{" "}
                            {product?.category?.[0].toUpperCase() +
                                product?.category?.slice(1)}
                        </Typography>
                        <Typography
                            variant="h3"
                            fontSize={20}
                            marginY={1}
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                height: 50,
                            }}
                        >
                            {product.title}
                        </Typography>
                        <Typography fontSize={16}>
                            <MonetizationOnOutlined color="warning" />{" "}
                            <span className="fw-bold">{product.price}$</span>
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <Button
                            aria-label="add to cart"
                            startIcon={<AddShoppingCart />}
                            variant="contained"
                            fullWidth={true}
                            onClick={handleAddCart}
                        >
                            Add to cart
                        </Button>
                    </CardActions>
                </Card>
            </Item>
        </Grid>
    );
}

export default CardProduct;
