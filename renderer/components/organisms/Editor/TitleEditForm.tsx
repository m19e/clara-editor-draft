import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AutosizeInput from "react-input-autosize";
import { useTitle, useIsTitleEdit, useDraftDir } from "hooks";
import { loadDraftList, renameDraft } from "lib/draft";

const specialChars = /\(|\)|,|-|\/|!|\\|\:|\?|\.|"|<|>|\|/g;
const slash = /\//g;
const spaces = /\s\s+/g;
const backSlashs = /\\\\+/g;
const sandwich = /(\s\\|\\\s)+(\s|\\)?/g;
const beginningEnd = /^(\s|\\)+|(\s|\\)+$/g;

const TitleEditForm = () => {
    const [draftDir] = useDraftDir();
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
            const list = loadDraftList(draftDir);
            const exist = list.map((d) => d.title).includes(`${trimmed}.txt`);
            if (exist) {
                setLocalTitle(title);
                return;
            }
            setTitle(trimmed);
            renameDraft(draftDir, `${title}.txt`, `${trimmed}.txt`);
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
                        inputClassName="px-2 text-center shadow-inner bg-transparent rounded outline-none focus:outline-none"
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
