import { useTheme } from "next-themes";
import Menu from "foundations/Menu";
import MetaHeader from "foundations/MetaHeader";
import Home from "components/templates/Home";

const Index = () => {
    const { theme } = useTheme();

    return (
        <>
            <Menu page="home" />
            <MetaHeader title="一覧 - Clara Editor" />
            {typeof theme === "string" ? <Home /> : null}
        </>
    );
};

export default Index;
