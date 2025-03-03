import { useContext, useEffect, useCallback } from "react";
import ModelContainer from "../../3d/Modelcontainer";
import StaticContext from "../../Context/StaticContext";

function ConfirmDeleteRow({ producto }) {
    const context = useContext(StaticContext);
    useEffect(() => {
        document.querySelector('.blur-overlay').style.display = 'block';
    }, []);

    const confirmDelete = useCallback(async () => {
        try {
            const productoEditado = {
                "id": producto.id,
                "imagen": producto.imagen,
                "objeto": producto.objeto,
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
        <tr id="confirmDelete" className="h-45 active">
            <td className="w-54 h-45 objectContainer">
                {/* <ModelContainer Modelo={producto.objeto} /> */}
                <ModelContainer Modelo={producto.objeto} />
            </td>
            <td colSpan="7">
                <div id="confirmDelete" className="flex">
                    <p className="m-auto">Se eliminará {producto.nombre}</p>
                    <button onClick={confirmDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mr-3 rounded inline-flex items-center">
                        <span className="flex">Eliminar<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg></span>
                    </button>
                </div>
            </td>


        </tr>
    );
}

export default ConfirmDeleteRow;