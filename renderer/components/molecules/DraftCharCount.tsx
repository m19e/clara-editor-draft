const getTextCharCount = (text: string): number => {
    const regex = /(?:\r\n|\r|\n)/g;
    const cleanString = text.replace(regex, "").trim();
    return Array.from(cleanString).length;
};

const DraftCharCount = ({ text }: { text: string }) => {
    return <span className="text-gray-500">{getTextCharCount(text)}</span>;
};

export default DraftCharCount;
