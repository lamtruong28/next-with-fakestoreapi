"use client";
import { paths } from "~/configs";
import Navigation from "./Navigation";
import { localStore } from "~/utils";
import {
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { LocalMallOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { env } from "~/configs";

import { Cart, Search } from ".";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/hooks/reduxHooks";
import { cartSelector } from "~/store/selector/cartSelector";
import request from "~/api/request";
import { routes } from "~/api/routes";

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
    const router = useRouter();
    const { carts } = useAppSelector(cartSelector);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [settings, setSettings] = useState<
        { key: number; label: string; path: string }[]
    >([
        {
            key: 20,
            label: "Log out",
            path: paths.login,
        },
    ]);

    useEffect(() => {
        (async () => {
            const data = jwtDecode<{ iat: string; user: string; sub: string }>(
                localStore.get(env.token) as string
            );
            if (data?.sub) {
                const res = await request.get(`${routes.users}/${data.sub}`);
                if (res.status === "success") {
                    setSettings([
                        {
                            key: 10,
                            label: "Personal info",
                            path: `@${res.payload?.name.firstname}-${res.payload?.name.lastname}`,
                        },
                        {
                            key: 20,
                            label: "Log out",
                            path: paths.login,
                        },
                    ]);
                }
            }
        })();
    }, []);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (key: number, path: string) => {
        switch (key) {
            case 10:
                router.replace(path);
                break;
            case 20:
                localStore.clear();
                router.replace(path);
                break;
            default:
                break;
        }
        setAnchorElUser(null);
    };
    return (
        <>
            <Box className="container d-flex justify-content-between">
                <Navigation menus={menus} />
                <Search />
                <Stack direction={"row"} spacing={1.5}>
                    <IconButton onClick={() => setOpenMenu(true)}>
                        <Badge
                            badgeContent={carts?.length || 0}
                            color="secondary"
                        >
                            <LocalMallOutlined
                                sx={{ fontSize: 30 }}
                                color="action"
                            />
                        </Badge>
                    </IconButton>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            borderRightWidth: 1.5,
                            borderColor: "#555",
                        }}
                        variant="middle"
                    />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings" sx={{ zIndex: 10000 }}>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            {settings?.map((setting) => (
                                <MenuItem
                                    key={setting.key}
                                    onClick={() =>
                                        handleCloseUserMenu(
                                            setting.key,
                                            setting.path
                                        )
                                    }
                                    disableRipple
                                >
                                    <Typography textAlign="center">
                                        {setting.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Stack>
            </Box>

            <Cart open={openMenu} setOpen={setOpenMenu} />
        </>
    );
}

export default Header;
