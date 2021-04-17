import { useRouter } from "next/router";

const Draft = () => {
    const router = useRouter();

    return <pre>{JSON.stringify(router, null, 4)}</pre>;
};

export default Draft;
