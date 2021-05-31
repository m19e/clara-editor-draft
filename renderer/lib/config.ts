import Store from "electron-store";
import { FontType } from "types";

const store = new Store();

const getFontType = (): FontType => {
    return store.get("editor/font-type", "mincho") as FontType;
};

const getFontSize = (): number => {
    return store.get("editor/font-size", 7) as number;
};

const getLineHeight = (): number => {
    return store.get("editor/line-height", 3) as number;
};

const getLineWords = (): number => {
    return store.get("editor/line-words", 30) as number;
};

const getAutosaveDuration = (): number => {
    return store.get("editor/autosave-duration", 1) as number;
};

export const getFormat = (): [FontType, number, number, number, number] => {
    const fontType = getFontType();
    const fontSize = getFontSize();
    const lineHeight = getLineHeight();
    const lineWords = getLineWords();
    const autosaveDuration = getAutosaveDuration();

    return [fontType, fontSize, lineHeight, lineWords, autosaveDuration];
};

export const setFontTypeConfig = (ft: FontType) => {
    store.set("editor/font-type", ft);
};

export const setFontSizeConfig = (fs: number) => {
    store.set("editor/font-size", fs);
};

export const setLineHeightConfig = (lh: number) => {
    store.set("editor/line-height", lh);
};

export const setLineWordsConfig = (lw: number) => {
    store.set("editor/line-words", lw);
};

export const setAutosaveDurationConfig = (ad: number) => {
    store.set("editor/autosave-duration", ad);
};
