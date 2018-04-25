export interface IStamp {
  text: string;
  classes?: string[];
  headerSize?: 1|2|3|4|5|6;
}

export interface StampRenderer {
  stamp: IStamp;
}
