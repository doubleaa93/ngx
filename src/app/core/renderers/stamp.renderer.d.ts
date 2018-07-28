import { HeaderSize } from '../models/schema';
export interface IStamp {
    text: string;
    classes?: string[];
    headerSize?: HeaderSize;
}
export interface StampRenderer {
    stamp: IStamp;
}
