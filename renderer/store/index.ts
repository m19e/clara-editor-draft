import { atom, selector } from "recoil";
import { FontType, LineHeightClassType } from "types";
import { DEFAULT_DRAFT_TITLE, DEFAULT_DRAFT_CONTENT } from "consts";

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
    default: DEFAULT_DRAFT_TITLE,
});

export const contentState = atom({
    key: "draft/content",
    default: DEFAULT_DRAFT_CONTENT,
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

const lineHeightClassList: LineHeightClassType[] = ["leading-none", "leading-tight", "leading-snug", "leading-normal", "leading-relaxed", "leading-loose"];

export const lineHeightClassState = selector<LineHeightClassType>({
    key: "editor/line-height-class",
    get: ({ get }) => lineHeightClassList[get(lineHeightState)],
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

export const disabledIncLHState = selector({
    key: "editor/disabled-inc-lh",
    get: ({ get }) => get(lineHeightState) >= 5,
});

export const disabledDecLHState = selector({
    key: "editor/disabled-dec-lh",
    get: ({ get }) => get(lineHeightState) <= 0,
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
