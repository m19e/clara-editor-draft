import { useTheme } from "next-themes";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AutosizeInput from "react-input-autosize";
import { useTitle, useIsTitleEdit } from "hooks";
import { renameDraft } from "lib/draft";

const specialChars = /\(|\)|,|-|\/|!|\\|\:|\?|\.|"|<|>|\|/g;
const slash = /\//g;
const spaces = /\s\s+/g;
const backSlashs = /\\\\+/g;
const sandwich = /(\s\\|\\\s)+(\s|\\)?/g;
const beginningEnd = /^(\s|\\)+|(\s|\\)+$/g;

const TitleEditForm = () => {
    const { theme } = useTheme();
    const [title, setTitle] = useTitle();
    const [isEdit, setIsEdit] = useIsTitleEdit();
    const [localTitle, setLocalTitle] = useState("");

    useEffect(() => {
        setLocalTitle(title);
    }, [title]);

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
                    <AutosizeInput
                        type="text"
                        autoFocus
                        value={localTitle}
                        onChange={handleLocalTitleChange}
                        onBlur={() => setIsEdit(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Tab") e.preventDefault();
                        }}
                        inputClassName={`px-2 text-center shadow-inner rounded outline-none focus:outline-none ${
                            theme === "dark" ? "clara-text__dark clara-surface__dark" : "clara-text__light"
                        }`}
                        inputStyle={{ minWidth: "10rem", maxWidth: "36rem" }}
                    />
                </form>
            ) : (
                <span className="whitespace-pre" onClick={() => setIsEdit(true)}>
                    {title}
                </span>
            )}
        </>
    );
};

export default TitleEditForm;
