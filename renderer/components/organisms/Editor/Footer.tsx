import { useFontType, useFontSize, useLineWords } from "hooks";

const Footer = () => {
    const [ft, toggleFT] = useFontType();
    const [fs, incFS, decFS] = useFontSize();
    const [lw, incLW, decLW] = useLineWords();

    return (
        <div className="fixed bottom-0 w-full shadow-2xl editor-bg">
            <div className="flex-center h-20 my-2">
                <div className="flex-center flex-col group">
                    <div className="h-6"></div>
                    <span className="text-center opacity-75">{ft === "mincho" ? "明朝" : "ゴシック"}</span>
                    <button
                        className="outline-none focus:outline-none transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-75"
                        onClick={toggleFT}
                    >
                        <span className={"opacity-50 hover:opacity-100 " + (ft === "mincho" ? "gothic" : "mincho")}>
                            {ft === "mincho" ? "ゴシック" : "明朝"}
                        </span>
                    </button>
                </div>
                <span className={"opacity-25 " + (ft === "mincho" ? "mr-3" : "mx-3")}>・</span>
                <div className="flex-center flex-col group">
                    <button
                        className="outline-none focus:outline-none transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-75"
                        onClick={incFS}
                    >
                        <span className="flex-center opacity-50 hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#2A2E3B">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                />
                            </svg>
                        </span>
                    </button>
                    <span className="text-center opacity-75">大きさ{fs}</span>
                    <button
                        className="outline-none focus:outline-none transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-75"
                        onClick={decFS}
                    >
                        <span className="flex-center opacity-50 hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#2A2E3B">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col group">
                    <button
                        className="outline-none focus:outline-none transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-75"
                        onClick={incLW}
                    >
                        <span className="flex-center opacity-50 hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#2A2E3B">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                />
                            </svg>
                        </span>
                    </button>
                    <span className="text-center opacity-75">字数{lw}</span>
                    <button
                        className="outline-none focus:outline-none transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-75"
                        onClick={decLW}
                    >
                        <span className="flex-center opacity-50 hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#2A2E3B">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Footer;
