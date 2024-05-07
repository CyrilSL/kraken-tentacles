'use client'
import React from 'react'
import { MedusaProvider } from 'medusa-react'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Layout({ children }) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9000'}
    >
      <div>
        {children}
      </div>
    </MedusaProvider>
  )
}