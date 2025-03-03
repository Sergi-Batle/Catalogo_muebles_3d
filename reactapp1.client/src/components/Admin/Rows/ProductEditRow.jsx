import { useContext, useEffect, useCallback } from "react";
import UploadModelBtn from "../UploadModelBtn"

function ProductEditRow({ producto, onFileChange }) {
    useEffect(() => {
        document.querySelector('.blur-overlay').style.display = 'block';
    }, []);

    const editProduct = useCallback(async () => {
        try {
            const productoEditado = {
                "id": producto.id,
                "imagen": producto.imagen,
                "objeto": producto.objeto.replace("3dmodels\\", ""),
                "ancho": parseFloat(document.getElementById("anchoEdit").value),
                "largo": parseFloat(document.getElementById("largoEdit").value),
                "alto": parseFloat(document.getElementById("altoEdit").value),
                "precio": parseFloat(document.getElementById("precioEdit").value),
                "descripcion": document.getElementById("descripcionEdit").value,
                "nombre": document.getElementById("nombreEdit").value
            }
            const response = await fetch("/api/Catalog/editar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productoEditado)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const resultado = await response.json(); // Si el backend devuelve un booleano
            console.log(resultado)
        } catch (error) {
            console.error("Error al agregar producto:", error);
            return false;
        }
    }, []);


    return (
        <tr id="editForm" className="h-45 active">
            <td className="border h-full w-45 objectContainer relative">
                <UploadModelBtn onFileChange={onFileChange} />
            </td>
            <td className="border h-full w-45 text-center p-1">
                <input type="text" id="nombreEdit" className="border" defaultValue={producto.nombre} />
            </td>
            <td className="border h-full w-200 text-center p-1">
                <textarea id="descripcionEdit" className="border w-full h-30 py-3 px-2" defaultValue={producto.descripcion}></textarea>
            </td>
            <td className="border h-full w-20 text-center">
                <input type="text" id="precioEdit" className="border w-full" defaultValue={producto.precio} />

            </td>
            <td className="border h-full w-20 text-center">
                <input type="text" id="altoEdit" className="border w-full" defaultValue={producto.alto} />
            </td>
            <td className="border h-full w-20 text-center">
                <input type="text" id="anchoEdit" className="border w-full" defaultValue={producto.ancho} />
            </td>
            <td className="border h-full w-20 text-center">
                <input type="text" id="largoEdit" className="border w-full" defaultValue={producto.largo} />
            </td>
            <td className="border h-45 flex flex-col justify-between">
                <button onClick={editProduct} className="editBtn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded block mx-auto w-full h-1/2">Editar</button>
                <button className="deleteBtn bg-red-400 hover:bg-rose-300 text-gray-800 font-bold py-2 px-4 rounded block mx-auto w-full h-1/2">Eliminar</button>
            </td>
        </tr>
    )
}


export default ProductEditRow