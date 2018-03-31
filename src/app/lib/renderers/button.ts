export interface IButton {
  type: 'button' | 'submit';
  text: string;
  disabled: boolean;
  onClick: (e: any) => void;
  extraClasses?: string[];
}
