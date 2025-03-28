
import { ChangeEvent, FormEvent, useState } from "react"



export   interface IDateProps{
  onDateString: (newDate: string)=> void;
}

export const Calendar =(props: IDateProps)=>{
const [date, setDate]=useState("")

const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{

    setDate(e.target.value)
    props.onDateString(e.target.value); 
}




const handleSubmit =(e: FormEvent)=>{
e.preventDefault();
 
}
    return(
      <div className="datum">
        <h2>Välj datum:</h2>
        <form onSubmit={handleSubmit}>
        <input className="date" type="date" value={date} onChange={handleChange} required/> 
        </form>
        
        </div>
    )
}
