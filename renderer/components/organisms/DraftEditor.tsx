import { remote } from "electron";
import { useState, useEffect, useRef, WheelEvent } from "react";
import { ContentState, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { writeDraft } from "lib/draft";
import { getRealFontSize, useLineWords, setWrapperHeight, getEditorHeight, useContent, useTitle } from "hooks";

type Props = {
    text: string;
};

const DraftEditor = ({ text }: Props) => {
    const rfs = getRealFontSize();
    const [lw] = useLineWords();
    const setWH = setWrapperHeight();
    const eh = getEditorHeight();
    const [content, setContent] = useContent();
    const [title] = useTitle();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [saved, setSaved] = useState(true);
    const wrapperRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        setEditorState(() => EditorState.createWithContent(ContentState.createFromText(text)));
        setContent(text);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!saved) saveDraft();
        }, 5000);
        return () => clearTimeout(timer);
    }, [editorState]);

    const saveDraftWithDialog = () => {
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
            writeDraft(path, text);
        } catch (e) {
            console.error(e.message);
        }
    };

    const saveDraft = () => {
        const data = editorState.getCurrentContent().getPlainText();

        try {
            writeDraft(`${title}.txt`, data);
            console.log("Save draft: " + `${title}.txt`);
            setSaved(true);
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleWheel = (e: WheelEvent<HTMLElement>) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= e.deltaY;
        }
    };

    const handleEditorChange = (es: EditorState) => {
        setSaved(false);
        setContent(es.getCurrentContent().getPlainText());
        setEditorState(es);
    };

    return (
        <div ref={wrapperRef} className="min-h-screen flex-center">
            <Scrollbar className="max-w-full pb-4" containerRef={(ref) => (scrollRef.current = ref)} onWheel={handleWheel}>
                <div style={{ height: `${eh}px` }}>
                    <div className="text-justify" style={{ writingMode: "vertical-rl", fontSize: `${rfs}px` }}>
                        <Editor editorState={editorState} onChange={handleEditorChange} />
                    </div>
                </div>
            </Scrollbar>
        </div>
    );
};

export default DraftEditor;
