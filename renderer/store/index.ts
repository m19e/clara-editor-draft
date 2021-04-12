import { atom } from "recoil";
import { FontType } from "types";

export const fontTypeState = atom<FontType>({
    key: "editor/font-type",
    default: "mincho",
});
