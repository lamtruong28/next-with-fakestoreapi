import axios from "axios";
import { env } from "~/configs";

const request = {
    instance: axios.create({
        baseURL: `https://${env.baseUrl}`,
    }),
    get: async (path: string, options = {}) => {
        try {
            const res = await request.instance.get(path, options);
            return {
                status: "success",
                payload: res.data,
            };
        } catch (error: any) {
            console.error(error);
            return {
                status: "error",
                message: error?.response?.data,
            };
        }
    },
    post: async (path: string, data: object, options = {}) => {
        try {
            const res = await request.instance.post(path, data, options);
            console.log({ postRes: res });
            return {
                status: "success",
                payload: res.data,
            };
        } catch (error: any) {
            console.error(error);
            return {
                status: "error",
                message: error?.response?.data,
            };
        }
    },
};

export default request;
