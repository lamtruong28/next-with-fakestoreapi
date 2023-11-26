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
            <div className="py-3 bg-white shadow-sm position-fixed w-100 top-0 max-z-index">
                <Header />
            </div>
            <div className="container py-4 margin-header">{children}</div>
            <Footer />
        </Unauthorized>
    );
}
