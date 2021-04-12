import { atom, selector } from "recoil";
import { FontType } from "types";

export const fontTypeState = atom<FontType>({
    key: "editor/font-type",
    default: "mincho",
});

export const displayFontSizeState = atom({
    key: "editor/display-font-size",
    default: 7,
});

export const realFontSizeState = selector({
    key: "editor/real-font-size",
    get: ({ get }) => (get(displayFontSizeState) + 5) * 2,
});

export const lineWordsState = atom({
    key: "editor/lineWords",
    default: 30,
});

export const wrapperHeightState = atom({
    key: "editor/wrapper-height",
    default: 480,
});

export const editorHeightState = selector({
    key: "editor/editor-height",
    get: ({ get }) => get(realFontSizeState) * get(lineWordsState),
});
