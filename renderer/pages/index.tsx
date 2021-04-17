import Link from "next/link";
import { useState, useEffect } from "react";
import { parse, extname } from "path";
import { readDrafts } from "lib/draft";
import MetaHeader from "foundations/MetaHeader";

const Index = () => {
    const [draftList, setDraftList] = useState<string[]>([]);

    useEffect(() => {
        const drafts = readDrafts(".");
        setDraftList(() => drafts.filter((d) => d.isFile() && extname(d.name) === ".json").map((d) => d.name));
        return () => {};
    }, []);

    return (
        <>
            <MetaHeader title="Index - Nextron (with-typescript-tailwindcss)" />
            <div>
                <div className="grid grid-col-1 text-2xl w-full text-center">
                    <img className="ml-auto mr-auto" src="/images/logo.png" />
                    <span>⚡ Electron ⚡</span>
                    <span>+</span>
                    <span>Next.js</span>
                    <span>+</span>
                    <span>tailwindcss</span>
                    <span>=</span>
                    <span>💕 </span>
                </div>
                <div className="mt-1 w-full flex-wrap flex justify-center">
                    <Link href="/editor">
                        <a className="btn-blue">Go to editor page</a>
                    </Link>
                </div>
                <div className="grid grid-col-1 w-full text-center">
                    {draftList.map((d, i) => (
                        <Link key={i} href={`/editor/${d}`}>
                            <a>
                                name:{parse(d).name}, ext:{extname(d)}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Index;
