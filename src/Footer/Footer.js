import React from 'react'
import SelectLanguage from '../languageSwitcher/SelectLanguage'
import logo from "../assets/footer.png"
import "./Footer.scss"
const Footer = () => {
  return (
    <div className='footer'>
        <img className='footer-img' src={logo}/>
        <div className='author'>All rights reserved to Teuta Krasniqi. :) </div>
        <SelectLanguage />
    </div>
  )
}

export default Footer