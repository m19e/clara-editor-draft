import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parse } from "path";
import { readDraft } from "lib/draft";
import { useFontType } from "hooks";
import MetaHeader from "foundations/MetaHeader";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";

const Draft = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const [ft] = useFontType();

    useEffect(() => {
        const draft = router.query.draft;
        if (router.route !== router.asPath && typeof draft === "string") {
            const data = readDraft(draft);
            setText(data);

            const { name } = parse(draft);
            setTitle(name);
        }
    }, [router]);

    return (
        <div className={ft + " text-black editor-bg"}>
            <MetaHeader title="(タイトル) - Clara Editor" />
            <DraftEditor text={text} />
            <Frame />
        </div>
    );
};

export default Draft;
