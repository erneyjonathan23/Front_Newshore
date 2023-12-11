import { Users } from "../users/users";

export interface Bookings {
    id: number;
    usuario: number;
    estado: number;
    contactoEmergencia: number;
    tipoViaje: number;
    origen: string;
    destino: string;
    fechaInicio: Date;
    fechaFin: Date;
    numeroPersonas: number;
    precio: number;
    usuarioNavigation: Users;
    personaNavigation: any;
}