import { remote, MessageBoxOptions } from "electron";

type MessageBoxTypeProp = "none" | "info" | "error" | "question" | "warning";

export const openConfirmableMessageBox = (type: MessageBoxTypeProp, message: string): boolean => {
    const win = remote.getCurrentWindow();
    const options: MessageBoxOptions = {
        type,
        message,
        buttons: ["No", "Yes"],
        cancelId: 0,
    };
    const resId = remote.dialog.showMessageBoxSync(win, options);
    const cancel = resId === 0;
    return cancel;
};
