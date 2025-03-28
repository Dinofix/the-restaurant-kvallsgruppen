import { NavLink } from "react-router-dom"
// import "../styles/_navigation.scss"

export const Navigation =()=>{


return(
<nav>

    <ul>
        <li><button><NavLink to= "/">Hem</NavLink></button></li>
        <li><button><NavLink to= "/Booking">Boka bord</NavLink></button></li>
        <li><button><NavLink to= "/Contact">Kontakt</NavLink></button></li>
        <li><button><NavLink to="/Meny">Meny</NavLink></button></li>

    
    </ul>

</nav>

)
}