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

export const getAutosaveDuration = (): number => {
    return store.get("editor/autosave-duration", 5) as number;
};

export const getFormat = (): [FontType, number, number] => {
    const fontType = getFontType();
    const fontSize = getFontSize();
    const lineWords = getLineWords();

    return [fontType, fontSize, lineWords];
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
