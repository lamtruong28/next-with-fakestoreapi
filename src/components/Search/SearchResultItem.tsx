import { Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { paths } from "~/configs";

function SearchResultItem({
    product,
    setShow,
    setSearchValue,
}: {
    product: IProduct;
    setShow: (newState: boolean) => void;
    setSearchValue: (newState: string) => void;
}) {
    const handleClick = () => {
        setShow(false);
        setSearchValue("");
    };
    return (
        <Paper sx={{ p: 1 }} className="hover-shadow">
            <Link
                href={`${paths.products}/${product.id}`}
                onClick={handleClick}
            >
                <Stack direction={"row"} spacing={1.5}>
                    <Image
                        src={product.image}
                        width={60}
                        height={60}
                        alt={product.title}
                        style={{ flexShrink: 0 }}
                    />

                    <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h3"
                            fontSize={15}
                            className="text-one-line"
                        >
                            {product.title}
                        </Typography>
                        <Typography
                            component={"span"}
                            variant="h5"
                            fontSize={15}
                        >
                            Price:{" "}
                            <span className="text-danger">
                                {product.price}$
                            </span>
                        </Typography>
                    </Stack>
                </Stack>
            </Link>
        </Paper>
    );
}

export default SearchResultItem;
