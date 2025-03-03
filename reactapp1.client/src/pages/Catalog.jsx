import { useEffect, useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import GridCatalog from "../components/Catalog/GridCatalog.jsx";
import '../static/css/Catalog.css';

function Catalog() {
    
    return (
        <div>
            <Header />
            <GridCatalog />
            <Footer />
        </div>
    );
}

export default Catalog;