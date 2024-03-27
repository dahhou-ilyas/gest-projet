import React from 'react'
import './Header.css'
import DropDown from './DropDown'


export default function Header() {
  return (
    <div className="header flex flex-row justify-between">
        <div className=''>
          <a href="#default" className="logo">flow</a>
          <div className="header-right flex ">
            <a className="active" href="#projects">projects</a>
            <a href="#whiteboard">whiteboard</a>
          </div>
        </div>
        <div className='mt-1'>
          <DropDown/>  
        </div> 
    </div>
  )
}
