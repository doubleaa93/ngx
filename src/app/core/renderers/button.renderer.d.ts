export interface IButton {
    type: 'button' | 'submit';
    text: string;
    disabled: boolean;
    onClick: (e: any) => void;
    class?: string;
    extraClasses?: string[];
}
export interface ButtonRenderer {
    button: IButton;
}
