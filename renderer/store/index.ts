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
