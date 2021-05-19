import Link from "next/link";
import TitleEditForm from "components/organisms/Editor/TitleEditForm";

const Header = () => {
    return (
        <div className="fixed top-0 w-full h-20 flex-center shadow-sm editor-bg">
            <div className="container flex-center">
                <div className="w-11/12 xl:max-w-4xl grid grid-cols-12 items-center">
                    <div className="col-span-1">
                        <Link href="/">
                            <a>
                                <img className="w-7 h-7" src="/images/icon-64x64.png" alt="Home" />
                            </a>
                        </Link>
                    </div>
                    <div className="col-span-10 flex-center inline-flex">
                        <TitleEditForm />
                    </div>
                    <div className="w-9"></div>
                </div>
            </div>
        </div>
    );
};

export default Header;
