const localStore = {
    get: (key: string) => {
        if (typeof window !== "undefined") {
            const result = localStorage.getItem(key);
            return result
                ? JSON.parse(localStorage.getItem(key) as string)
                : result;
        }
    },
    set: (key: string, data: any) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },
    remove: (key: string) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(key);
        }
    },
    clear: () => {
        if (typeof window !== "undefined") {
            localStorage.clear();
        }
    },
};

export default localStore;
