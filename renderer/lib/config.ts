import Store from "electron-store";
import { FontType } from "types";

const store = new Store();

const getFontType = (): FontType => {
    return store.get("editor/font-type", "mincho") as FontType;
};

const getFontSize = (): number => {
    return store.get("editor/font-size", 7) as number;
};

const getLineWords = (): number => {
    return store.get("editor/line-words", 30) as number;
};

const getAutosaveDuration = (): number => {
    return store.get("editor/autosave-duration", 1) as number;
};

export const getFormat = (): [FontType, number, number, number] => {
    const fontType = getFontType();
    const fontSize = getFontSize();
    const lineWords = getLineWords();
    const autosaveDuration = getAutosaveDuration();

    return [fontType, fontSize, lineWords, autosaveDuration];
};

export const setFontTypeConfig = (ft: FontType) => {
    store.set("editor/font-type", ft);
};

export const setFontSizeConfig = (fs: number) => {
    store.set("editor/font-size", fs);
};

export const setLineWordsConfig = (lw: number) => {
    store.set("editor/line-words", lw);
};

export const setAutosaveDuration = (ad: number) => {
    store.set("editor/autosave-duration", ad);
};
