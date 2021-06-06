import { useIsTitleEdit } from "hooks";
import Header from "components/organisms/Editor/Header";
import Footer from "components/organisms/Editor/Footer";

const Frame = () => {
    const [isTitleEdit] = useIsTitleEdit();

    return (
        <div className={"fixed z-10 transition-opacity duration-500 delay-150 ease-out " + (isTitleEdit ? "" : "opacity-0 hover:opacity-100")}>
            <Header />
            <Footer />
        </div>
    );
};

export default Frame;
