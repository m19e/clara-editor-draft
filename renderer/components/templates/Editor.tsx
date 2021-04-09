import MetaHeader from "foundations/MetaHeader";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";

const Editor = () => (
    <>
        <MetaHeader title="(タイトル) - Clara Editor" />
        <DraftEditor />
        <Frame />
    </>
);

export default Editor;
