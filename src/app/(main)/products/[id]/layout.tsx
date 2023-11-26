import type { Metadata, ResolvingMetadata } from "next";
import request from "~/api/request";
import { routes } from "~/api/routes";
type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params?.id;

    // fetch data
    const product = await request.get(`${routes.products}/${id}`);
    return {
        title: product.payload.title,
    };
}
export default function DetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
