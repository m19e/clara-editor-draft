import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { parse } from "path";
import { Draft } from "types";

const getDisplayTime = (ms: number): string => {
    const dt = new Date(ms);
    const y = dt.getFullYear() + "/";
    const m = dt.getMonth() + 1 + "/";
    const d = dt.getDate();
    const md = m + d;
    const date = (md + "     ").slice(0, 8 + (4 - md.length));
    const ho = ("00" + dt.getHours()).slice(-2) + ":";
    const mi = ("00" + dt.getMinutes()).slice(-2);
    return y + date + ho + mi;
};

type Props = {
    draft: Draft;
    removeFn: (title: string) => void;
};

const DraftListItem = ({ draft, removeFn }: Props) => {
    const { theme } = useTheme();
    const [removeMode, setRemoveMode] = useState(false);

    const { title, updated_at } = draft;
    const { name } = parse(title);
    const time = getDisplayTime(updated_at);

    const removeProc = () => {
        removeFn(title);
        setRemoveMode(false);
    };

    const handleMouseLeave = () => {
        if (removeMode) setRemoveMode(false);
    };

    return (
        <div className={"grid grid-cols-12 group " + (theme === "dark" ? "clara-text__dark" : "text-gray-600")} onMouseLeave={handleMouseLeave}>
            {removeMode ? (
                <>
                    <div className="col-span-1 inline-flex justify-end pr-1">
                        <div className="flex-center">
                            <button
                                className={"w-8 h-8 flex-center rounded-full bg-gray-400 " + (theme === "dark" ? "text-gray-600" : "text-white")}
                                onClick={() => setRemoveMode(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="col-span-10 px-2 inline-flex items-center gap-2 mincho bg-gray-400 border-b border-gray-400">
                        <button
                            className={
                                "whitespace-nowrap gothic font-black text-sm bg-red-500 p-2 rounded " + (theme === "dark" ? "text-gray-200" : "text-white")
                            }
                            onClick={removeProc}
                        >
                            削除
                        </button>
                        <span className={"text-lg break-all my-4 " + (theme === "dark" ? "text-gray-600" : "text-white")}>{name}</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-1 inline-flex justify-end pr-2">
                        <button
                            className={"opacity-0 group-hover:opacity-100 " + (theme === "dark" ? "clara-text__dark" : "text-gray-500")}
                            onClick={() => setRemoveMode(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <Link href={{ pathname: "/editor/[draft]", query: { draft: title } }}>
                        <a
                            className={
                                "col-span-10 p-4 inline-flex gap-4 justify-between items-center mincho group-hover:bg-gray-400 border-b border-gray-400 group-hover:" +
                                (theme === "dark" ? "text-gray-700" : "text-white")
                            }
                        >
                            <span className="break-all text-lg">{name}</span>
                            <div className="inline-flex w-0 overflow-hidden md:w-28 md:overflow-visible">
                                <span className="whitespace-pre opacity-75">{time}</span>
                            </div>
                        </a>
                    </Link>
                </>
            )}
        </div>
    );
};

export default DraftListItem;
