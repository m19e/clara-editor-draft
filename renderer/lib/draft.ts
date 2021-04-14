import { writeFile } from "fs/promises";

export const createDraft = async (path: string, text: string) => {
    await writeFile(path, text);
};
