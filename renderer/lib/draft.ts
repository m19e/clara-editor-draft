import { Dirent, Stats, readdirSync, writeFileSync, readFileSync, renameSync, unlinkSync, statSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { extname } from "path";
import { Draft } from "types";
import { DEFAULT_DRAFT_CONTENT, DEFAULT_DRAFT_TITLE } from "consts";

export const initDraftDir = (draftDir: string) => {
    if (existsSync(draftDir)) {
        if (statSync(draftDir).isDirectory()) {
            return;
        }
        unlinkSync(draftDir);
    }
    mkdirSync(draftDir);
    writeDraft(`${DEFAULT_DRAFT_TITLE}.txt`, DEFAULT_DRAFT_CONTENT);
};

export const readDrafts = (path: string): Dirent[] => {
    const drafts = readdirSync(path, { encoding: "utf-8", withFileTypes: true });
    return drafts;
};

// Create, Update(text)
export const writeDraft = (path: string, text: string) => {
    writeFileSync(`draft/${path}`, text);
};

// Read in draft dir
export const readDraft = (path: string): string => {
    const text = readFileSync(`draft/${path}`, "utf-8");
    return text;
};

// Read with full path
export const importDraft = (path: string): string => {
    const text = readFileSync(path, "utf-8");
    return text;
};

// Create with full path
export const exportDraft = (title: string, path: string) => {
    copyFileSync(`draft/${title}`, path);
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

export const loadDraftList = (): Draft[] => {
    const drafts = readDrafts("draft");
    const sorted = drafts.filter((d) => d.isFile() && extname(d.name) === ".txt").sort((a, b) => getDraftStat(b.name).mtimeMs - getDraftStat(a.name).mtimeMs);
    return sorted.map((d) => {
        const { name } = d;
        const { mtimeMs } = getDraftStat(name);
        return { title: name, updated_at: mtimeMs };
    });
};

export const makeNewDraftName = (list: Draft[]): string => {
    const titleList = list.map((d) => d.title);
    if (!titleList.includes(`${DEFAULT_DRAFT_TITLE}.txt`)) return `${DEFAULT_DRAFT_TITLE}.txt`;

    let num = 1;
    while (titleList.includes(`${DEFAULT_DRAFT_TITLE}_${num}.txt`)) {
        num++;
    }
    return `${DEFAULT_DRAFT_TITLE}_${num}.txt`;
};
