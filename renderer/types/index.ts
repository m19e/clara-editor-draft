export type FontType = "mincho" | "gothic";

export type SelectionRangeOverride = {
    anchorOffset: number;
    focusOffset?: number;
    anchorKey?: string;
    focusKey?: string;
    isBackward?: boolean;
};

export type Draft = {
    title: string;
    updated_at: number;
};
