const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full shadow-2xl editor-bg text-gray-800">
            <div className="flex-center h-24 my-2">
                <div className="flex-center flex-col">
                    <button>↑</button>
                    <span>書体</span>
                    <button>↓</button>
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col">
                    <button>↑</button>
                    <span>大きさ</span>
                    <button>↓</button>
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col">
                    <button>↑</button>
                    <span>字数</span>
                    <button>↓</button>
                </div>
            </div>
        </div>
    );
};

export default Footer;
