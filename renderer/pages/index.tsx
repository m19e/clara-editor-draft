import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { extname } from "path";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { Draft } from "types";
import { initDraftDir, readDrafts, writeDraft, deleteDraft, getDraftStat } from "lib/draft";
import MetaHeader from "foundations/MetaHeader";
import DraftListItem from "components/molecules/DraftListItem";

const DEFAULT_DRAFT_TITLE = "無題";

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
                    <div className="grid grid-col-1 w-3/4 xl:max-w-5xl my-8 select-none">
                        <div className="w-full h-10 grid grid-cols-12">
                            <div className="col-span-1 inline-flex justify-end pr-2">
                                <button className="text-gray-500 hover:text-gray-600 pb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                            <div className="col-span-10 inline-flex justify-between items-center text-sm mincho px-4 border-b border-gray-400">
                                <span className="text-gray-600">原稿</span>
                                <div className="inline-flex w-0 overflow-hidden md:w-28 md:overflow-visible">
                                    <span className="text-left text-gray-500">最終更新</span>
                                </div>
                            </div>
                        </div>
                        {draftList.map((draft, i) => (
                            <DraftListItem key={i} draft={draft} removeFn={removeDraft} />
                        ))}
                        <div className="flex-center">
                            <button
                                className="gothic rounded-full text-gray-600 hover:text-gray-50 hover:bg-gray-400 border border-gray-400 px-6 py-1 mt-8"
                                onClick={addDraft}
                            >
                                新しい原稿
                            </button>
                        </div>
                    </div>
                </div>
            </Scrollbar>
        </>
    );
};

export default Index;
