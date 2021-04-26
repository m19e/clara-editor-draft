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
                            <Link key={i} href={`/editor/${d}`}>
                                <a>{name}</a>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Index;
