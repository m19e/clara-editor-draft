import { useTheme } from "next-themes";
import Link from "next/link";
import TitleEditForm from "components/organisms/Editor/TitleEditForm";

const Header = () => {
    const { theme } = useTheme();

    return (
        <div className={"fixed top-0 w-full h-20 flex-center shadow-sm select-none " + (theme === "dark" ? "clara-surface__dark" : "clara-bg__light")}>
            <div className="container flex-center">
                <div className="w-11/12 xl:max-w-4xl grid grid-cols-12 items-center">
                    <div className="col-span-1 inline-flex justify-end">
                        <Link href="/">
                            <a>
                                <img className="w-7 h-7" src="/images/icon-64x64.png" alt="Home" />
                            </a>
                        </Link>
                    </div>
                    <div className="col-span-10 flex-center">
                        <TitleEditForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
