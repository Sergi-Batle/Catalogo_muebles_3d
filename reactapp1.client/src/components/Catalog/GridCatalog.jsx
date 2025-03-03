import React, { useEffect, useState, useCallback } from 'react';
import Card from "./Card.jsx";
import '../../static/css/Catalog.css';

const GridCatalog = () => {
    console.log("CATALOGO")
    const [productosState, setProductosState] = useState([]);

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
    }, [getCatalog]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-50 gap-y-10 w-fit m-auto'>
            {Array.isArray(productosState) && productosState.map((producto) => (
                <Card 
                    key={producto.id} 
                    Nombre={producto.nombre} 
                    Descripcion={producto.descripcion} 
                    Precio={producto.precio} 
                    RutaModelo={producto.objeto}
                />
            ))}
        </div>
    );
}


export default GridCatalog;