import { useSelector } from "react-redux";
import Item from "./Item";
import { cartSelector } from "~/store/selector/cartSelector";
import {
    Button,
    Divider,
    Drawer,
    List,
    Stack,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { paths } from "~/configs";

type CartType = {
    open: boolean;
    setOpen: (newState: boolean) => void;
};

function Cart({ open, setOpen }: CartType) {
    const { carts }: { carts: ICart[] } = useSelector(cartSelector);

    return (
        <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
            <Stack
                className="pt-3 pb-2 vh-100"
                width={400}
                justifyContent={"space-between"}
            >
                <Stack spacing={1.5} flex={1} sx={{ overflow: "hidden" }}>
                    <Typography
                        className="text-muted px-3"
                        variant="h3"
                        fontSize={24}
                    >
                        Your cart
                    </Typography>
                    <Divider />
                    {carts?.length ? (
                        <Stack
                            spacing={1.6}
                            className="px-3 pb-3"
                            sx={{
                                overflowY: "overlay",

                                flex: 1,
                            }}
                        >
                            {carts.map((cart: ICart) => (
                                <Item key={cart.productId} cart={cart} />
                            ))}
                        </Stack>
                    ) : (
                        <Typography textAlign={"center"}>
                            Cart empty.
                        </Typography>
                    )}
                </Stack>
                {carts?.length > 0 && (
                    <Link href={paths.cart} className="d-block px-3">
                        <Button
                            variant="contained"
                            fullWidth={true}
                            onClick={() => setOpen(false)}
                        >
                            View cart
                        </Button>
                    </Link>
                )}
            </Stack>
        </Drawer>
    );
}

export default Cart;
