import styled from "styled-components";

export const StyledButton = styled.button`

background-color: darkGrey;
color: white;
border-radius: 85px;
height: 90px;
width: 90px;
font-size: 30px;
text-align: center;
padding: 10px;
box-shadow: 2px 5px dimgray;

&:hover{
    background-color: white;
    color: darkgray;
    border: 2px solid darkgrey;
}
`

export const StyledButtonSubmit =styled(StyledButton)`
border-radius: 12px;
height: 55px;
width: 110px;
font-size: 20px;
padding: 0;

`

export const DeleteButton = styled.button`
background-color: red;
color: white;`

