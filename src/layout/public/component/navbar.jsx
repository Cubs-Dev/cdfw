import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import {House , Contact ,Newspaper, Menu , LogIn } from 'lucide-react'
//import logo from '../../assets/lgo.png'

const navbar = () => {
  return (
    <div id='NAV' className=" bg-indigo-900	h-[5rem] w-auto flex justify-between items-center border-b border-white ">
      <div id = "logo" className=' flex items-center ml-5 mr-5' >
      <Menu className='text-white md:hidden ml-2 mr-4'/>
        {/*<img src={logo} className='h-[4rem] w-[4rem]'/>*/}
        <span className='text-xl text-white p-2 ' > CUBS MARETH</span>
      </div>
      <div id='link ' className=' flex justify-center items-center gap-2'>
      <Link to={"/"} className="hidden md:flex justify-self-auto items-center p-2 w-50 h-[4rem] border-t-2 border-b-2 border-l-8  border-yellow-400	 bg-transparent rounded-full text-white mr-3 "> 
          <House className='mr-1'/>
        Acceuil   </Link>
        <Link to={"/contact"} className="hidden md:flex justify-self-auto items-center p-2 w-50 h-[4rem] border-t-2 border-b-2 border-l-8  border-yellow-400	 bg-transparent rounded-full text-white mr-3 "> 
          <Contact className='mr-1'/>
        Contact  </Link>
        <Link to={"/blog"} className="hidden md:flex justify-self-auto items-center p-2 w-50 h-[4rem] border-t-2 border-b-2 border-l-8  border-yellow-400	 bg-transparent rounded-full text-white mr-3 "> 
         <Newspaper className='mr-1'/>
        News</Link>
      </div>
      <div>
      <Link to={"/login"} className="hidden md:flex items-center w-50 h-[4rem] border-2 border-white bg-black rounded-full text-white mr-3 p-2 ml-5 "> 
          <LogIn className='mr-1'/>
        Se connecter </Link> </div>

    </div>  )
}

export default navbar