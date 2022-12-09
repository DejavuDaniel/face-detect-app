import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onPictureSubmit, input}) => {
    return (
        <div>
            <p className="f3" style={{color: 'lightblue'}}>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='centre'>
                <div className="form pa4 br3 shadow-5" style={{width: '600px'}} >
                    <input className="f4 pa2 w-70 center " type='text' onChange={onInputChange} />
                    {input === ''
                    ? <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue" >Detect</button>
                    :  <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue" onClick={onPictureSubmit}  >Detect</button>
                }
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;