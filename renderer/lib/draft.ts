import { Dirent, Stats, readdirSync, writeFileSync, readFileSync, renameSync, unlinkSync, statSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { join, extname } from "path";
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
    writeDraft(draftDir, `${DEFAULT_DRAFT_TITLE}.txt`, DEFAULT_DRAFT_CONTENT);
};

export const readDrafts = (path: string): Dirent[] => {
    const drafts = readdirSync(path, { encoding: "utf-8", withFileTypes: true });
    return drafts;
};

// Create, Update(text)
export const writeDraft = (dir: string, filepath: string, text: string) => {
    writeFileSync(join(dir, filepath), text);
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
export const exportDraft = (dir: string, title: string, path: string) => {
    copyFileSync(join(dir, title), path);
};

// Update(filename)
export const renameDraft = (oldPath: string, newPath: string) => {
    renameSync(`draft/${oldPath}`, `draft/${newPath}`);
};

export const deleteDraft = (dir: string, filepath: string) => {
    unlinkSync(join(dir, filepath));
};

export const getDraftStat = (dir: string, filepath: string): Stats => {
    const stat = statSync(join(dir, filepath));
    return stat;
};

export const loadDraftList = (dir: string): Draft[] => {
    const drafts = readDrafts(dir);
    const sorted = drafts
        .filter((d) => d.isFile() && extname(d.name) === ".txt")
        .sort((a, b) => getDraftStat(dir, b.name).mtimeMs - getDraftStat(dir, a.name).mtimeMs);
    return sorted.map((d) => {
        const { name } = d;
        const { mtimeMs } = getDraftStat(dir, name);
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
