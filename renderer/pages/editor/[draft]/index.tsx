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
    const [autosaveDuration, setAutosaveDuration] = useAutosaveDuration();
    const [, setDisplayCharCount] = useDisplayCharCount();

    useEffect(() => {
        const localMenu = remote.Menu.buildFromTemplate([
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
                    {
                        id: "autosave-duration",
                        label: "自動保存",
                        submenu: [
                            {
                                id: "duration-1-sec",
                                label: "1秒",
                                type: "checkbox",
                                checked: autosaveDuration === 1,
                                enabled: autosaveDuration !== 1,
                                click: (_, focusedWin) => {
                                    if (focusedWin) {
                                        setAutosaveDuration(1);
                                    }
                                },
                            },
                            {
                                id: "duration-5-sec",
                                label: "5秒",
                                type: "checkbox",
                                checked: autosaveDuration === 5,
                                enabled: autosaveDuration !== 5,
                                click: (_, focusedWin) => {
                                    if (focusedWin) {
                                        setAutosaveDuration(5);
                                    }
                                },
                            },
                            {
                                id: "duration-10-sec",
                                label: "10秒",
                                type: "checkbox",
                                checked: autosaveDuration === 10,
                                enabled: autosaveDuration !== 10,
                                click: (_, focusedWin) => {
                                    if (focusedWin) {
                                        setAutosaveDuration(10);
                                    }
                                },
                            },
                        ],
                    },
                ],
            },
        ]);
        remote.Menu.setApplicationMenu(localMenu);
    }, [autosaveDuration]);

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
        <div className={ft + " text-black editor-bg"}>
            <DraftEditor text={text} />
            <Frame />
        </div>
    );
};

export default Draft;
