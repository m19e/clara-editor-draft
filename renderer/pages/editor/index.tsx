import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const DraftEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    return (
        <div className="min-h-screen w-full flex justify-center items-center" style={{ writingMode: "vertical-rl" }}>
            <div className="h-3/4">
                <div>
                    <Editor editorState={editorState} onChange={setEditorState} />
                </div>
            </div>
        </div>
    );
};

export default DraftEditor;
