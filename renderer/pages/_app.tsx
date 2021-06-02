import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider attribute="class">
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    </ThemeProvider>
);

export default App;
