import MetaHeader from "foundations/MetaHeader";
import DraftEditor from "components/organisms/DraftEditor";
import Frame from "components/organisms/Editor/Frame";
import { useFontType } from "hooks";

const Editor = () => {
    const [ft] = useFontType();

    return (
        <div className={ft + " text-black editor-bg"}>
            <MetaHeader title="(タイトル) - Clara Editor" />
            <DraftEditor text="" />
            <Frame />
        </div>
    );
};

export default Editor;
