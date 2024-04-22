import React from 'react'
import Homepage from './homepage'
//import { MedusaProvider } from 'medusa-react'


import { QueryClient } from "@tanstack/react-query"
const queryClient = new QueryClient() 
export default function page() {

  return ( 
    <Homepage />
  )
}
