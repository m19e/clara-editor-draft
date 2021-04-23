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

export const getFormat = (): [FontType, number, number] => {
    const fontType = getFontType();
    const fontSize = getFontSize();
    const lineWords = getLineWords();

    return [fontType, fontSize, lineWords];
};


