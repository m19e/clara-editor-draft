import { remote } from "electron";
import { writeFileSync } from "fs";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ContentState, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { getRealFontSize, useLineWords, setWrapperHeight, getEditorHeight } from "hooks";

const DraftEditor = () => {
    const rfs = getRealFontSize();
    const [lw] = useLineWords();
    const setWH = setWrapperHeight();
    const eh = getEditorHeight();
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(
            ContentState.createFromText(`　あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
　またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
　あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
　またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
　あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
　またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
　あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
　またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。`)
        )
    );
    const wrapperRef = useRef(null);

    useEffect(() => {
        const resizeObs = new ResizeObserver((entries: ReadonlyArray<ResizeObserverEntry>) => {
            const height = entries[0].contentRect.height;
            setWH(height);
        });
        wrapperRef.current && resizeObs.observe(wrapperRef.current);

        return () => {
            resizeObs.disconnect();
        };
    }, [rfs, lw]);

    const saveDraft = () => {
        const text = editorState.getCurrentContent().getPlainText();
        const path = remote.dialog.showSaveDialogSync(null, {
            defaultPath: "title.txt",
            buttonLabel: "保存",
            filters: [{ name: "テキスト", extensions: ["txt"] }],
            properties: ["showOverwriteConfirmation"],
        });

        if (path === undefined) {
            return;
        }

        try {
            writeFileSync(path, text);
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <div ref={wrapperRef} className="min-h-screen w-full flex-center relative">
            <Scrollbar className="max-w-full" style={{ height: `${eh + 16}px` }}>
                <div style={{ height: `${eh}px` }}>
                    <div className="text-justify" style={{ writingMode: "vertical-rl", fontSize: `${rfs}px` }}>
                        <Editor editorState={editorState} onChange={setEditorState} />
                    </div>
                </div>
            </Scrollbar>
            <div className="absolute bottom-2 left-2 w-9 h-9 flex justify-center items-center bg-white rounded-full transition-colors text-gray-600 hover:text-gray-900">
                <Link href="/home">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </a>
                </Link>
            </div>
            <div
                className="absolute bottom-2 right-2 w-9 h-9 flex justify-center items-center bg-white rounded-full transition-colors text-gray-600 hover:text-gray-900"
                onClick={() => saveDraft()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                </svg>
            </div>
        </div>
    );
};

export default DraftEditor;
