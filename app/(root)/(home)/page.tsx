import React from 'react'
import SearchForm from '../../../components/SearchForm'
import Filter from '../../../components/Filter'

const page = () => {
  return (
    <main className='flex-center paddings mx-auto w-full max-w-screen-2xl flex-col' >
      <section className="nav-padding w-full">
        <div className='flex-center relative min-h-[274px]  w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center  ' >
          <h1 className='heading1 md:heading2 mb-6 text-center text-white ' >Begin Your Learning Journey</h1>
        </div>
        <SearchForm />
      </section>
      <Filter />
    </main>
  )
}

export default page