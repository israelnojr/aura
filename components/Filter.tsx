"use client"
import React, {useState} from 'react'
import { categories } from '../lib/utils'

interface FilterProps {
  onCategoryChange: (category: string) => void;
  style: string
}

const Filter: React.FC<FilterProps> = ({ onCategoryChange, style }) => {
  const [active, setActive] = useState('')
  const handleActive = (link: string) => {
    setActive(link)
  }
  return (
    <u className={`text-white-800 no-underline
        sm:no-scrollbar scroll flex w-full 
        body-text max-w-full gap-2 overflow-auto
        ${style ? style : 'py-12' } sm:max-w-2xl`}
    >
        {categories.map((link) => (
            <button 
                className={` ${active === link ? 'gradient_blue-purple' : ''} bg-black-200 whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
                key={link}
                onClick={() => {handleActive(link), onCategoryChange(link)}}
             >
                {link}
            </button>
        ))}
    </u>
  )
}

export default Filter