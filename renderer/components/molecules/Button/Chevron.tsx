type Props = {
    type: "inc" | "dec";
    onClick: () => void;
    disabled: boolean;
};

const Chevron = ({ type, onClick, disabled }: Props) => (
    <button className="transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-75" onClick={onClick} disabled={disabled}>
        <span className={"flex-center " + (disabled ? "opacity-25" : "opacity-50 hover:opacity-100")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={
                        type === "inc"
                            ? "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            : "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    }
                />
            </svg>
        </span>
    </button>
);

export default Chevron;
