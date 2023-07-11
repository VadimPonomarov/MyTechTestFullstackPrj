export interface IDialogActionsButton {
    name: string;
    onClick: () => {} | void;
    autofocus?: boolean;
    variant?: string;
}