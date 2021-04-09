const Header = () => {
    return (
        <div className="fixed top-0 w-full h-24 flex-center shadow-sm editor-bg">
            <div className="container flex justify-between items-center">
                <div className="animate-pulse h-3 w-14 mt-1.5 mb-2 mx-0.5 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse h-3 w-14 mt-1.5 mb-2 mx-0.5 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse h-3 w-14 mt-1.5 mb-2 mx-0.5 bg-gray-300 rounded-sm"></div>
            </div>
        </div>
    );
};

export default Header;
