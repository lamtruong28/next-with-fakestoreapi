import request from "~/api/request";

const fetcher = async (url: string, options = {}) => {
    const res = await request.get(url, options);
    return res.payload;
};
export default fetcher;
