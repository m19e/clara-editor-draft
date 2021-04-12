import { atom, selector } from "recoil";
import { FontType } from "types";

// Atoms
export const fontTypeState = atom<FontType>({
    key: "editor/font-type",
    default: "mincho",
});

export const displayFontSizeState = atom({
    key: "editor/display-font-size",
    default: 7,
});

export const lineWordsState = atom({
    key: "editor/lineWords",
    default: 30,
});

export const wrapperHeightState = atom({
    key: "editor/wrapper-height",
    default: 480,
});

// Selectors
export const realFontSizeState = selector({
    key: "editor/real-font-size",
    get: ({ get }) => (get(displayFontSizeState) + 5) * 2,
});

export const editorHeightState = selector({
    key: "editor/editor-height",
    get: ({ get }) => get(realFontSizeState) * get(lineWordsState),
});

export const disabledIncFSState = selector({
    key: "editor/disabled-inc-fs",
    get: ({ get }) => {
        const rfs = get(realFontSizeState);
        return (rfs + 2) * get(lineWordsState) > get(wrapperHeightState) || rfs >= 48;
    },
});

export const disabledDecFSState = selector({
    key: "editor/disabled-dec-fs",
    get: ({ get }) => get(realFontSizeState) <= 12,
});

export const disabledIncLWState = selector({
    key: "editor/disabled-inc-lw",
    get: ({ get }) => {
        const lw = get(lineWordsState);
        return get(realFontSizeState) * (lw + 1) > get(wrapperHeightState) || lw >= 50;
    },
});

export const disabledDecLWState = selector({
    key: "editor/disabled-dec-lw",
    get: ({ get }) => get(lineWordsState) <= 10,
});
