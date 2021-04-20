import Link from "next/link";

const Header = () => {
    return (
        <div className="fixed top-0 w-full h-24 flex-center shadow-sm editor-bg">
            <div className="container flex justify-between items-center">
                <div className="w-9 h-9 flex justify-center items-center transition-colors text-gray-600 hover:text-gray-900">
                    <Link href="/">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className="animate-pulse h-3 w-14 mt-1.5 mb-2 mx-0.5 bg-gray-300 rounded-sm"></div>
                <div className="w-9 h-9 flex justify-center items-center transition-colors text-gray-600 hover:text-gray-900" onClick={() => {}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Header;
