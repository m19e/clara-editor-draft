import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback } from "react";
import { FontType } from "types";
import { fontTypeState, displayFontSizeState, realFontSizeState, lineWordsState } from "store";

export const useFontType = (): [FontType, () => void] => {
    const [fontType, setFontType] = useRecoilState(fontTypeState);
    const toggleFontType = useCallback(() => {
        setFontType((prev) => (prev === "mincho" ? "gothic" : "mincho"));
    }, []);

    return [fontType, toggleFontType];
};

export const useFontSize = (): [number, () => void, () => void] => {
    const [fs, setFS] = useRecoilState(displayFontSizeState);
    const incFS = useCallback(() => {
        setFS((prev) => prev + 1);
    }, []);
    const decFS = useCallback(() => {
        setFS((prev) => prev - 1);
    }, []);

    return [fs, incFS, decFS];
};

export const getRealFontSize = (): number => {
    const rfs = useRecoilValue(realFontSizeState);
    return rfs;
};

export const useLineWords = (): [number, () => void, () => void] => {
    const [lw, setLW] = useRecoilState(lineWordsState);
    const incLW = useCallback(() => {
        setLW((prev) => prev + 1);
    }, []);
    const decLW = useCallback(() => {
        setLW((prev) => prev - 1);
    }, []);

    return [lw, incLW, decLW];
};
