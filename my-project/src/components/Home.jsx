import React from 'react'
import Slide from './Slide'
import anh1 from "../image/slide1.png";
import anh2 from "../image/slide6.jpg";
import anh3 from "../image/slide7.jpg";

export default function Home() {
  return (
    <div>
      <div><Slide sl1={anh1} sl2={anh2} sl3={anh3} /></div>
    </div>
  )
}
