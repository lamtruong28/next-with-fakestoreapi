import React, { useEffect, useCallback } from "react";

const useOutsideClick = (
    refs: React.RefObject<HTMLDivElement>[],
    callback: () => void
) => {
    const handleClickOutside = useCallback(
        (event: any) => {
            for (const ref of refs) {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            }
        },
        [callback, refs]
    );

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [handleClickOutside]);

    return handleClickOutside;
};

export default useOutsideClick;
