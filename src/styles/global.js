import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
box-sizing : border-box;
padding : 0;
}

body{
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    transition: all 0.5s linear;
    max-width: 1200px;
    margin: auto;
    overflow: hidden;
}

.header{
    display: flex;
    justify-content: space-between;
}

.logo{
    font-size: 32px;
    color: ${({ theme }) => theme.logoColor};
}

.themeButton{
    color: black;
}

.typingbox-container{
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-block:6rem;
}

.typingbox{
    position : relative;
    display : flex;
    flex-direction: column;
    justify-content : center;
    align-items: start; 
    height: fit-content;
}

.textBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
}

.typingbox-overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    backdrop-filter: blur(3px);
    cursor: pointer;
}

.overlaySpan{
    color: ${({ theme }) => theme.textColor};;
    padding: 8px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.logoColor}; // change to theme color: ;
    box-shadow: 3px 3px 8px black;
}

.wordSpan{
    margin: 3px;
    letter-spacing: 0.03rem;
    font-size: 24px;
    font-weight: 500; //font weight change
    color: ${({ theme }) => theme.typeBoxTextColor};
}

.typeInput{
    opacity: 0;
    width: 0px;
    height: 0px;
}

.current{
    animation: blinking 1s ease-in-out infinite;
}

.current-right{
    animation: blinking-right 1s ease-in-out infinite;
}

@keyframes blinking {
    0%{border-left:1px solid white ;}
    50%{border-left:1px solid black ;}
    100%{border-left:1px solid white ;}
}

@keyframes blinking-right {
    0%{border-right:1px solid white ;}
    50%{border-right:1px solid black ;}
    100%{border-right:1px solid white ;}
}

.correct{
    color: greenyellow;
}

.incorrect{
    color: red;
}

.menu {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.timer{
  font-size: 22px;
}

.timer span{
    color: ${({ theme }) => theme.logoColor};;
}

.time-mode {
  padding: 0.2rem;
  border-radius: 5px;
}

.time-mode:hover {
  background-color: ${({ theme }) => theme.logoColor};;
  cursor: pointer;
}

.modes {
  display: flex;
  gap: 0.5rem;
}

.results-box{
    display: flex;
    width: 100%;
    height: auto;
    margin-inline:auto;
}

.results{
    width: 35%;
    padding: 1.25rem;
}

.chart{
    width: 65%;
}

.title{
    font-size: 1rem;
    opacity: 0.5;
}

.subtitle{
    font-size: 1.4rem;
    font-weight: 500;
}







`;
