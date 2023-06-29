import React from 'react'
import "../App.css"


export default function Slide({sl1,sl2,sl3}) {
  return (
    <div>
        <div id="slideshow">
            <div className="slide_wrapper">
                <div className="slide"><img src={sl1} alt="" style={{width:'100%',height:'450px'}} /></div>
                <div className="slide"><img src={sl2} alt="" style={{width:'100%',height:'450px'}} /></div>
                <div className="slide"><img src={sl3} alt="" style={{width:'100%',height:'450px'}} /></div>
            </div>
        </div>
    </div>
  )
}