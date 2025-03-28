import { StyledButtonSubmit } from "../Style/StyledButton"
import { useNavigate } from 'react-router-dom';

export const BookingFinished =()=>{
    const navigate=useNavigate();

const handleClick =()=>{
navigate("/");

}
const handleClick2 =()=>{
navigate("/Meny");

}

    return(
        <div className="Finisched">
        <h2>Din bokning är genomförd!</h2>
        <p>Ett bekräftelsemejl är skickat</p>
        <h3>Välkomna!</h3>
        <div className="bookingCompleted">
        <StyledButtonSubmit onClick={handleClick}>Tillbaka till förstasidan</StyledButtonSubmit>
        <StyledButtonSubmit onClick={handleClick2}>Till menyn</StyledButtonSubmit>
        </div></div>
    )
}