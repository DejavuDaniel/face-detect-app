import React from "react";
import Tilt from 'react-parallax-tilt';
import face from './icons8-face-60.png'
import './Logo.css';


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" style={{ height: '100px', width: '100px'}} >
                    <h1 className="tc"><img style={{ paddingTop: '20px'}} src={face} alt='logo'/></h1>
            </Tilt>
        </div>
    );
}

export default Logo;