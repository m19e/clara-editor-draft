import { useState, useEffect, useRef, Fragment, WheelEvent, KeyboardEvent } from "react";
import { Editor, EditorState, ContentState, SelectionState, getDefaultKeyBinding } from "draft-js";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { SelectionRangeOverride } from "types";
import { writeDraft } from "lib/draft";
import { getRealFontSize, useLineWords, setWrapperHeight, getEditorHeight, useTitle, useAutosaveDuration } from "hooks";
import MetaHeader from "foundations/MetaHeader";
import CharCount from "components/molecules/DraftCharCount";

type Props = {
    text: string;
};

const DraftEditor = ({ text }: Props) => {
    const rfs = getRealFontSize();
    const [lw] = useLineWords();
    const setWH = setWrapperHeight();
    const eh = getEditorHeight();
    const [autosaveDuration] = useAutosaveDuration();
    const [title] = useTitle();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [plainText, setPlainText] = useState("");
    const [saved, setSaved] = useState(true);
    const wrapperRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const es = EditorState.createWithContent(ContentState.createFromText(text));
        setEditorState(es);
        setPlainText(text);
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
            if (!saved) saveDraft(editorState);
        }, autosaveDuration * 1000);
        return () => clearTimeout(timer);
    }, [editorState]);

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

    const saveDraft = (es: EditorState) => {
        const data = es.getCurrentContent().getPlainText();

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
        const oldText = editorState.getCurrentContent().getPlainText();
        const newText = es.getCurrentContent().getPlainText();

        if (oldText !== newText) setSaved(false);
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
            e.preventDefault();

            const selection = editorState.getSelection();
            const content = editorState.getCurrentContent();
            const offset = selection.getAnchorOffset();
            const key = selection.getAnchorKey();
            const blockLen = content.getBlockForKey(key).getLength();

            switch (e.key) {
                case "ArrowUp":
                    if (offset === 0) {
                        const beforeKey = content.getKeyBefore(key);
                        if (!beforeKey) break;
                        const beforeLen = content.getBlockForKey(beforeKey).getLength();
                        if (e.shiftKey) {
                            const isBackward = key === selection.getFocusKey() && offset === selection.getFocusOffset() ? false : selection.getIsBackward();
                            setSelectionRange(selection, { anchorOffset: beforeLen, anchorKey: beforeKey, isBackward });
                        } else {
                            setSelectionCaret(selection, beforeLen, beforeKey);
                        }
                    } else {
                        if (e.shiftKey) {
                            const isBackward = key === selection.getFocusKey() && offset === selection.getFocusOffset() ? false : selection.getIsBackward();
                            setSelectionRange(selection, { anchorOffset: offset - 1, isBackward });
                        } else {
                            setSelectionCaret(selection, offset - 1, key);
                        }
                    }
                    break;

                case "ArrowDown":
                    if (offset === blockLen) {
                        const afterKey = content.getKeyAfter(key);
                        if (!afterKey) break;
                        if (e.shiftKey) {
                            const isBackward = key === selection.getFocusKey() && offset === selection.getFocusOffset() ? true : selection.getIsBackward();
                            setSelectionRange(selection, { anchorOffset: 0, anchorKey: afterKey, isBackward });
                        } else {
                            setSelectionCaret(selection, 0, afterKey);
                        }
                    } else {
                        if (e.shiftKey) {
                            const isBackward = key === selection.getFocusKey() && offset === selection.getFocusOffset() ? true : selection.getIsBackward();
                            setSelectionRange(selection, { anchorOffset: offset + 1, isBackward });
                        } else {
                            setSelectionCaret(selection, offset + 1, key);
                        }
                    }
                    break;

                case "ArrowRight":
                    if (offset > lw) {
                        e.shiftKey ? setSelectionRange(selection, { anchorOffset: offset - lw }) : setSelectionCaret(selection, offset - lw, key);
                    } else {
                        const beforeKey = content.getKeyBefore(key);
                        if (!beforeKey) {
                            if (e.shiftKey) {
                                setSelectionRange(selection, { anchorOffset: 0 });
                                break;
                            }
                            return "move-selection-to-start-of-block";
                        }
                        const beforeLen = content.getBlockForKey(beforeKey).getLength();
                        if (beforeLen === lw) {
                            setSelectionCaret(selection, offset, beforeKey);
                            break;
                        }
                        const beforeTargetLine = Math.floor(beforeLen / lw) * lw;
                        const beforeOffset = beforeTargetLine + Math.min(offset % lw, beforeLen % lw);
                        if (e.shiftKey) {
                            const isBackward = key === selection.getFocusKey() && offset - lw <= selection.getFocusOffset() ? false : selection.getIsBackward();
                            setSelectionRange(selection, { anchorOffset: beforeOffset, anchorKey: beforeKey, isBackward });
                        } else {
                            setSelectionCaret(selection, beforeOffset, beforeKey);
                        }
                    }
                    // if (scrollRef.current) {
                    //     scrollRef.current.scrollLeft += rfs * 1.5;
                    // }
                    break;

                case "ArrowLeft":
                    if (blockLen > lw) {
                        if (blockLen >= offset + lw) {
                            e.shiftKey ? setSelectionRange(selection, { anchorOffset: offset + lw }) : setSelectionCaret(selection, offset + lw, key);
                        } else {
                            const afterKey = content.getKeyAfter(key);
                            if (!afterKey || offset % lw > blockLen % lw) {
                                if (e.shiftKey) {
                                    setSelectionRange(selection, { anchorOffset: blockLen });
                                    break;
                                }
                                return "move-selection-to-end-of-block";
                            }
                            const afterLen = content.getBlockForKey(afterKey).getLength();
                            if (e.shiftKey) {
                                const isBackward =
                                    key === selection.getFocusKey() && offset + lw >= selection.getFocusOffset() ? true : selection.getIsBackward();
                                setSelectionRange(selection, { anchorOffset: Math.min(offset % lw, afterLen), anchorKey: afterKey, isBackward });
                            } else {
                                setSelectionCaret(selection, Math.min(offset % lw, afterLen), afterKey);
                            }
                        }
                    } else {
                        const afterKey = content.getKeyAfter(key);
                        if (!afterKey) {
                            if (e.shiftKey) {
                                setSelectionRange(selection, { anchorOffset: blockLen });
                                break;
                            }
                            return "move-selection-to-end-of-block";
                        }
                        const afterLen = content.getBlockForKey(afterKey).getLength();
                        const afterOffset = afterLen < offset ? afterLen : offset;
                        if (e.shiftKey) {
                            const isBackward = key === selection.getFocusKey() && offset + lw >= selection.getFocusOffset() ? true : selection.getIsBackward();
                            setSelectionRange(selection, { anchorOffset: afterOffset, anchorKey: afterKey, isBackward });
                        } else {
                            setSelectionCaret(selection, afterOffset, afterKey);
                        }
                    }
                    // if (scrollRef.current) {
                    //     scrollRef.current.scrollLeft -= rfs * 1.5;
                    // }
                    break;

                default:
                    break;
            }
            return null;
        }

        return getDefaultKeyBinding(e);
    };

    return (
        <Fragment>
            <MetaHeader title={`${saved ? "" : "*"}${title} - Clara Editor`} />
            <div ref={wrapperRef} className="min-h-screen flex-center">
                <Scrollbar className="max-w-full pb-4" containerRef={(ref) => (scrollRef.current = ref)} onWheel={handleWheel}>
                    <div style={{ height: `${eh}px` }}>
                        <div className="text-justify break-all" style={{ writingMode: "vertical-rl", fontSize: `${rfs}px` }}>
                            <Editor editorState={editorState} onChange={handleEditorChange} keyBindingFn={handleKeyBinding} />
                        </div>
                    </div>
                </Scrollbar>
                <div className="fixed bottom-0 w-full flex-center pb-1 bg-transparent">
                    <CharCount text={"asydfbauydbauydbauyyd"} />
                </div>
            </div>
        </Fragment>
    );
};

export default DraftEditor;
