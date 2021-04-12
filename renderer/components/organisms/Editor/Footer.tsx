import { useFontType, useFontSize, useLineWords, useDisabled } from "hooks";
import Chevron from "components/molecules/Button/Chevron";

const Footer = () => {
    const [ft, toggleFT] = useFontType();
    const [fs, incFS, decFS] = useFontSize();
    const [lw, incLW, decLW] = useLineWords();
    const disabled = useDisabled();

    return (
        <div className="fixed bottom-0 w-full shadow-2xl editor-bg">
            <div className="flex-center h-20 my-2 select-none">
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
                    <Chevron type="inc" onClick={incFS} disabled={disabled.incFS} />
                    <span className="text-center opacity-75">大きさ{fs}</span>
                    <Chevron type="dec" onClick={decFS} disabled={disabled.decFS} />
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col group">
                    <Chevron type="inc" onClick={incLW} disabled={disabled.incLW} />
                    <span className="text-center opacity-75">字数{lw}</span>
                    <Chevron type="dec" onClick={decLW} disabled={disabled.decLW} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
