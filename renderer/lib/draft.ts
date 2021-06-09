import { Dirent, Stats, readdirSync, writeFileSync, readFileSync, renameSync, unlinkSync, statSync, existsSync, mkdirSync } from "fs";
import { DEFAULT_DRAFT_TITLE } from "consts";

export const initDraftDir = () => {
    if (existsSync("draft")) {
        if (statSync("draft").isDirectory()) {
            return;
        }
        unlinkSync("draft");
    }
    mkdirSync("draft");
    writeDraft(`${DEFAULT_DRAFT_TITLE}.txt`, "執筆を始める");
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
