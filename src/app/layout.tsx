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
    openGraph: {
        images: ['https://lh3.googleusercontent.com/pw/ADCreHcMQc_qaYAysOR4C_EAuPf1Zyz2pMEzNVJrsJgn4WHFnbYlrAeQh12KWKfgwD8f7UUMTOz0rBtErX9w29EqQYblflIk6PomkcYkVurXlFHAicwnIBT8qs5nijI0Sj64FxDgYPQtiSpAbWzi8MyZSftW_Bfbb-vpk9sBNUxPCicm7V0DwCzLwPTc44LOb91n0l-eMfkwpXOGeFOzNUJ3g7ZPYJS91LAgcwf1FfsTdpVpZrGjV0euXg-YAuTDjkG5XUj11Qiq4OCAwWiPuhfEo2PAkD4YkY0ExNtAdQz4xLBX0kiUjCvQHMA9HhQqWBP4FGx0rt-ff6J6IE8dfM0p17eNwhylgtfULw2PqlTbEcDSy-eacliO62qgrJhWRVDwDNje_IbkSvzpvPrWOpA03ErvX_Dxj-Zw6mhuo9jpAznVkSalhyIeJ-55TrUFyYPCAslx_n8UJ8H7KSdOuuNWvdSf9fJ24EMxzeawgtOvkjZ2IgjwnmIL3w0X7C24piK1YXGhk2PgYwW06-YuycK-wsQJb1RpMhWTU1RDa7KOdF3HuuzeXSzQBvptuTZGURk7NoOPOfODcQJyX-W4PViHMhdJmSgGt43BJ4cSCCY0PyrlYBlqxqxxK5j5UKFuYOST5j2QDLJiLuvZNyvBJuRAIIRd9I53BBy0mVrq3tgZrr7JsANM9eXc_7vB_J_xvWFgSHb5rICds3Oe3YchSbBPMzJlwy14Ep0hAmYWzkTBMbIgVdO-vH3XOpGTca9d1yih5kfBqdwfrxLHMptoV_PZeqB95OBbdVW8MrfIISqCLUT5vnCW51WHg6HbTtWWVN7UMNPPEXcagb5SZb6JvGA8O2OjuLfDyjpEeoxVzEzr0uCUoBFkzRAxQeIK0dz_wSdlhQ=w1906-h884-s-no-gm?authuser=0']
    }
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
