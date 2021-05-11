import Link from "next/link";
import TitleEditForm from "components/organisms/Editor/TitleEditForm";

const Header = () => {
    return (
        <div className="fixed top-0 w-full h-20 flex-center shadow-sm editor-bg">
            <div className="w-11/12 sm:container flex justify-between items-center">
                <div className="w-9 h-9 flex justify-start items-center">
                    <Link href="/">
                        <a>
                            <img className="w-7 h-7" src="/images/icon-64x64.png" alt="Home" />
                        </a>
                    </Link>
                </div>
                <TitleEditForm />
                <div className="w-9"></div>
            </div>
        </div>
    );
};

export default Header;
