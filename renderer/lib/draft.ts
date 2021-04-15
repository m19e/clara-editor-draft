import { Dirent, readdirSync, writeFileSync, readFileSync, renameSync, unlinkSync } from "fs";
// import { readdir, writeFile, readFile, unlink, rename } from "fs/promises";

export const readDrafts = (path: string): Dirent[] => {
    const drafts = readdirSync(path, { encoding: "utf-8", withFileTypes: true });
    return drafts;
};

// Create, Update(text)
export const writeDraft = (path: string, text: string) => {
    writeFileSync(path, text);
};

export const readDraft = (path: string): string => {
    const text = readFileSync(path, "utf-8");
    return text;
};

// Update(filename)
export const renameDraft = (oldPath: string, newPath: string) => {
    renameSync(oldPath, newPath);
};

export const deleteDraft = (path: string) => {
    unlinkSync(path);
};
