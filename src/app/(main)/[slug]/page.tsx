"use client";
import { Paper, Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import useSWR from "swr";
import { routes } from "~/api/routes";
import { env } from "~/configs";
import { fetcher, localStore } from "~/utils";

function PersonalInfo(props: any) {
    const { params } = props;
    const [userId] = useState(() => {
        const decode = jwtDecode(localStore.get(env.token));
        return decode?.sub;
    });
    const { data, error, isLoading } = useSWR<IUser>(
        `${routes.users}/${userId}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    return (
        <Stack className="pt-5" alignItems={"center"}>
            <Stack spacing={2} width={500} padding={3} component={Paper}>
                <Typography
                    variant="h1"
                    fontSize={30}
                    className="pb-1 border-bottom"
                >
                    Personal Info
                </Typography>
                <Typography>
                    Full name:{" "}
                    <strong>
                        {`${data?.name?.firstname?.[0].toUpperCase()}${data?.name?.firstname.slice(
                            1
                        )}`}{" "}
                        {`${data?.name?.lastname?.[0].toUpperCase()}${data?.name?.lastname.slice(
                            1
                        )}`}
                    </strong>
                </Typography>
                <Typography>
                    Email: <strong>{data?.email}</strong>
                </Typography>
                <Typography>
                    Phone: <strong>{data?.phone}</strong>
                </Typography>
                <Typography>
                    Address:{" "}
                    <strong className="text-capitalize">
                        {data?.address?.street} street, {data?.address?.city}{" "}
                        city
                    </strong>
                </Typography>
            </Stack>
        </Stack>
    );
}

export default PersonalInfo;
