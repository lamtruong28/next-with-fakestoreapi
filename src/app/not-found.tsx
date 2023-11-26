"use client";
import { ArrowBackOutlined, HomeOutlined } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { paths } from "~/configs";

export default function NotFound() {
    return (
        <div className="vh-100">
            <div className="d-flex justify-content-center align-items-center pt-5 flex-column">
                <div
                    className="w-50 text-center shadow p-5"
                    style={{ backgroundColor: "#f5f5f5", borderRadius: 10 }}
                >
                    <h1 style={{ textAlign: "center", padding: "30px 0" }}>
                        404 not found!
                    </h1>
                    <Stack direction={"row"} justifyContent={"center"} gap={2}>
                        <Link href={paths.home}>
                            <Button
                                variant="contained"
                                startIcon={<HomeOutlined />}
                                color="primary"
                            >
                                Trang chủ
                            </Button>
                        </Link>
                    </Stack>
                </div>
            </div>
        </div>
    );
}
