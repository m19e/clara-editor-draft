import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { parse } from "path";
import { readDraft } from "lib/draft";
import { getFormat } from "lib/config";
import { useFontType, useTitle, useFormat, useAutosaveDuration } from "hooks";
import Menu from "foundations/Menu";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";

const Draft = () => {
    const { theme } = useTheme();

    const router = useRouter();
    const [text, setText] = useState("");
    const [, setTitle] = useTitle();
    const [ft] = useFontType();
    const setFormat = useFormat();
    const [, setAutosaveDuration] = useAutosaveDuration();

    useEffect(() => {
        const { draft } = router.query;
        if (router.route !== router.asPath && typeof draft === "string") {
            const data = readDraft(draft);
            const { name } = parse(draft);
            const { autosaveDuration, ...formatObj } = getFormat();

            setFormat(formatObj);
            setAutosaveDuration(autosaveDuration);
            setText(data);
            setTitle(name);
        }
    }, [router]);

    return (
        <div className={ft + " text-black clara-bg__" + theme}>
            <Menu />
            {typeof theme === "string" ? <DraftEditor text={text} /> : null}
            <Frame />
        </div>
    );
};

export default Draft;
