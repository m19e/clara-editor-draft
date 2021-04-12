import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { FontType } from "types";
import { fontTypeState } from "store";

export const useFontType = (): [FontType, () => void] => {
    const [fontType, setFontType] = useRecoilState(fontTypeState);
    const toggleFontType = useCallback(() => {
        setFontType((prev) => (prev === "mincho" ? "gothic" : "mincho"));
    }, []);

    return [fontType, toggleFontType];
};
