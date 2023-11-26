import { Box, Stack } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import "~/app/globals.scss";
import { Footer, Header, Unauthorized } from "~/components";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Unauthorized>
            <Stack className="min-vh-100">
                <div className="py-3 bg-white shadow-sm position-fixed w-100 top-0 max-z-index">
                    <Header />
                </div>
                <Box className="container py-4 padding-header flex-fill">
                    {children}
                </Box>
                <Footer />
            </Stack>
        </Unauthorized>
    );
}
