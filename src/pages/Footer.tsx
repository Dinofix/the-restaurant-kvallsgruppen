import "./../styles/_footer.scss";
import { FaSquareFacebook,FaSquareInstagram } from "react-icons/fa6";





export const Footer =()=>{

return(
<nav>
    <h4>Följ oss</h4>

    <ul>
        <span>Facebook</span>
        <FaSquareFacebook size={20}/>

    <span>Instagram</span>
        <FaSquareInstagram size={20}/>
    </ul>

 

</nav>

)
}