import React from 'react'
import Homepage from './homepage'
//import { MedusaProvider } from 'medusa-react'

export default function page() {

  return ( 
    <div className="relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg">

    <Homepage />
    </div>
  )
}
