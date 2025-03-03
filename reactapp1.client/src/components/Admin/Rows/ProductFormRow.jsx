import { useCallback } from "react";
import UploadModelBtn from "../UploadModelBtn";

function ProductFormRow({ onFileChange }) {

    const addProduct = useCallback(async () => {
        try {
            const formData = new FormData();
            formData.append("imagen", document.getElementById("dropzone-file").files[0]);
            formData.append("objeto", document.getElementById("dropzone-file").files[0].name);
            formData.append("nombre", document.getElementById("productName").value);
            formData.append("descripcion", document.getElementById("productDescripcion").value);
            formData.append("precio", parseFloat(document.getElementById("productPrecio").value));
            formData.append("alto", parseFloat(document.getElementById("productAlto").value));
            formData.append("ancho", parseFloat(document.getElementById("productAncho").value));
            formData.append("largo", parseFloat(document.getElementById("productLargo").value));

            const response = await fetch("/api/Catalog/agregar", {
                method: "POST",
                body: formData
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
        <tr id="addProductForm" className="h-45 active hidden">
            <td className="border h-45 w-45 objectContainer">
                <UploadModelBtn onFileChange={onFileChange} />
            </td>
            <td className="border h-full w-45 text-center p-1"><input type="text" id="productName" className="border w-full" />
            </td>
            <td className="border h-full w-200 text-center p-1"><textarea name="" id="productDescripcion" className="w-full h-30 px-3 py-1"></textarea></td>
            <td className="border h-full w-20 text-center"><input type="number" id="productPrecio" className="border w-full" />
            </td>
            <td className="border h-full w-20 text-center"><input type="number" id="productAlto" className="border w-full" />
            </td>
            <td className="border h-full w-20 text-center"><input type="number" id="productAncho" className="border w-full" />
            </td>
            <td className="border h-full w-20 text-center"><input type="number" id="productLargo" className="border w-full" />
            </td>
            <td className="border h-45 flex flex-col justify-between">
                <button onClick={addProduct} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center justify-center h-1/2 ">
                    <span>Añadir</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-from-line">
                        <path d="m18 9-6-6-6 6"></path>
                        <path d="M12 3v14"></path>
                        <path d="M5 21h14"></path>
                    </svg>

                </button>

                <button className="deleteBtn bg-red-400 hover:bg-rose-300 text-gray-800 font-bold py-2 px-4 rounded block mx-auto w-full h-1/2">Cancelar</button>
            </td>
        </tr>
    );
}

export default ProductFormRow;