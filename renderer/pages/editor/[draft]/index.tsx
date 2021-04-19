import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { readDraft } from "lib/draft";

const Draft = () => {
    const router = useRouter();
    const [text, setText] = useState("");

    useEffect(() => {
        const draft = router.query.draft;
        if (router.route !== router.asPath && typeof draft === "string") {
            const data = readDraft(draft);
            setText(data);
        }
    }, [router]);

    return <pre>{text}</pre>;
};

export default Draft;
