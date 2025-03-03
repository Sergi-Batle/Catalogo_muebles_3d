import '../static/css/Catalog.css';
import '../static/css/Tailwind.css';

function Header() {

    return (
        <header className='flex items-center justify-start pl-10'>
            <img className='w-16 h-16 mr-4' src="src/static/img/11-Furnicom.png" alt="logo" />
            <h1 className='text-xl'>Administration</h1>
        </header>
    );
}

export default Header;