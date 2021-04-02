import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const DraftEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    return (
        <div className="min-h-screen w-full flex justify-center items-center" style={{ writingMode: "vertical-rl" }}>
            <Editor editorState={editorState} onChange={setEditorState} />
        </div>
    );
};

export default DraftEditor;
