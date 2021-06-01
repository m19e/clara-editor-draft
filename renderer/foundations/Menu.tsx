import { remote } from "electron";
import { useEffect } from "react";
import { useAutosaveDuration, useDisplayCharCount } from "hooks";

const Menu = () => {
    const [displayCharCount, setDisplayCharCount] = useDisplayCharCount();
    const [autosaveDuration, setAutosaveDuration] = useAutosaveDuration();

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
                        checked: displayCharCount,
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
    }, [displayCharCount, autosaveDuration]);

    return null;
};

export default Menu;
