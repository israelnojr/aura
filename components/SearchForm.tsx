'use client'
import Image from 'next/image'
import { Input } from './ui/input'
import {useState} from 'react'

const SearchForm = () => {
    const [search, setSearch] = useState('')
  return (
    <form className=" flext-center mx-auto mt-10 w-full sm:-mt-10 sm:px-5 ">
        <label className=" flex-center relative w-full max-w-3xl md:left-[154px] ">
            <Image 
                src='/magnifying-glass.svg'
                className='absolute left-8'
                width={32}
                height={32}
                alt='search icon'
            />
            <Input
                className='base-regular placeholder:text-white-800 !ring-0 !ring-offset-0 bg-black-400 h-fit border-0 py-6 pl-20 pr-8 text-white-800'
                type='text'
                placeholder='Search'
                value={search}
                onChange={(e)  => setSearch(e.target.value) }
             />
        </label>
    </form>
  )
}

export default SearchForm
