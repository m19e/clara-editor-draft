import { remote } from "electron";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { getTheme, getDisplayCharCount, getAutosaveDuration, setThemeConfig, setDisplayCharCountConfig } from "lib/config";
import { useAutosaveDuration, useDisplayCharCount } from "hooks";

const Menu = () => {
    const { theme, setTheme } = useTheme();
    const [displayCharCount, setDisplayCharCount] = useDisplayCharCount();
    const [autosaveDuration, setAutosaveDuration] = useAutosaveDuration();

    useEffect(() => {
        const t = getTheme();
        setTheme(t);

        const disp = getDisplayCharCount();
        const auto = getAutosaveDuration();
        setDisplayCharCount(disp);
        setAutosaveDuration(auto);
    }, []);

    useEffect(() => {
        const localMenu = remote.Menu.buildFromTemplate([
            {
                label: "設定",
                submenu: [
                    {
                        id: "dark-mode",
                        label: "ダークモード",
                        type: "checkbox",
                        accelerator: "CmdOrCtrl+Shift+T",
                        checked: theme === "dark",
                        click: (_, win) => {
                            if (win) {
                                const t = theme === "dark" ? "light" : "dark";
                                setTheme(t);
                                setThemeConfig(t);
                            }
                        },
                    },
                    {
                        id: "char-count-display",
                        label: "字数カウント",
                        type: "checkbox",
                        accelerator: "CmdOrCtrl+Shift+C",
                        checked: displayCharCount,
                        click: (_, win) => {
                            if (win) {
                                setDisplayCharCount((prev) => {
                                    setDisplayCharCountConfig(!prev);
                                    return !prev;
                                });
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
                                click: (_, win) => {
                                    if (win) {
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
                                click: (_, win) => {
                                    if (win) {
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
                                click: (_, win) => {
                                    if (win) {
                                        setAutosaveDuration(10);
                                    }
                                },
                            },
                        ],
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: "全画面",
                        sublabel: "Escで戻る",
                        accelerator: (() => {
                            if (process.platform === "darwin") {
                                return "Ctrl+Cmd+F";
                            } else {
                                return "F11";
                            }
                        })(),
                        click: (_, win) => {
                            if (win) {
                                const isF = win.isFullScreen();
                                win.setFullScreen(!isF);
                                win.setMenuBarVisibility(isF);
                            }
                        },
                    },
                    {
                        label: "全画面解除",
                        accelerator: "Esc",
                        visible: false,
                        click: (_, win) => {
                            if (win && win.isFullScreen()) {
                                win.setFullScreen(false);
                                win.setMenuBarVisibility(true);
                            }
                        },
                    },
                ],
            },
        ]);
        remote.Menu.setApplicationMenu(localMenu);
    }, [theme, displayCharCount, autosaveDuration]);

    return null;
};

export default Menu;
