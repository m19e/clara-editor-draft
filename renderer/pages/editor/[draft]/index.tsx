import { remote } from "electron";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parse } from "path";
import { readDraft } from "lib/draft";
import { getFormat } from "lib/config";
import { useFontType, useTitle, useFormat, useAutosaveDuration, useDisplayCharCount } from "hooks";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";

const Draft = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [, setTitle] = useTitle();
    const [ft] = useFontType();
    const setFormat = useFormat();
    const [, setAutosaveDuration] = useAutosaveDuration();

    const [, setDisplayCharCount] = useDisplayCharCount();
    const remoteMenu = remote.Menu;

    useEffect(() => {
        const localMenu = remoteMenu.buildFromTemplate([
            {
                label: "設定",
                submenu: [
                    {
                        id: "char-count-display",
                        label: "文字数を表示する",
                        type: "checkbox",
                        accelerator: "CmdOrCtrl+T",
                        checked: true,
                        click: (self, focusedWin) => {
                            if (focusedWin) {
                                setDisplayCharCount(self.checked);
                            }
                        },
                    },
                ],
            },
        ]);
        remoteMenu.setApplicationMenu(localMenu);

        const { draft } = router.query;
        if (router.route !== router.asPath && typeof draft === "string") {
            const data = readDraft(draft);
            const { name } = parse(draft);
            const [fontType, fontSize, lineWords, autosaveDuration] = getFormat();

            setFormat({ fontType, fontSize, lineWords });
            setAutosaveDuration(autosaveDuration);
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
