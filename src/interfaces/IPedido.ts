export interface IPedido {
    id: number;
    fecha: string;
    mesa: number;
    cantidad: number;
    precio: number;
    plato: {
      id: number;
      nombre_plato: string;
    };
    mesero: {
      id: number;
      nombre: string;
      sueldo_basico: number;
      nivel: string;
    };
}