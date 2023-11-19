"use client";
import React from "react";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PropType = {
    menus: IMenu[];
};
function Navigation(props: PropType) {
    const pathname = usePathname();

    const menus = props.menus;
    return (
        <Stack direction={"row"} spacing={1.5}>
            {menus.map((menu) => (
                <Button
                    sx={{ padding: 0, textTransform: "none" }}
                    key={menu.link}
                    variant={pathname === menu.link ? "contained" : "outlined"}
                >
                    <Link
                        href={menu.link}
                        className={`${
                            pathname === menu.link
                                ? "text-white "
                                : "text-dark "
                        } text-decoration-none d-flex justify-content-center align-items-center px-3 w-100 h-100`}
                    >
                        {menu.label}
                    </Link>
                </Button>
            ))}
        </Stack>
    );
}

export default Navigation;
