import { DeleteOutline } from "@mui/icons-material";
import { IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { paths } from "~/configs";
import { useAppDispatch } from "~/hooks/reduxHooks";
import { removeCartItem } from "~/store/slices/cart";

function Item({ cart }: { cart: ICart }) {
    const dispatch = useAppDispatch();
    const handleRemoveCart = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        dispatch(removeCartItem(cart.productId));
    };
    return (
        <Paper sx={{ p: 1 }} className="hover-shadow">
            <Link href={`${paths.products}/${cart.productId}`}>
                <Stack direction={"row"} spacing={1.5}>
                    <Image
                        src={cart.image}
                        width={60}
                        height={60}
                        alt={cart.image}
                        style={{ flexShrink: 0 }}
                    />

                    <Stack spacing={0} sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h3"
                            fontSize={15}
                            className="text-one-line"
                        >
                            {cart.productName}
                        </Typography>
                        <Stack
                            direction={"row"}
                            spacing={1}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography
                                component={"span"}
                                variant="h5"
                                fontSize={15}
                            >
                                <span className="text-danger">
                                    {cart.price}$
                                </span>{" "}
                                x {cart.quantity}
                            </Typography>
                            <Tooltip title="Delete" arrow={true}>
                                <IconButton
                                    sx={{
                                        p: 0.5,
                                    }}
                                    onClick={handleRemoveCart}
                                >
                                    <DeleteOutline color="error" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>
            </Link>
        </Paper>
    );
}

export default Item;
