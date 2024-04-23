'use client'
import React from 'react'
import { MedusaProvider } from 'medusa-react'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Layout({ children }) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000"
    >
      <div>
        {/* Common layout elements can go here */}
        {children}
      </div>
    </MedusaProvider>
  )
}