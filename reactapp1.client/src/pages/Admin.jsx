import { useEffect, useState } from 'react';
import Header from "../components/header.jsx";
import AdminPanel from "..//components/Admin/AdminPanel.jsx"
import Footer from "../components/footer.jsx";

function Admin() {
    
    return (
        <div>
            <Header />
            <AdminPanel />
            <Footer />
        </div>
    );
}

export default Admin;