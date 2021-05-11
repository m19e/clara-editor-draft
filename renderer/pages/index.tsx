import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parse, extname } from "path";
import { initDraftDir, readDrafts, writeDraft, deleteDraft, getDraftStat } from "lib/draft";
import MetaHeader from "foundations/MetaHeader";

const DEFAULT_DRAFT_TITLE = "無題";

type Draft = {
    title: string;
    updated_at: number;
};

const getDisplayTime = (ms: number): string => {
    const dt = new Date(ms);
    const y = dt.getFullYear() + "/";
    const m = dt.getMonth() + 1 + "/";
    const d = dt.getDate() + " ";
    const ho = ("00" + dt.getHours()).slice(-2) + ":";
    const mi = ("00" + dt.getMinutes()).slice(-2);
    return y + m + d + ho + mi;
};

const Index = () => {
    const router = useRouter();
    const [draftList, setDraftList] = useState<Draft[]>([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);

    useEffect(() => {
        if (shouldUpdate) {
            initDraftDir();
            const drafts = readDrafts("draft");
            const sorted = drafts
                .filter((d) => d.isFile() && extname(d.name) === ".txt")
                .sort((a, b) => getDraftStat(b.name).mtimeMs - getDraftStat(a.name).mtimeMs);
            setDraftList(() =>
                sorted.map((d) => {
                    const { name } = d;
                    const { mtimeMs } = getDraftStat(name);
                    return { title: name, updated_at: mtimeMs };
                })
            );
            setShouldUpdate(false);
        }
    }, [shouldUpdate]);

    const makeNewDraftName = (): string => {
        if (!draftList.map((d) => d.title).includes(`${DEFAULT_DRAFT_TITLE}.txt`)) return DEFAULT_DRAFT_TITLE;
        const d = new Date();
        const time =
            "" +
            d.getFullYear() +
            (d.getMonth() + 1) +
            ("0" + d.getDate()).slice(-2) +
            ("0" + d.getHours()).slice(-2) +
            ("0" + d.getMinutes()).slice(-2) +
            ("0" + d.getSeconds()).slice(-2) +
            d.getMilliseconds();
        return `${DEFAULT_DRAFT_TITLE}_${time}`;
    };

    const addDraft = () => {
        const draft = `${makeNewDraftName()}.txt`;
        writeDraft(draft, "執筆を始める");
        router.push({ pathname: "/editor/[draft]", query: { draft } });
    };

    const removeDraft = (title: string) => {
        deleteDraft(title);
        setShouldUpdate(true);
    };

    return (
        <>
            <MetaHeader title="一覧 - Clara Editor" />
            <div>
                <div className="flex-center w-full">
                    <div className="grid">
                        <span onClick={addDraft}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="grid grid-col-1 w-full text-center">
                    {draftList.map((d, i) => {
                        const { name, ext } = parse(d.title);

                        return (
                            <div key={i} className="flex-center gap-4">
                                <Link href={{ pathname: "/editor/[draft]", query: { draft: d.title } }}>
                                    <a>{name}</a>
                                </Link>
                                <span>{getDisplayTime(d.updated_at)}</span>
                                <span onClick={() => removeDraft(d.title)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Index;
