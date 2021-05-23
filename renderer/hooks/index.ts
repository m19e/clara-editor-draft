import { useRecoilState, useRecoilValue, useSetRecoilState, SetterOrUpdater } from "recoil";
import { useCallback } from "react";
import { FontType } from "types";
import {
    fontTypeState,
    displayFontSizeState,
    realFontSizeState,
    lineWordsState,
    wrapperHeightState,
    editorHeightState,
    disabledIncFSState,
    disabledDecFSState,
    disabledIncLWState,
    disabledDecLWState,
    titleState,
    contentState,
    isTitleEditState,
    autosaveDurationState,
} from "store";
import { setFontTypeConfig, setFontSizeConfig, setLineWordsConfig } from "lib/config";

// Editor
export const useFontType = (): [FontType, () => void] => {
    const [fontType, setFontType] = useRecoilState(fontTypeState);
    const toggleFontType = useCallback(() => {
        setFontType((prev) => {
            const curr = prev === "mincho" ? "gothic" : "mincho";
            setFontTypeConfig(curr);
            return curr;
        });
    }, []);

    return [fontType, toggleFontType];
};

export const useFontSize = (): [number, () => void, () => void] => {
    const [fs, setFS] = useRecoilState(displayFontSizeState);
    const incFS = useCallback(() => {
        setFS((prev) => {
            setFontSizeConfig(prev + 1);
            return prev + 1;
        });
    }, []);
    const decFS = useCallback(() => {
        setFS((prev) => {
            setFontSizeConfig(prev - 1);
            return prev - 1;
        });
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
        setLW((prev) => {
            setLineWordsConfig(prev + 1);
            return prev + 1;
        });
    }, []);
    const decLW = useCallback(() => {
        setLW((prev) => {
            setLineWordsConfig(prev - 1);
            return prev - 1;
        });
    }, []);

    return [lw, incLW, decLW];
};

type FormatProps = {
    fontType: FontType;
    fontSize: number;
    lineWords: number;
};

export const useFormat = (): (({ fontType, fontSize, lineWords }: FormatProps) => void) => {
    const setFontType = useSetRecoilState(fontTypeState);
    const setFontSize = useSetRecoilState(displayFontSizeState);
    const setLineWords = useSetRecoilState(lineWordsState);

    const setFormat = useCallback(({ fontType, fontSize, lineWords }: FormatProps) => {
        setFontType(fontType);
        setFontSize(fontSize);
        setLineWords(lineWords);
    }, []);

    return setFormat;
};

export const setWrapperHeight = (): SetterOrUpdater<number> => {
    const setWH = useSetRecoilState(wrapperHeightState);
    return setWH;
};

export const getEditorHeight = (): number => {
    const eh = useRecoilValue(editorHeightState);
    return eh;
};

type DisabledType = {
    incFS: boolean;
    decFS: boolean;
    incLW: boolean;
    decLW: boolean;
};

export const useDisabled = (): DisabledType => {
    const incFS = useRecoilValue(disabledIncFSState);
    const decFS = useRecoilValue(disabledDecFSState);
    const incLW = useRecoilValue(disabledIncLWState);
    const decLW = useRecoilValue(disabledDecLWState);

    return { incFS, decFS, incLW, decLW };
};

export const useAutosaveDuration = (): [number, SetterOrUpdater<number>] => {
    const [duration, setDuration] = useRecoilState(autosaveDurationState);
    return [duration, setDuration];
};

// Draft
export const useTitle = (): [string, SetterOrUpdater<string>] => {
    const [title, setTitle] = useRecoilState(titleState);
    return [title, setTitle];
};

export const useContent = (): [string, SetterOrUpdater<string>] => {
    const [content, setContent] = useRecoilState(contentState);
    return [content, setContent];
};

export const useIsTitleEdit = (): [boolean, SetterOrUpdater<boolean>] => {
    const [isEdit, setIsEdit] = useRecoilState(isTitleEditState);
    return [isEdit, setIsEdit];
};
