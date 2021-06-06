import { useTheme } from "next-themes";
import { useFontType, useFontSize, useLineHeight, useLineWords, getDisabled } from "hooks";
import Chevron from "components/molecules/Button/Chevron";

const calcFooterPadding = (fontSize: number, fontType: "mincho" | "gothic") => {
    if (fontSize > 9 && fontType === "gothic") return "pr-9 pl-0.5";
    else if (fontType === "gothic") return "pr-7 pl-0.5";
    else if (fontSize > 9) return "pr-6";
    return "pr-4";
};

const Footer = () => {
    const { theme } = useTheme();

    const [ft, toggleFT] = useFontType();
    const [fs, incFS, decFS] = useFontSize();
    const [lh, incLH, decLH] = useLineHeight();
    const [lw, incLW, decLW] = useLineWords();
    const disabled = getDisabled();

    return (
        <div className={"fixed bottom-0 w-full shadow-2xl " + (theme === "dark" ? "clara-surface__dark" : "clara-bg__light")}>
            <div className={`flex-center h-20 my-2 select-none ${calcFooterPadding(fs, ft)}`}>
                <div className="flex-center flex-col group">
                    <div className="h-6"></div>
                    <span className="text-center opacity-75">{ft === "mincho" ? "明朝" : "ゴシック"}</span>
                    <button className="transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-75" onClick={toggleFT}>
                        <span className={"opacity-50 hover:opacity-100 " + (ft === "mincho" ? "gothic" : "mincho")}>
                            {ft === "mincho" ? "ゴシック" : "明朝"}
                        </span>
                    </button>
                </div>
                <span className={"opacity-25 " + (ft === "mincho" ? "mr-3" : "mx-3")}>・</span>
                <div className="flex-center flex-col group">
                    <Chevron type="inc" onClick={incFS} disabled={disabled.incFS} />
                    <span className="text-center opacity-75">大きさ {fs}</span>
                    <Chevron type="dec" onClick={decFS} disabled={disabled.decFS} />
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col group">
                    <Chevron type="inc" onClick={incLH} disabled={disabled.incLH} />
                    <span className="text-center opacity-75">行間 {lh + 1}</span>
                    <Chevron type="dec" onClick={decLH} disabled={disabled.decLH} />
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col group">
                    <Chevron type="inc" onClick={incLW} disabled={disabled.incLW} />
                    <span className="text-center opacity-75">字数 {lw}</span>
                    <Chevron type="dec" onClick={decLW} disabled={disabled.decLW} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
