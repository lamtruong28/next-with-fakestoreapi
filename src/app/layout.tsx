import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "~/app/globals.scss";
import StoreProvider from "~/store/StoreProvider";

const inter = Roboto({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: "FakeStore",
    description: "FakeStore with NextJS 14",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreProvider>
            <html lang="en">
                <body>
                    {children}
                    <ToastContainer autoClose={2500} />
                </body>
            </html>
        </StoreProvider>
    );
}
