import { useState, useEffect, useRef, Fragment, WheelEvent, KeyboardEvent } from "react";
import { Editor, EditorState, ContentState, SelectionState, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { SelectionRangeOverride } from "types";
import { writeDraft } from "lib/draft";
import { getRealFontSize, useLineWords, setWrapperHeight, getEditorHeight, useTitle } from "hooks";
import MetaHeader from "foundations/MetaHeader";

type Props = {
    text: string;
};

const DraftEditor = ({ text }: Props) => {
    const rfs = getRealFontSize();
    const [lw] = useLineWords();
    const setWH = setWrapperHeight();
    const eh = getEditorHeight();
    const [title] = useTitle();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [saved, setSaved] = useState(true);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!saved) saveDraft();
        }, 5000);
        return () => clearTimeout(timer);
    }, [saved]);

    // const saveDraftWithDialog = () => {
    //     const text = editorState.getCurrentContent().getPlainText();
    //     const path = remote.dialog.showSaveDialogSync(null, {
    //         defaultPath: "title.txt",
    //         buttonLabel: "保存",
    //         filters: [{ name: "テキスト", extensions: ["txt"] }],
    //         properties: ["showOverwriteConfirmation"],
    //     });

    //     if (path === undefined) {
    //         return;
    //     }

    //     try {
    //         writeDraft(path, text);
    //     } catch (e) {
    //         console.error(e.message);
    //     }
    // };

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
        if (editorState.getCurrentContent().getPlainText() !== es.getCurrentContent().getPlainText()) setSaved(false);
        setEditorState(es);
    };

    const setSelectionRange = (selection: SelectionState, override: SelectionRangeOverride) => {
        const newSelection = selection.merge(override);
        const newEditor = EditorState.forceSelection(editorState, newSelection);
        setEditorState(newEditor);
    };

    const setSelectionCaret = (selection: SelectionState, offset: number, key: string) => {
        const override: SelectionRangeOverride = {
            anchorOffset: offset,
            focusOffset: offset,
            anchorKey: key,
            focusKey: key,
        };
        setSelectionRange(selection, override);
    };

    const handleKeyBinding = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
            e.preventDefault();
            return null;
        }

        if (e.key.includes("Arrow")) {
            switch (e.key) {
                case "ArrowUp":
                    console.log("↑");
                    break;

                case "ArrowDown":
                    console.log("↓");
                    break;

                case "ArrowRight":
                    console.log("→");
                    break;

                case "ArrowLeft":
                    console.log("←");
                    break;

                default:
                    break;
            }
            return null;
        }

        getDefaultKeyBinding(e);
    };

    return (
        <Fragment>
            <MetaHeader title={`${saved ? "" : "*"}${title} - Clara Editor`} />
            <div ref={wrapperRef} className="min-h-screen flex-center">
                <Scrollbar className="max-w-full pb-4" containerRef={(ref) => (scrollRef.current = ref)} onWheel={handleWheel}>
                    <div style={{ height: `${eh}px` }}>
                        <div className="text-justify" style={{ writingMode: "vertical-rl", fontSize: `${rfs}px` }}>
                            <Editor editorState={editorState} onChange={handleEditorChange} keyBindingFn={handleKeyBinding} />
                        </div>
                    </div>
                </Scrollbar>
            </div>
        </Fragment>
    );
};

export default DraftEditor;
