import Link from "next/link";
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useTitle } from "hooks";
import { renameDraft } from "lib/draft";

const Header = () => {
    return (
        <div className="fixed top-0 w-full h-24 flex-center shadow-sm editor-bg">
            <div className="container flex justify-between items-center">
                <div className="w-9 h-9 flex justify-center items-center transition-colors text-gray-600 hover:text-gray-900">
                    <Link href="/">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </a>
                    </Link>
                </div>
                <TitleEditForm />
                <div className="w-9 h-9 flex justify-center items-center transition-colors text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const specialChars = /\(|\)|,|-|\/|!|\\|\:|\?|\.|"|<|>|\|/g;
const slash = /\//g;
const spaces = /\s\s+/g;
const backSlashs = /\\\\+/g;
const sandwich = /(\s\\|\\\s)+(\s|\\)?/g;
const beginningEnd = /^(\s|\\)+|(\s|\\)+$/g;

const TitleEditForm = () => {
    const [title, setTitle] = useTitle();
    const [isEdit, setIsEdit] = useState(false);
    const [localTitle, setLocalTitle] = useState("");
    const editTitleRef = useRef(null);

    useEffect(() => {
        setLocalTitle(title);
    }, [title]);

    useEffect(() => {
        if (isEdit) {
            editTitleRef.current.focus();
        }
    }, [isEdit]);

    const handleLocalTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const replaced = value
            .replaceAll(specialChars, "")
            .replaceAll(slash, "")
            .replaceAll(spaces, "")
            .replaceAll(backSlashs, "")
            .replaceAll(sandwich, "")
            .replaceAll(beginningEnd, "");
        setLocalTitle(replaced);
    };

    const handleStoreTitleChange = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        renameDraft(`${title}.txt`, `${localTitle}.txt`);
        setTitle(localTitle);
        setIsEdit(false);
    };

    return (
        <>
            {isEdit ? (
                <form onSubmit={handleStoreTitleChange}>
                    <input
                        className="text-gray-900 mx-2 text-center shadow-inner editor-bg rounded outline-none focus:outline-none"
                        type="text"
                        value={localTitle}
                        onChange={handleLocalTitleChange}
                        ref={editTitleRef}
                        style={{ minWidth: "10rem", maxWidth: "50rem", width: `${localTitle.length + 1}rem` }}
                    />
                </form>
            ) : (
                <span onClick={() => setIsEdit(true)}>{title}</span>
            )}
        </>
    );
};

export default Header;
