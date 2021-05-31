import { atom, selector } from "recoil";
import { FontType } from "types";

// Atoms

// Editor
export const fontTypeState = atom<FontType>({
    key: "editor/font-type",
    default: "mincho",
});

export const displayCharCountState = atom({
    key: "editor/display-char-count",
    default: true,
});

export const displayFontSizeState = atom({
    key: "editor/display-font-size",
    default: 7,
});

export const lineHeightState = atom({
    key: "editor/line-height",
    default: 3,
});

export const lineWordsState = atom({
    key: "editor/lineWords",
    default: 30,
});

export const wrapperHeightState = atom({
    key: "editor/wrapper-height",
    default: 480,
});

export const autosaveDurationState = atom({
    key: "editor/autosave-duration",
    default: 5,
});

// Draft
export const titleState = atom({
    key: "draft/title",
    default: "無題",
});

export const contentState = atom({
    key: "draft/content",
    default: "執筆を始める",
});

export const isTitleEditState = atom({
    key: "draft/is-title-edit",
    default: false,
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
        return (rfs + 2) * get(lineWordsState) > get(wrapperHeightState) - 16 || rfs >= 48;
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
        return get(realFontSizeState) * (lw + 1) > get(wrapperHeightState) - 16 || lw >= 50;
    },
});

export const disabledDecLWState = selector({
    key: "editor/disabled-dec-lw",
    get: ({ get }) => get(lineWordsState) <= 10,
});
