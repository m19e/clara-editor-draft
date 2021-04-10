const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full shadow-2xl editor-bg text-gray-800">
            <div className="flex-center h-24 my-2">
                <div className="flex-center flex-col">
                    <button>↑</button>
                    <div className="animate-pulse h-3 w-14 mt-1.5 mb-2 mx-0.5 bg-gray-300 rounded-sm"></div>
                    <button>↓</button>
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col">
                    <button>↑</button>
                    <div className="animate-pulse h-3 w-14 mt-1.5 mb-2 mx-0.5 bg-gray-300 rounded-sm"></div>
                    <button>↓</button>
                </div>
                <span className="opacity-25 mx-3">・</span>
                <div className="flex-center flex-col">
                    <button>↑</button>
                    <div className="animate-pulse h-3 w-14 mt-1.5 mb-2 mx-0.5 bg-gray-300 rounded-sm"></div>
                    <button>↓</button>
                </div>
            </div>
        </div>
    );
};

export default Footer;
