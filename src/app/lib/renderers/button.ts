export interface IButton {
  type: 'button' | 'submit';
  text: string;
  disabled: boolean;
  onClick: Function;
  extraClasses?: string[];
}
