import MetaHeader from "foundations/MetaHeader";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";
import { useFontType } from "hooks";

const Editor = () => {
    const [ft] = useFontType();

    return (
        <div className={ft}>
            <MetaHeader title="(タイトル) - Clara Editor" />
            <DraftEditor />
            <Frame />
        </div>
    );
};

export default Editor;
