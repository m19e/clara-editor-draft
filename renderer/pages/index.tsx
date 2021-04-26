import Link from "next/link";
import { useState, useEffect } from "react";
import { parse, extname } from "path";
import { readDrafts } from "lib/draft";
import MetaHeader from "foundations/MetaHeader";

const Index = () => {
    const [draftList, setDraftList] = useState<string[]>([]);

    useEffect(() => {
        const drafts = readDrafts(".");
        setDraftList(() => drafts.filter((d) => d.isFile() && extname(d.name) === ".txt").map((d) => d.name));
        return () => {};
    }, []);

    return (
        <>
            <MetaHeader title="Index - Nextron (with-typescript-tailwindcss)" />
            <div>
                <div className="flex-center w-full">
                    <div className="grid">
                        <span>+</span>
                    </div>
                </div>
                <div className="grid grid-col-1 w-full text-center">
                    {draftList.map((d, i) => {
                        const { name, ext } = parse(d);

                        return (
                            <div key={i} className="flex-center">
                                <Link href={`/editor/${d}`}>
                                    <a>{name}</a>
                                </Link>
                                <span>
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
