import { Routes } from "@angular/router";
import { MenuProperties } from "./menu-properties";

export interface Response {
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
    message: string;
    erros: any;
    data: any;
    totalItems: number;
}

export interface Flights {
    departureStation: string;
    arrivalStation: string;
    flightCarrier: string;
    flightNumber: string;
    price: number;
}

export interface AuthenticationResponse {
    email: string;
    id: number;
    isVerified: boolean;
    jwToken: string;
    nivel: number;
    role: number;
    userName: string;
    nombres: string;
    apellidos: string;
    roleName: string;
};

