"use client";
import { paths } from "~/configs";
import Navigation from "./Navigation";
import Link from "next/link";
import { localStore } from "~/utils";
import { Badge, Box, Button, Stack } from "@mui/material";
import { Search } from ".";
import { LocalMallOutlined } from "@mui/icons-material";

const menus: IMenu[] = [
    {
        label: "Home",
        link: paths.home,
    },
    {
        label: "Products",
        link: paths.products,
    },
];

function Header() {
    const handleLogout = () => {
        localStore.clear();
    };
    return (
        <Box className="container d-flex justify-content-between">
            <Navigation menus={menus} />
            <Search />
            <Stack direction={"row"} spacing={2}>
                <Button
                    sx={{
                        width: 30,
                    }}
                >
                    <Badge badgeContent={4} color="secondary">
                        <LocalMallOutlined
                            sx={{ fontSize: 32 }}
                            color="action"
                        />
                    </Badge>
                </Button>
                <Button variant="outlined" onClick={handleLogout}>
                    <Link href={paths.login} className="text-decoration-none">
                        Log out
                    </Link>
                </Button>
            </Stack>
        </Box>
    );
}

export default Header;
