import { remote } from "electron";
import { writeFileSync } from "fs";
import { useState, useEffect, useRef, WheelEvent } from "react";
import { ContentState, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { getRealFontSize, useLineWords, setWrapperHeight, getEditorHeight } from "hooks";

type Props = {
    text: string;
};

const DraftEditor = ({ text }: Props) => {
    const rfs = getRealFontSize();
    const [lw] = useLineWords();
    const setWH = setWrapperHeight();
    const eh = getEditorHeight();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const wrapperRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        setEditorState(() => EditorState.createWithContent(ContentState.createFromText(text)));
    }, [text]);

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

    const handleWheel = (e: WheelEvent<HTMLElement>) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= e.deltaY;
        }
    };

    return (
        <div ref={wrapperRef} className="min-h-screen flex-center">
            <Scrollbar className="max-w-full pb-4" containerRef={(ref) => (scrollRef.current = ref)} onWheel={handleWheel}>
                <div style={{ height: `${eh}px` }}>
                    <div className="text-justify" style={{ writingMode: "vertical-rl", fontSize: `${rfs}px` }}>
                        <Editor editorState={editorState} onChange={setEditorState} />
                    </div>
                </div>
            </Scrollbar>
        </div>
    );
};

export default DraftEditor;
