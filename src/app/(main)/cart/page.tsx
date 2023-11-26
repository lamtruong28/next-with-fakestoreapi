"use client";
import {
    AddOutlined,
    DeleteOutline,
    RemoveOutlined,
} from "@mui/icons-material";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { paths } from "~/configs";
import { useAppDispatch, useAppSelector } from "~/hooks/reduxHooks";
import { cartSelector } from "~/store/selector/cartSelector";
import { decrement, increment, removeCartItem } from "~/store/slices/cart";
import { showToast } from "~/utils";

function createCol({
    title,
    alignment = "left",
    width,
}: {
    title: string;
    alignment?: "left" | "right" | "center" | "inherit" | "justify";
    width?: number | string;
}) {
    return { title, alignment, width };
}

const cols = [
    createCol({
        title: "Product",
    }),
    createCol({
        title: "Price",
        alignment: "center",
    }),
    createCol({
        title: "Quantity",
        alignment: "center",
    }),
    createCol({
        title: "Total",
        alignment: "center",
    }),
    createCol({
        title: "Action",
        alignment: "center",
    }),
];

function Cart() {
    const { carts }: { carts: ICart[] } = useAppSelector(cartSelector);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);
    const [rowPerPage, setRowPerPage] = useState<number>(10);
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleRowPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowPerPage(+event.target.value);
        setPage(0);
    };

    const onSelectClick = (checked: boolean, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const incrementQuantity = (item: ICart) => {
        dispatch(
            increment({
                productId: item.productId,
            })
        );
    };
    const decrementQuantity = (item: ICart) => {
        dispatch(
            decrement({
                productId: item.productId,
            })
        );
    };

    const handleRemoveCart = (item: ICart) => {
        dispatch(removeCartItem(item.productId));
    };

    const handleCheckAll = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        if (checked) {
            const newSelected = carts?.map((cart) => cart.productId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteItemSelected = () => {
        selected.length > 0
            ? setOpenDialog(true)
            : showToast({
                  type: "error",
                  message: "Please select product",
                  position: "bottom-center",
              });
    };

    const handleRemoveItemSelected = () => {
        selected.forEach((item) => {
            dispatch(removeCartItem(item));
        });
        setSelected([]);
        handleCloseDialog();
    };

    const totalPayment = useMemo(() => {
        return selected?.reduce((total, id) => {
            const index = carts?.findIndex((item) => item.productId === id);
            return (total +=
                carts[index]?.price || 0 * carts[index]?.quantity || 0);
        }, 0);
    }, [selected, carts]);

    const handlePurchaseClick = () => {
        if (!selected.length) {
            showToast({
                type: "error",
                message: "Please select product",
                position: "bottom-center",
            });
            return;
        }

        showToast({
            type: "info",
            message: "This feature is under development",
        });
    };

    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h1" fontSize={26}>
                    Your cart
                </Typography>
                <Paper>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table
                            sx={{ minWidth: 650 }}
                            aria-label="cart list"
                            stickyHeader={true}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        padding="checkbox"
                                        sx={{
                                            fontSize: 16,
                                            bgcolor: "#ccc",
                                            borderRight: "1px solid #e0e0e0",
                                        }}
                                    >
                                        <Checkbox
                                            color="primary"
                                            indeterminate={
                                                selected.length > 0 &&
                                                selected.length < carts?.length
                                            }
                                            checked={
                                                carts?.length > 0 &&
                                                carts?.length ===
                                                    selected.length
                                            }
                                            onChange={handleCheckAll}
                                            inputProps={{
                                                "aria-label": "select all",
                                            }}
                                        />
                                    </TableCell>
                                    {cols.map((col) => (
                                        <TableCell
                                            align={col.alignment}
                                            key={col.title}
                                            sx={{
                                                fontSize: 16,
                                                bgcolor: "#ccc",
                                                borderRight:
                                                    "1px solid #e0e0e0",

                                                "&:last-child": {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <strong>{col.title}</strong>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {carts?.length ? (
                                    carts
                                        ?.slice(
                                            page * rowPerPage,
                                            page * rowPerPage + rowPerPage
                                        )
                                        ?.map((cart: ICart) => (
                                            <TableRow key={cart.productId}>
                                                <TableCell
                                                    padding="checkbox"
                                                    sx={{
                                                        borderRight:
                                                            "1px solid #e0e0e0",
                                                    }}
                                                >
                                                    <Checkbox
                                                        color="primary"
                                                        onChange={(
                                                            event,
                                                            checked
                                                        ) =>
                                                            onSelectClick(
                                                                checked,
                                                                cart.productId
                                                            )
                                                        }
                                                        checked={
                                                            selected.indexOf(
                                                                cart.productId
                                                            ) !== -1
                                                        }
                                                        inputProps={{
                                                            "aria-label":
                                                                "select all desserts",
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    width={"50%"}
                                                    sx={{
                                                        borderRight:
                                                            "1px solid #e0e0e0",
                                                    }}
                                                >
                                                    <Stack
                                                        direction={"row"}
                                                        spacing={1.5}
                                                    >
                                                        <Image
                                                            src={cart.image}
                                                            width={50}
                                                            height={50}
                                                            alt={cart.image}
                                                            style={{
                                                                flexShrink: 0,
                                                            }}
                                                        />
                                                        <Link
                                                            href={`${paths.products}/${cart.productId}`}
                                                            className="link"
                                                        >
                                                            {cart.productName}
                                                        </Link>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    width={"10%"}
                                                    sx={{
                                                        borderRight:
                                                            "1px solid #e0e0e0",
                                                    }}
                                                >
                                                    {cart.price}$
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    width={"20%"}
                                                    sx={{
                                                        borderRight:
                                                            "1px solid #e0e0e0",
                                                    }}
                                                >
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={
                                                            "center"
                                                        }
                                                        spacing={0.5}
                                                    >
                                                        <IconButton
                                                            onClick={() =>
                                                                decrementQuantity(
                                                                    cart
                                                                )
                                                            }
                                                            disabled={
                                                                cart.quantity ===
                                                                1
                                                            }
                                                        >
                                                            <RemoveOutlined />
                                                        </IconButton>
                                                        <TextField
                                                            variant="outlined"
                                                            size="small"
                                                            value={
                                                                cart.quantity
                                                            }
                                                            sx={{
                                                                width: 80,
                                                            }}
                                                            inputProps={{
                                                                style: {
                                                                    textAlign:
                                                                        "center",
                                                                },
                                                                readOnly: true,
                                                            }}
                                                        />
                                                        <IconButton
                                                            onClick={() =>
                                                                incrementQuantity(
                                                                    cart
                                                                )
                                                            }
                                                        >
                                                            <AddOutlined />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    width={"10%"}
                                                    sx={{
                                                        borderRight:
                                                            "1px solid #e0e0e0",
                                                    }}
                                                >
                                                    {Number(
                                                        (
                                                            cart.price *
                                                            cart.quantity
                                                        ).toFixed(2)
                                                    )}
                                                    $
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tooltip
                                                        title="Delete"
                                                        arrow={true}
                                                    >
                                                        <IconButton
                                                            onClick={() =>
                                                                handleRemoveCart(
                                                                    cart
                                                                )
                                                            }
                                                        >
                                                            <DeleteOutline color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell align="center" colSpan={6}>
                                            <Typography fontSize={16}>
                                                Cart empty.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {carts?.length > 0 && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, 50]}
                            page={page}
                            rowsPerPage={rowPerPage}
                            component={"div"}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleRowPerPageChange}
                            count={carts?.length}
                            sx={{
                                ".MuiTablePagination-selectLabel": {
                                    mb: 0,
                                },
                                ".MuiTablePagination-displayedRows": {
                                    mb: 0,
                                },
                                borderTop: "1px solid #e0e0e0",
                            }}
                        />
                    )}
                </Paper>
                {carts?.length > 0 && (
                    <Paper
                        className="p-3 position-sticky bottom-0"
                        elevation={5}
                    >
                        <Stack
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            direction={"row"}
                        >
                            <Stack
                                direction={"row"}
                                spacing={1}
                                alignItems={"center"}
                            >
                                <Checkbox
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length < carts?.length
                                    }
                                    checked={
                                        carts?.length > 0 &&
                                        carts?.length === selected.length
                                    }
                                    onChange={handleCheckAll}
                                    inputProps={{
                                        "aria-label": "select all",
                                    }}
                                />
                                <Typography>
                                    Select all ({carts?.length || 0})
                                </Typography>
                                <Button
                                    variant="text"
                                    sx={{
                                        textTransform: "none",
                                    }}
                                    color="error"
                                    onClick={handleDeleteItemSelected}
                                >
                                    Delete
                                </Button>
                            </Stack>
                            <Stack
                                direction={"row"}
                                spacing={3}
                                alignItems={"center"}
                            >
                                <Typography>
                                    Total payment ({selected.length} product):{" "}
                                    <strong className="text-danger">
                                        {Number(totalPayment.toFixed(2))}$
                                    </strong>
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handlePurchaseClick}
                                >
                                    Purchase
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                )}
            </Stack>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    Do you want to remove {selected.length}{" "}
                    {selected.length > 1 ? "products" : "product"}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>No</Button>
                    <Button autoFocus onClick={handleRemoveItemSelected}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Cart;
