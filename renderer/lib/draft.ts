import { Dirent, readdirSync, writeFileSync } from "fs";
// import { readdir, writeFile, readFile, unlink, rename } from "fs/promises";

export const readDrafts = (path: string): Dirent[] => {
    const drafts = readdirSync(path, { encoding: "utf-8", withFileTypes: true });
    return drafts;
};

// Create, Update(text)
export const writeDraft = (path: string, text: string) => {
    writeFileSync(path, text);
};

export const readDraft = async (path: string): Promise<string> => {
    const text = await readFile(path, "utf-8");
    return text;
};

// Update(filename)
export const renameDraft = async (oldPath: string, newPath: string) => {
    await rename(oldPath, newPath);
};

export const deleteDraft = async (path: string) => {
    await unlink(path);
};
