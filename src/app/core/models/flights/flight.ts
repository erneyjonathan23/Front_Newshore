import { Transport } from "./transport";

export interface Flight {
    origin: string;
    destination: string;
    price: number;
    transport: Transport;
}
