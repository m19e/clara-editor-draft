import { Dirent, Stats, readdirSync, writeFileSync, readFileSync, renameSync, unlinkSync, statSync, existsSync, mkdirSync } from "fs";

export const initDraftDir = () => {
    if (existsSync("draft")) {
        const stat = statSync("draft");
        if (!stat.isDirectory()) {
            unlinkSync("draft");
            mkdirSync("draft");
            writeDraft("clara.txt", "執筆を始める");
        }
    } else {
        mkdirSync("draft");
        writeDraft("clara.txt", "執筆を始める");
    }
};

export const readDrafts = (path: string): Dirent[] => {
    const drafts = readdirSync(path, { encoding: "utf-8", withFileTypes: true });
    return drafts;
};

// Create, Update(text)
export const writeDraft = (path: string, text: string) => {
    writeFileSync(`draft/${path}`, text);
};

export const readDraft = (path: string): string => {
    const text = readFileSync(`draft/${path}`, "utf-8");
    return text;
};

// Update(filename)
export const renameDraft = (oldPath: string, newPath: string) => {
    renameSync(`draft/${oldPath}`, `draft/${newPath}`);
};

export const deleteDraft = (path: string) => {
    unlinkSync(`draft/${path}`);
};

export const getDraftStat = (path: string): Stats => {
    const stat = statSync(`draft/${path}`);
    return stat;
};
