import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
   <footer className='text-white-800 flex-between w-full gap-y-10 body-text border-t border-black-400 bg-black-100 px-20 py-1 max-md:flex-col' >
        <span className='text-xs md:text-base ' >Copyright &copy; 2023 Preeis Limited | All Rights Reserve. </span>
        <Link href="/terms" >
            Terms & Conditions
        </Link>

        <Link href="/privacy" >
            Privacy Policy
        </Link>
   </footer>
  )
}

export default Footer