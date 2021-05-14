import Link from "next/link";
import { parse } from "path";
import { Draft } from "types";

const getDisplayTime = (ms: number): [string, string] => {
    const dt = new Date(ms);
    const y = dt.getFullYear() + "/";
    const m = dt.getMonth() + 1 + "/";
    const d = dt.getDate();
    const ho = ("00" + dt.getHours()).slice(-2) + ":";
    const mi = ("00" + dt.getMinutes()).slice(-2);
    return [y + m + d, ho + mi];
};

type Props = {
    draft: Draft;
    removeFn: (title: string) => void;
};

const DraftListItem = ({ draft, removeFn }: Props) => {
    const { title, updated_at } = draft;
    const { name } = parse(title);
    const [date, time] = getDisplayTime(updated_at);

    return (
        <div className="grid grid-cols-12 text-gray-600 group">
            <div className="col-span-1 inline-flex justify-end px-2">
                <button className="text-gray-600 opacity-0 group-hover:opacity-100 outline-none focus:outline-none" onClick={() => removeFn(title)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <Link href={{ pathname: "/editor/[draft]", query: { draft: title } }}>
                <a className="col-span-10 p-4 inline-flex justify-between mincho group-hover:bg-gray-400 border-b border-gray-400">
                    <span className="text-lg group-hover:text-white">{name}</span>
                    <div className="inline-flex justify-between w-28 text-gray-500 group-hover:text-white">
                        <span>{date}</span>
                        <span>{time}</span>
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default DraftListItem;
