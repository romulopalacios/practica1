import { IMesero } from "./interfaces/IMesero";
import { IPedido } from "./interfaces/IPedido";
import { IPlato } from "./interfaces/IPlato";

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

//----FUNCIONES ELIMINAR ELEMENTO POR ID----
function eliminarElementoPorID(arreglo: any[], id: number): void {
    const index = arreglo.findIndex((element) => element.id === id);
    if (index !== -1) {
        arreglo.splice(index, 1);
    }
}

//----CALLBACK----
function eliminarElementoPorID(arreglo: any[], id: number, callback: (element: any) => void): void {
    const index = arreglo.findIndex((element) => element.id === id);
    if (index !== -1) {
        const deletedElement = arreglo.splice(index, 1)[0];
        callback(deletedElement);
    }
}

eliminarElementoPorID(pedidos, 2, (deletedElement) => {
    console.log("Elemento eliminado:", deletedElement);
});

//----FETCH DATA FROM REST API----
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then((data: IResponse) => {
        //----VALIDATE RESPONSE AGAINST INTERFACE----
        if (validateResponse(data)) {
            //----PROCESS DATA----
            processData(data);
        } else {
            console.log('Invalid response');
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });

//----INTERFACE FOR RESPONSE----
interface IResponse {
    //Define the properties of the response here
}

//----VALIDATE RESPONSE AGAINST INTERFACE----
function validateResponse(response: any): response is IResponse {
    // Implement the validation logic here
    return true; // Return true if the response is valid, false otherwise
}

//----PROCESS DATA----
function processData(data: IResponse) {
    // Implement the logic to process the data here
}