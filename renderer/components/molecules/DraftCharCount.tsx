import { useDisplayCharCount } from "hooks";

const getTextCharCount = (text: string): number => {
    const regex = /(?:\r\n|\r|\n)/g;
    const cleanString = text.replace(regex, "").trim();
    return Array.from(cleanString).length;
};

const CharCount = ({ text }: { text: string }) => {
    const [display] = useDisplayCharCount();
    const count = getTextCharCount(text);

    return display ? <span className="text-gray-500">{count}</span> : null;
};

export default CharCount;
