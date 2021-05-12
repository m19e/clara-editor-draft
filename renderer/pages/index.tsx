import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parse, extname } from "path";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
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
        loadDraftList();
    }, []);

    const loadDraftList = () => {
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
    };

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

    const removeDraft = (title: string) => {
        deleteDraft(title);
        loadDraftList();
    };

    return (
        <>
            <MetaHeader title="一覧 - Clara Editor" />
            <Scrollbar className="max-h-screen">
                <div className="min-h-screen flex-center flex-col">
                    <div className="grid grid-col-1 w-3/4 select-none">
                        <div className="w-full inline-flex">
                            <div className="w-7"></div>
                            <div className="flex-1 inline-flex justify-between text mincho text-gray-600 px-2 pb-2 border-b border-gray-400">
                                <span>原稿</span>
                                <span className="text-left" style={{ width: "7.75rem" }}>
                                    最終更新
                                </span>
                            </div>
                        </div>
                        {draftList.map((d, i) => {
                            const { title, updated_at } = d;
                            const { name } = parse(title);
                            const [date, time] = getDisplayTime(updated_at);

                            return (
                                <div key={i} className="grid grid-cols-12 text-gray-600 text-lg group">
                                    <button
                                        className="col-span-1 text-gray-600 opacity-0 group-hover:opacity-100 outline-none focus:outline-none"
                                        onClick={() => removeDraft(title)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <Link href={{ pathname: "/editor/[draft]", query: { draft: title } }}>
                                        <a className="col-span-10 py-4 inline-flex justify-between mincho group-hover:text-white group-hover:bg-gray-400 border-b border-gray-400">
                                            <span>{name}</span>
                                            <div className="inline-flex justify-between" style={{ width: "7.75rem" }}>
                                                <span>{date}</span>
                                                <span>{time}</span>
                                            </div>
                                        </a>
                                    </Link>
                                    <div className="col-span-1"></div>
                                </div>
                            );
                        })}
                        <div className="inline-flex">
                            <div className="w-7"></div>
                            <div className="flex-1 flex-center">
                                <button
                                    className="gothic rounded-full text-gray-700 border border-gray-500 px-6 py-1 mt-4 outline-none focus:outline-none"
                                    onClick={addDraft}
                                >
                                    新しい原稿
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbar>
        </>
    );
};

export default Index;
