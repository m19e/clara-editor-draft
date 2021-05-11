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

const getDisplayTime = (ms: number): [string, string] => {
    const dt = new Date(ms);
    const y = dt.getFullYear() + "/";
    const m = dt.getMonth() + 1 + "/";
    const d = dt.getDate();
    const ho = ("00" + dt.getHours()).slice(-2) + ":";
    const mi = ("00" + dt.getMinutes()).slice(-2);
    return [y + m + d, ho + mi];
};

const Index = () => {
    const router = useRouter();
    const [draftList, setDraftList] = useState<Draft[]>([]);

    useEffect(() => {
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
    }, []);

    const makeNewDraftName = (): string => {
        const titleList = draftList.map((d) => d.title);
        if (!titleList.includes(`${DEFAULT_DRAFT_TITLE}.txt`)) return DEFAULT_DRAFT_TITLE;

        let num = 1;
        while (titleList.includes(`${DEFAULT_DRAFT_TITLE}_${num}.txt`)) {
            num++;
        }
        return `${DEFAULT_DRAFT_TITLE}_${num}`;
    };

    const addDraft = () => {
        const draft = `${makeNewDraftName()}.txt`;
        writeDraft(draft, "執筆を始める");
        router.push({ pathname: "/editor/[draft]", query: { draft } });
    };

    return (
        <>
            <MetaHeader title="一覧 - Clara Editor" />
            <div className="min-h-screen flex-center flex-col">
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
                <div className="grid grid-col-1 w-3/5">
                    {draftList.map((d, i) => {
                        const { title, updated_at } = d;
                        const { name } = parse(title);
                        const [date, time] = getDisplayTime(updated_at);

                        return (
                            <div key={i} className="flex-center">
                                <Link href={{ pathname: "/editor/[draft]", query: { draft: title } }}>
                                    <a className="w-full p-2 inline-flex justify-between mincho hover:text-gray-50 hover:bg-gray-400 border-b border-gray-400">
                                        <span>{name}</span>
                                        <div className="w-28 inline-flex justify-between">
                                            <span>{date}</span>
                                            <span>{time}</span>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Index;
