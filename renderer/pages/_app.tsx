import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { remote } from "electron";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
    const remoteMenu = remote.Menu;
    const localMenu = remoteMenu.buildFromTemplate([
        {
            label: "設定",
            submenu: [
                {
                    id: "char-count-display",
                    label: "文字数を表示する",
                    type: "checkbox",
                    accelerator: "CmdOrCtrl+T",
                    checked: true,
                    click: (self, focusedWin) => {
                        if (focusedWin) {
                            // setDisplayCharCount(self.checked)
                        }
                    },
                },
            ],
        },
    ]);

    remoteMenu.setApplicationMenu(localMenu);

    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    );
};

export default App;
