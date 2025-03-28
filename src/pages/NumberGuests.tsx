
import { StyledButton } from "../Style/StyledButton"
import {  useState } from "react"

export interface IGuestProps{
    onGuestsString:  (newGuests: number)=> void;
}

export const Guests =(props: IGuestProps)=> {
    const [guests, setGuests] = useState<number>();
    const [clickedButton, setClickedButton] = useState<number | null>(null);
 

const handleButtonClick =(value: number) => {
    setGuests(value);
    setClickedButton(value);
    props.onGuestsString(value);    
};
 console.log(guests); 

 return(
    <>
    
    <div className="guests">
        <h2>Välj antal gäster:</h2>
        <div className="antalPersoner">
            {[1, 2, 3, 4, 5, 6].map((value) => (
                <StyledButton
                  key={value}
                 onClick= {() => handleButtonClick(value)}
                 className= {clickedButton === value ? "active" : ""}
                >
                {value}
                </StyledButton>
            ))}
               
        </div>
  </div>   
    </>
)
};