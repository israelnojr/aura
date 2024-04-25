import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Provider } from '../../components/Providers'
import { Toaster } from "../../components/ui/toaster";

const layout = ({children}: {children : React.ReactNode} ) => {
  return (
     <Provider>
      <Navbar />
      {children}
      <Toaster />
      {/* <Footer /> */}
    </Provider>
  )
}

export default layout