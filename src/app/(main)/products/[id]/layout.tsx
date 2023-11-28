import type { Metadata, ResolvingMetadata } from "next";
import request from "~/api/request";
import { routes } from "~/api/routes";
type Props = {
    params: { id: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params?.id;

    // fetch data
    const product = await request.get(`${routes.products}/${id}`);

    return {
        title: product.payload.title,
        openGraph: {
            type: "website",
            title: product.payload.title,
            description: product.payload.category,
            images: [product.payload.image],
        },
    };
}
export default function DetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
