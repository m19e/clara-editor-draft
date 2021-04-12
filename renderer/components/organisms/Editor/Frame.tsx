import Header from "components/organisms/Editor/Header";
import Footer from "components/organisms/Editor/Footer";

const Frame = () => {
    return (
        <div className="fixed z-10 transition-opacity duration-1000 ease-out opacity-0 hover:opacity-100">
            <Header />
            <Footer />
        </div>
    );
};

export default Frame;
