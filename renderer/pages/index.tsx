import { useTheme } from "next-themes";
import Home from "components/templates/Home";

const Index = () => {
    const { theme } = useTheme();

    if (typeof theme === "string") {
        return <Home />;
    } else {
        return null;
    }
};

export default Index;
