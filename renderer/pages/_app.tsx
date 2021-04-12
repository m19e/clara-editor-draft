import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => (
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
);

export default App;
