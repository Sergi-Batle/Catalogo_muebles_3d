import { useEffect, useState, useCallback, useContext } from 'react';
import TableRow from './Rows/TableRow.jsx';
import ProductFormRow from './Rows/ProductFormRow.jsx';
import ConfirmDeleteRow from './Rows/ConfirmDeleteRow.jsx';
import ProductEditRow from './Rows/ProductEditRow.jsx';
import StaticContext from './../Context/StaticContext.jsx';
import './../../static/css/Tailwind.css';

function AdminPanel() {
    const [productosState, setProductosState] = useState([]);
    const [deleteRowId, setDeleteRowId] = useState(null);
    const [editRowId, setEditRowId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    // const [activeRow, setActiveRow] = useState(null);

    const context = useContext(StaticContext);

    const getCatalog = useCallback(async () => {
        const response = await fetch('/api/Catalog/productos');
        if (response.ok) {
            const data = await response.json();
            console.log("DATA ", data);
            setProductosState(data);
        }
    }, []);

    useEffect(() => {
        getCatalog();
        console.log("CATALOGO");
    }, [getCatalog]);

    const showForm = () => {
        context.activeRow = 'addProductForm';
        document.getElementById('addProductForm').classList.remove('hidden');
        document.getElementById('addProductForm').classList.add('active');
        document.querySelector('.blur-overlay').style.display = 'block';
        console.log(context.activeRow);
    };

    const handleBlurOverlayClick = () => {
        console.log("Blur overlay clicked");
        document.querySelector('.blur-overlay').style.display = 'none';

        // if (context.activeRow) {
        //     document.getElementById(context.activeRow).classList.remove('active');
        //     document.getElementById(context.activeRow).classList.add('hidden');
        //     console.log("Fila deseleccionada");

        // }

        if (document.getElementById('confirmDelete')) {
            setDeleteRowId(null);

        } else if (document.getElementById('editForm')) {
            setEditRowId(null);

        } else if (document.getElementById('addProductForm')) {
            document.getElementById('addProductForm').classList.remove('active');
            document.getElementById('addProductForm').classList.add('hidden');

        }

        context.activeRow = null;
        context.activeRowContent = null;
    };

    const handleDeleteClick = (id) => {
        setDeleteRowId(id);
        context.activeRow = id;
        console.log("Fila seleccionada: ", context.activeRow);
    };

    const handleEditClick = (id) => {
        setEditRowId(id);
        context.activeRow = id;
        console.log("Fila seleccionada: ", context.activeRow);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log('Archivo seleccionado:', file);
        }
    };

    return (
        <StaticContext.Provider value={{ activeRow: null }}>
            <main className="p-3">
                <div className="blur-overlay" onClick={handleBlurOverlayClick}></div>

                <button id="uploadProductBtn" onClick={showForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Añadir producto</span>
                </button>
                <table className="w-full">
                    <thead className='active'>
                        <tr className="h-10">
                            <th className="w-50">Objeto</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Alto</th>
                            <th>Ancho</th>
                            <th>Largo</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody id="tabla" className="text-center">
                        <ProductFormRow key={'#'} onFileChange={handleFileChange} />
                        {Array.isArray(productosState) && productosState.map((producto) => (
                            deleteRowId === producto.id ? (
                                <ConfirmDeleteRow key={producto.id} producto={producto} />
                            ) : editRowId === producto.id ? (
                                <ProductEditRow key={producto.id} producto={producto}  onFileChange={handleFileChange} />
                            ) : (
                                <TableRow producto={producto} key={producto.id} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
                            )
                        ))}

                    </tbody>
                </table>
            </main>
        </StaticContext.Provider>
    );
}

export default AdminPanel;