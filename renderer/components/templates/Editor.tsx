import MetaHeader from "foundations/MetaHeader";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";

const Editor = () => (
    <div className="mincho">
        <MetaHeader title="(タイトル) - Clara Editor" />
        <DraftEditor />
        <Frame />
    </div>
);

export default Editor;
