import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useTitle, useIsTitleEdit } from "hooks";
import { renameDraft } from "lib/draft";

const specialChars = /\(|\)|,|-|\/|!|\\|\:|\?|\.|"|<|>|\|/g;
const slash = /\//g;
const spaces = /\s\s+/g;
const backSlashs = /\\\\+/g;
const sandwich = /(\s\\|\\\s)+(\s|\\)?/g;
const beginningEnd = /^(\s|\\)+|(\s|\\)+$/g;

const TitleEditForm = () => {
    const [title, setTitle] = useTitle();
    const [isEdit, setIsEdit] = useIsTitleEdit();
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
            // .replaceAll(spaces, "")
            .replaceAll(backSlashs, "")
            .replaceAll(sandwich, "")
            .replaceAll(beginningEnd, "");
        setLocalTitle(replaced);
    };

    const handleStoreTitleChange = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = localTitle.trim();
        if (title !== trimmed && trimmed !== "") {
            setTitle(trimmed);
            renameDraft(`${title}.txt`, `${trimmed}.txt`);
        } else {
            setLocalTitle(title);
        }
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
                        onBlur={() => setIsEdit(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Tab") e.preventDefault();
                        }}
                        style={{ minWidth: "10rem", maxWidth: "50rem", width: `${localTitle.length + 1}rem` }}
                    />
                </form>
            ) : (
                <span className="text-gray-900 whitespace-pre" onClick={() => setIsEdit(true)}>
                    {title}
                </span>
            )}
        </>
    );
};

export default TitleEditForm;
