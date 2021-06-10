import { remote, MessageBoxOptions } from "electron";

type MessageBoxTypeProp = "none" | "info" | "error" | "question" | "warning";

export const openMessageBox = (type: MessageBoxTypeProp, message: string, confirm: string): number => {
    const win = remote.getCurrentWindow();
    const options: MessageBoxOptions = {
        message,
        buttons: ["キャンセル", confirm],
        cancelId: 0,
    };
    return remote.dialog.showMessageBoxSync(win, options);
};
