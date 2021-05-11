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
                <div className="w-9 h-9">
                    <span onClick={() => {}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
