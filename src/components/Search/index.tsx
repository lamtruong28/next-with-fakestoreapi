"use client";
import classNames from "classnames/bind";
import { CloseRounded, SearchOutlined } from "@mui/icons-material";
import {
    CircularProgress,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Stack,
} from "@mui/material";
import useSWR from "swr";
import { routes } from "~/api/routes";
import { fetcher } from "~/utils";
import PredictiveSearchResult from "./PredictiveSearchResult";
import React, { useEffect, useRef, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import styles from "./search.module.scss";
import useOutsideClick from "~/hooks/useOutsideClick";
import { useRouter } from "next/navigation";
import { paths } from "~/configs";

const cx = classNames.bind(styles);

function Search() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR(routes.products, fetcher);
    const [searchText, setSearchText] = useState<string>("");
    const [debouncedValue, isSearch] = useDebounce(searchText, 600);
    const [result, setResult] = useState<IProduct[]>([]);
    const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
    const searchRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        debouncedValue &&
            setResult(
                (data as IProduct[])?.filter((product) =>
                    product.title
                        .toLowerCase()
                        .includes((debouncedValue as string).toLowerCase())
                )
            );
    }, [debouncedValue]);

    useOutsideClick([searchRef], () => {
        setShowSearchResult(false);
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value.startsWith(" "))
            setSearchText(event.target.value);
    };

    const handleClear = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setSearchText("");
        inputRef.current?.focus();
    };

    const handleSearch = () => {
        if (!!searchText) {
            setShowSearchResult(false);
            router.push(`${paths.search}?q=${searchText}`);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearch();
    };

    return (
        <>
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 450,
                    maxWidth: "100%",
                    position: "relative",
                }}
                ref={searchRef}
                className={cx("search-box")}
                onSubmit={handleSubmit}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    spellCheck={false}
                    placeholder="Search"
                    inputRef={inputRef}
                    value={searchText}
                    onChange={handleOnChange}
                    onFocus={() => setShowSearchResult(true)}
                />

                <IconButton
                    type="button"
                    sx={{ p: 0.5 }}
                    aria-label="clear"
                    disabled={isSearch as boolean}
                    onClick={handleClear}
                >
                    {!!searchText && isSearch ? (
                        <CircularProgress size={18} />
                    ) : (
                        !!searchText &&
                        !isSearch && <CloseRounded fontSize="small" />
                    )}
                </IconButton>
                {!!searchText && isSearch && (
                    <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                        sx={{
                            mx: 0.7,
                        }}
                    />
                )}
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleSearch}
                >
                    <SearchOutlined />
                </IconButton>
                {!isSearch && (
                    <PredictiveSearchResult
                        products={result}
                        searchValue={searchText}
                        setSearchValue={setSearchText}
                        show={showSearchResult}
                        setShow={setShowSearchResult}
                    />
                )}
            </Paper>
        </>
    );
}

export default Search;
