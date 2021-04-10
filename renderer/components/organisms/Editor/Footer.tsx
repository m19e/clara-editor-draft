import { useState } from "react";

const Footer = () => {
    const [fontSize, setFontSize] = useState(1);
    const [lineWords, setLineWords] = useState(1);

    const incFS = () => setFontSize((fs) => fs + 1);
    const decFS = () => setFontSize((fs) => fs - 1);
    const incLW = () => setLineWords((lw) => lw + 1);
    const decLW = () => setLineWords((lw) => lw - 1);

    return (
        <div className="fixed bottom-0 w-full shadow-2xl editor-bg text-gray-800">
            <div className="flex-center h-24 my-2">
                <div className="flex-center flex-col max-w-min">
                    <button>↑</button>
                    <span className="w-16 text-center">書体</span>
                    <button>↓</button>
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col max-w-min">
                    <button onClick={incFS}>↑</button>
                    <span className="w-16 text-center">大きさ{fontSize}</span>
                    <button onClick={decFS}>↓</button>
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col max-w-min">
                    <button onClick={incLW}>↑</button>
                    <span className="w-16 text-center">字数{lineWords}</span>
                    <button onClick={decLW}>↓</button>
                </div>
            </div>
        </div>
    );
};

export default Footer;
