import { remote } from "electron";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parse, join } from "path";
import { useTheme } from "next-themes";
import { getTheme, getDisplayCharCount, getAutosaveDuration, setThemeConfig } from "lib/config";
import { importDraft, loadDraftList, makeNewDraftName, writeDraft } from "lib/draft";
import { useTitle, useAutosaveDuration, useDisplayCharCount } from "hooks";

type Props = {
    page: "home" | "editor";
};

const Menu = ({ page }: Props) => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [title] = useTitle();
    const [displayCharCount, setDisplayCharCount, toggleDisplayCharCount] = useDisplayCharCount();
    const [autosaveDuration, setAutosaveDuration] = useAutosaveDuration();

    useEffect(() => {
        const t = getTheme();
        setTheme(t);

        const dcc = getDisplayCharCount();
        const ad = getAutosaveDuration();
        setDisplayCharCount(dcc);
        setAutosaveDuration(ad);
    }, []);

    useEffect(() => {
        const localMenu = remote.Menu.buildFromTemplate([
            {
                label: "原稿",
                submenu: [
                    {
                        id: "import-draft",
                        label: "読み込む…",
                        accelerator: "CmdOrCtrl+O",
                        click: (_, win) => {
                            if (win) {
                                const paths = remote.dialog.showOpenDialogSync(win, {
                                    defaultPath: ".",
                                    filters: [
                                        {
                                            name: "テキストファイル",
                                            extensions: ["txt"],
                                        },
                                    ],
                                    properties: ["openFile"],
                                });
                                if (paths === undefined || paths.length !== 1) {
                                    return;
                                }
                                const text = importDraft(paths[0]);
                                const { base } = parse(paths[0]);
                                const list = loadDraftList();
                                const exist = list.map((d) => d.title).includes(base);
                                const draft = exist ? makeNewDraftName(list) : base;
                                writeDraft(draft, text);
                                router.push({ pathname: "/editor/[draft]", query: { draft } });
                            }
                        },
                    },
                    {
                        id: "export-draft",
                        label: "書き出す…",
                        accelerator: "CmdOrCtrl+Shift+S",
                        enabled: page === "editor",
                        click: (_, win) => {
                            if (win) {
                                const path = remote.dialog.showSaveDialogSync(win, {
                                    defaultPath: join(remote.app.getPath("desktop"), "draft.txt"),
                                    filters: [
                                        {
                                            name: "テキストファイル",
                                            extensions: ["txt"],
                                        },
                                    ],
                                    properties: ["showOverwriteConfirmation"],
                                });
                                if (typeof path === "undefined" || parse(path).ext !== ".txt") return;
                            }
                        },
                    },
                    { id: "delete-draft", label: "削除", enabled: page === "editor" },
                ],
            },
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
                                toggleDisplayCharCount();
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
    }, [theme, title, displayCharCount, autosaveDuration]);

    return null;
};

export default Menu;
