import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { readDraft } from "lib/draft";

const Draft = () => {
    const router = useRouter();
    const [text, setText] = useState("");

    useEffect(() => {
        if (router.route !== router.asPath && typeof router.query.draft === "string") {
            const data = readDraft(router.query.draft);
            setText(data);
        }
        return () => {};
    }, [router]);

    return <pre>{text}</pre>;
};

export default Draft;
