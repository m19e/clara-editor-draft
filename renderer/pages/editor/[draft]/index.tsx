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
                            // {
                            //     id: "duration-disable",
                            //     label: "無効",
                            //     type: "checkbox",
                            //     checked: autosaveDuration === 0,
                            //     enabled: autosaveDuration !== 0,
                            //     click: (self, focusedWin) => {
                            //         if (focusedWin) {
                            //             setAutosaveDuration(0);
                            //         }
                            //     },
                            // },
                            {
                                id: "duration-1-sec",
                                label: "1秒",
                                type: "checkbox",
                                checked: autosaveDuration === 1,
                                enabled: autosaveDuration !== 1,
                                click: (self, focusedWin) => {
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
                                click: (self, focusedWin) => {
                                    if (focusedWin) {
                                        setAutosaveDuration(5);
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
