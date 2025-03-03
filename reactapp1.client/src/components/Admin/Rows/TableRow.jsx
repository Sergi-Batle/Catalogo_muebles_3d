import { useEffect, useContext } from 'react';
import ModelContainer from '../../3d/Modelcontainer.jsx';
import StaticContext from '../../Context/StaticContext.jsx';
import ConfirmDeleteRow from './../Rows/ConfirmDeleteRow.jsx';


import Test from '../../3d/Test'

function TableRow({ producto, onDeleteClick, onEditClick }) {
    const context = useContext(StaticContext);

    const handleEditClick = () => {
        // Lógica para editar el producto
        // console.log('Editar', producto);
        onEditClick(producto.id)
    };

    const handleDeleteClick = () => {
        // Lógica para eliminar el producto
        // console.log('Eliminar', producto);
        onDeleteClick(producto.id);
        
    };


    return (
      
            <tr id={producto.id} className="h-45 mb-4">
                <td className="w-54 h-45 objectContainer">
                    {/* <ModelContainer Modelo={producto.objeto} /> */}
                    <Test ruta={producto.objeto} />
                </td>

                <td className="h-full w-45 text-center p-1">{producto.nombre}</td>


                <td className="h-full w-200 text-center p-1">{producto.descripcion}</td>
                <td className="h-full w-20 text-center">{producto.precio}</td>
                <td className="h-full w-20 text-center">{producto.alto}</td>
                <td className="h-full w-20 text-center">{producto.ancho}</td>
                <td className="h-full w-20 text-center">{producto.largo}</td>
                <td id={`action-cell-${producto.id}`} className="h-45 flex flex-col justify-between">
                    <button onClick={handleEditClick} className="editBtn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded block mx-auto w-full h-1/2">Editar</button>
                    <button onClick={handleDeleteClick} className="deleteBtn bg-red-400 hover:bg-rose-300 text-gray-800 font-bold py-2 px-4 rounded block mx-auto w-full h-1/2">Eliminar</button>
                </td>
            </tr>
       

    );
}

export default TableRow;