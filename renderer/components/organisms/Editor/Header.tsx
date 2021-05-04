import Link from "next/link";
import TitleEditForm from "components/organisms/Editor/TitleEditForm";

const Header = () => {
    return (
        <div className="fixed top-0 w-full h-24 flex-center shadow-sm editor-bg">
            <div className="w-11/12 sm:container flex justify-between items-center">
                <div className="w-9 h-9 flex justify-start items-center">
                    <Link href="/">
                        <a>
                            <img className="w-7 h-7" src="/images/icon-64x64.png" alt="Clara" />
                        </a>
                    </Link>
                </div>
                <TitleEditForm />
                {/* <div className="w-9 h-9 flex justify-center items-center transition-colors text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                    </svg>
                </div> */}
                <span className="w-9"></span>
            </div>
        </div>
    );
};

export default Header;
