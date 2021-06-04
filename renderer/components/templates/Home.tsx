import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { extname } from "path";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { Draft } from "types";
import { initDraftDir, readDrafts, writeDraft, deleteDraft, getDraftStat } from "lib/draft";
import DraftListItem from "components/molecules/DraftListItem";

const DEFAULT_DRAFT_TITLE = "無題";

const Home = () => {
    const router = useRouter();
    const { theme } = useTheme();
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
        <Scrollbar className="max-h-screen">
            <div className={"min-h-screen flex-center flex-col clara-bg__" + theme}>
                <div className="flex flex-col w-3/4 xl:max-w-5xl my-8 select-none" style={{ minHeight: "70vh" }}>
                    <div className="grid grid-cols-12">
                        <div className="col-span-1 inline-flex justify-end pr-2">
                            <button className={"group relative pb-1 " + (theme === "dark" ? "clara-text__dark" : "text-gray-500")} onClick={addDraft}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <div
                                    className={
                                        "opacity-0 group-hover:opacity-100 bg-gray-400 text-sm gothic font-semibold whitespace-pre rounded py-1.5 px-4 absolute z-10 bottom-1 left-8 pointer-events-none " +
                                        (theme === "dark" ? "text-gray-600" : "text-white")
                                    }
                                >
                                    原稿を追加
                                </div>
                            </button>
                        </div>
                        <div
                            className={
                                "col-span-10 px-4 py-2 inline-flex gap-4 justify-between items-center text-sm mincho border-b border-gray-400 " +
                                (theme === "dark" ? "clara-text__dark" : "text-gray-600")
                            }
                        >
                            <span>原稿</span>
                            <div className="inline-flex w-0 overflow-hidden md:w-28 md:overflow-visible">
                                <span className="whitespace-pre">最終更新</span>
                            </div>
                        </div>
                    </div>
                    {draftList.map((draft, i) => (
                        <DraftListItem key={i} draft={draft} removeFn={removeDraft} />
                    ))}
                </div>
            </div>
        </Scrollbar>
    );
};

export default Home;
