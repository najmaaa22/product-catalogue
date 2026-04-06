// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Product Catalogue',
  description: 'A curated product catalogue built with Payload CMS and Next.js.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. ഇവിടെ <html> ടാഗ് ചേർക്കുക
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </div>
      </body>
    </html>
  )
}