import classNames from "classnames/bind";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import SearchResultItem from "./SearchResultItem";
import styles from "./search.module.scss";

const cx = classNames.bind(styles);
type IProps = {
    products: IProduct[];
    show: boolean;
    searchValue: string;
    setSearchValue: (newState: string) => void;
    setShow: (newState: boolean) => void;
};
function PredictiveSearchResult({
    products,
    searchValue,
    setSearchValue,
    show,
    setShow,
}: IProps) {
    if (!!searchValue)
        return (
            <Paper
                elevation={5}
                className={cx(
                    "search-result",
                    "position-absolute top-100 start-0 w-100 mt-2 pt-3 pb-2 px-1",
                    {
                        active: show,
                    }
                )}
                component={"div"}
            >
                <Typography
                    variant="h3"
                    fontSize={14}
                    className="text-muted mb-2 px-2 pb-2 border-bottom"
                >
                    Search result
                </Typography>
                <Stack spacing={1.5} className={cx("result-list", "p-2 ")}>
                    {products?.length ? (
                        products.map((product) => (
                            <SearchResultItem
                                key={product.id}
                                product={product}
                                setShow={setShow}
                                setSearchValue={setSearchValue}
                            />
                        ))
                    ) : (
                        <Typography textAlign={"center"}>
                            No results.
                        </Typography>
                    )}
                </Stack>
            </Paper>
        );
}

export default PredictiveSearchResult;
