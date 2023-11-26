"use client";
import { useRouter } from "next/navigation";
import { paths } from "~/configs";
import { localStore } from "~/utils";
import { env } from "~/configs";
import { useEffect, useState } from "react";

function Unauthorized({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLogged] = useState(() => localStore.get(env.isLogged));
    useEffect(() => {
        if (!isLogged) router.replace(paths.login);
    }, []);
    return <>{children}</>;
}

export default Unauthorized;
