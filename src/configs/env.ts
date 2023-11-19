const env = {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
    isLogged: process.env.NEXT_PUBLIC_IS_LOGGED || "",
    token: process.env.NEXT_PUBLIC_TOKEN || "",
};

export default env;
