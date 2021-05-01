import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parse } from "path";
import { readDraft } from "lib/draft";
import { getFormat } from "lib/config";
import { useFontType, useTitle, useFormat } from "hooks";
import MetaHeader from "foundations/MetaHeader";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";

const Draft = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [title, setTitle] = useTitle();
    const [ft] = useFontType();
    const setFormat = useFormat();

    useEffect(() => {
        const { draft } = router.query;
        if (router.route !== router.asPath && typeof draft === "string") {
            const data = readDraft(draft);
            const { name } = parse(draft);
            const [fontType, fontSize, lineWords] = getFormat();

            setFormat({ fontType, fontSize, lineWords });
            setText(data);
            setTitle(name);
        }
    }, [router]);

    return (
        <div className={ft + " text-black editor-bg"}>
            <DraftEditor text={text} />
            <Frame />
        </div>
    );
};

export default Draft;
