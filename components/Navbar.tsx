import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import UserAccountNav from './UserAccountNav'
import { getAuthSession } from '../lib/auth'
import SignInButton from './SignInButton'
import { ThemeToggle } from './ThemeToggle'

const Navbar = async () => {
    const session = await getAuthSession();
  return (
    <nav className="flex-center  fixed top-0 !z-50 w-full border-b-2 border-black-200 bg-black-100 py-7 text-white ">
        <div className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16 ">
            <Link href="/" >
                <Image src="/jsm-logo.svg" alt="logo" width={55} height={40} />
            </Link>
            <Image 
                src="/hamburger-menu.svg" 
                alt="hamburger-menu" 
                width={30} 
                height={30} 
                className='block md:hidden'
            />
            <ul className='flex-center gap-x-3 max-md:hidden md:gap-x-10' >
                <li className='body-text text-gradient_blue-purple !font-bold' >
                    <Link href="/gallery" >
                        Gallery
                    </Link>
                </li>
                {session?.user && (
                    <li className='body-text text-gradient_blue-purple !font-normal' >
                        <Link href="/create" >
                            Create course
                        </Link>
                    </li>
                )}
                {/* <li>
                    <ThemeToggle className="mr-3" />
                </li> */}
                <li>
                    {session?.user ? (
                        <UserAccountNav user={session.user} />
                        ) : (
                        <SignInButton />
                    )}
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar