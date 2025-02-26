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
    height: 100vh;
    margin: auto;
}

body::-webkit-scrollbar{
    display: none;
}

.canvas{
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 4vw;
    width:100%;
    text-align: center;
    align-items: center;
}

.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    height: 60px;
}

.logo{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: 600;
    color: ${({ theme }) => theme.logoColor};
}

.logo svg{
    width: 100px;
    height: 45px;
}

.header-right{
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    padding-inline:1rem;
}

details{
    position: relative;
    padding-left: 0.5rem;
}

summary{
    list-style-type: none;
}
summary > *{
    width: 30px;
    color: ${({ theme }) => theme.logoColor};
}
details ul {
    position: absolute;
    right: 0px;
    padding: 0.25rem;
    z-index: 10;
    background-color:${({ theme }) => theme.textColor} ;
    border-radius: 10px;
}

details ul li{
    list-style-type: none;
    color : ${({ theme }) => theme.background};
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    z-index: 10;
    border-radius: 10px;
    cursor: pointer;
}
details ul li:hover{
    background-color: rgb(185, 185, 185) ;
}

.modal{
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
}

.modalContent{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: max-content;
    background-color: ${({ theme }) => theme.background};
    border-radius: 10px;  
}

.appBar{
    background-color: transparent;
}

.tab{
    color: ${({ theme }) => theme.textColor};
}

.loginForm, .signupForm{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;
    padding: 2rem;
}

.inputField{
    background-color: transparent;
    font-size: 20px;
    color: ${({ theme }) => theme.textColor};
    padding: 0.5rem;
    border: none;
    outline: none;
}

.inputField:focus{
    border-radius: 10px;
    border-bottom: 1px solid rgb(25, 118, 210) ;
}

.login-btn, .signup-btn{
    color:${({ theme }) => theme.textColor};
    width: 140px;
    padding: 0.7rem;
    font-size:20px;
    background-color: rgb(25, 118, 210);
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.typingbox-container{
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.typingbox{
    position : relative;
    display : flex;
    flex-direction: column;
    justify-content : center;
    align-items: start; 
    height: fit-content; //adjust later
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
    color: ${({ theme }) => theme.background};
    padding: 8px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.textColor};
    box-shadow: 3px 3px 8px black;
    font-size: 22px;
}

.wordSpan{
    margin: 3px;
    letter-spacing: 0.03rem;
    font-size: 28px;
    letter-spacing: 0.1cap;
    word-spacing: 0.5cap;
    font-weight: 500; //adjust later after finding font
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
  font-size: 20px;
}

.timer span{
    font-size: 24px;
    color: ${({ theme }) => theme.logoColor};
    font-weight: 600;  //adjust later
}

.time-mode {
  padding: 0.2rem;
  border-radius: 5px;
}

.time-mode:hover{
    background-color: ${({ theme }) => theme.textColor} ;
    color: ${({ theme }) => theme.background};
}

.time-mode:hover {
  cursor: pointer;
}

.modes {
  display: flex;
  gap: 0.5rem;
}

.results-box{
    display: flex;
    width: 100%;
    height: 40vh;
    margin-inline:auto;
}

.results{
    width: 35%;
    padding: 1.25rem;
    align-self: center;
}

.chart{
    width: 65%;
}

.title{
    font-size: 2vw;
    opacity: 0.5;
}

.subtitle{
    font-size: 2.7vw;
    font-weight: 500;
}

.google-signin{
    width: 200px;
    padding-right: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(66, 133, 244);
    border:none;
    color: white;
    font-size: 15px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    margin-block:1rem;
}

.google-signin > img{
    background-color: white;
    height: 48px;
    padding: 10px;
    
}

.footer{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.icons{
    display: flex;
    gap: 1.5vw;
    padding: 1rem;
}

.footer .icons a{
    color: ${({theme}) => theme.logoColor || theme.textColor};
}

.icons a:hover{
    transform: scale(1.3) translateY(-3px);
    transition: all 0.3s linear;
}

.userpage{
    width:min(800px,100%);
    margin: auto;
}

.userpage-results{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: calc(min(100%,800px));
    margin: auto;
    padding: 1rem;
}

.user-profile{
    max-width: 80%;
    padding: 1rem;
    margin-inline: auto;
    margin-block: 1.25rem;
    display: flex;
    height: 10rem;
    border-radius: 25px;
    background-color: ${({theme}) => theme.textColor};
    color: ${({theme}) => theme.background} ;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    font-size: 1.1rem;
}

.user{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
}

.user .info{
    text-align: center;
    width: 60%;
}

.total-tests{
    font-size: 1.5rem;
    width: 35%;
}












@media only screen and (max-width: 600px){
    .results-box{
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }
    .results{
        justify-items:center;
    }
    .results , .chart{
        width: 100%;
    }
    .wordSpan{
        font-size: 22px;
    }
    .title{
    font-size: 4vw;
    opacity: 0.5;
    }
    .subtitle{
    font-size: 4.5vw;
    font-weight: 500;
    }

    .logo svg{
    width: 60px;
    }
    .logo{
    font-size: 24px;
    }
    
}

@media only screen and (max-width: 400px){
    .wordSpan{
        font-size: 20px;
    }
    .timer{
        font-size: 20px;
    }
    .timer span{
        font-size: 22px;
    }
}







`;
