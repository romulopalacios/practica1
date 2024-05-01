import { IMesero } from "./interfaces/IMesero";
import { IPedido } from "./interfaces/IPedido";
import { IPlato } from "./interfaces/IPlato";
import { IResponse } from "./interfaces/IResponse";
//-------OBJETOS-------
const plato: IPlato[] = [
    { id:1, nombre_plato:"Salchipapa"},
    { id:2, nombre_plato:"Hamburguesa"},
    { id:3, nombre_plato:"Tacos"}
]

const mesero: IMesero[] = [
    {id:1, nombre:"Romulo Palacios", sueldo_basico: 460, nivel:"Basico"},
    {id:2, nombre:"Carolina Ayala", sueldo_basico: 550, nivel:"Experto"},
    {id:3, nombre:"Silvia Mieles", sueldo_basico: 550, nivel:"Experto"}
]

const pedidos: IPedido[] = [
    {
        id:1, fecha:"30/04/2024", mesa:1, cantidad:2, precio:35,
        plato:{ id:1, nombre_plato:"Salchipapa"},
        mesero:{id:1, nombre:"Romulo Palacios", sueldo_basico: 460, nivel:"Basico"}
    },

    {
        id:2, fecha:"30/04/2024", mesa:2, cantidad:1, precio:7,
        plato:{ id:2, nombre_plato:"Hamburguesa"},
        mesero:{id:2, nombre:"Carolina Ayala", sueldo_basico: 550, nivel:"Experto"},
    },

    {
        id:3, fecha:"30/04/2024", mesa:3, cantidad:4, precio:49,
        plato:{ id:3, nombre_plato:"Tacos"},
        mesero:{id:3, nombre:"Silvia Mieles", sueldo_basico: 550, nivel:"Experto"}
    }
]

//----FUNCION ELIMINAR ELEMENTO POR ID----
function eliminarElementoPorID(arreglo: any[], id: number): void {
    const index = arreglo.findIndex((element) => element.id === id);
    if (index !== -1) {
        arreglo.splice(index, 1);
    }
}

//----EJEMPLO----
eliminarElementoPorID2(pedidos, 2, (deletedElement) => {
    console.log('Deleted Element:', deletedElement);
});

//----CALLBACK----
function eliminarElementoPorID2(arreglo: any[], id: number, callback: (element: any) => void): void {
    const index = arreglo.findIndex((element) => element.id === id);
    if (index !== -1) {
        const deletedElement = arreglo.splice(index, 1)[0];
        callback(deletedElement);
    }
}
//----EJEMPLO CALLBACK----
eliminarElementoPorID2(pedidos, 2, (deletedElement) => {
    console.log('Deleted Element:', deletedElement);
});
// ---SERVICIO REST---
interface RestResponse {
    data: (IMesero | IPedido | IPlato)[];
  }

  async function fetchData(url: string): Promise<RestResponse | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data as RestResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  
  fetchData(apiUrl).then(response => {
    if (response) {
      console.log("Data from REST service:", response);
    } else {
      console.log("Failed to fetch data from REST service.");
    }
  });