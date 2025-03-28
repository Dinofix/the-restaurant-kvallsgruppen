
import { StyledButton } from "../Style/StyledButton"
import { useState } from "react"

export interface ITimeProps{
  onTimeString: (newTime: string)=> void;
}

export const SetTime =(props: ITimeProps)=>{
   const [time, setTime] =useState("");
   const [clickedButton, setClickedButton] = useState<string | null>(null);
    
const handleButtonClick =(value: string)=>{
setTime(value);
setClickedButton(value);
props.onTimeString(value);
console.log(time)
}

    return(
        <>
        <div className="time">
<h2>Välj tid:</h2>
<div className="buttonTime">
                <div className= "earlyDinner"><StyledButton onClick={()=> handleButtonClick("18.00")}
                className={clickedButton === "18.00" ? "active" : ""}>18.00</StyledButton></div>

         
      
               <div className= "lateDinner"><StyledButton onClick={()=> handleButtonClick("21.00")}
               className={clickedButton === "21.00" ? "active" : ""}>21.00</StyledButton></div>
       </div>
                
        </div>
      </>
    )
}




