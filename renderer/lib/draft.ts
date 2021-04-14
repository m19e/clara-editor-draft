import { writeFile, readFile, unlink } from "fs/promises";

// Create, Update(text)
export const writeDraft = async (path: string, text: string) => {
    await writeFile(path, text);
};

export const readDraft = async (path: string): Promise<string> => {
    const text = await readFile(path, "utf-8");
    return text;
};

export const deleteDraft = async (path: string) => {
    await unlink(path);
};
