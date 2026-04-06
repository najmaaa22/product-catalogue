'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Other']

interface CategoryFilterProps {
  selected: string
}

function FilterInner({ selected }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleClick(cat: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', cat)
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat
        return (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
              ${isActive 
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
              }
            `}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}

export default function CategoryFilter({ selected }: CategoryFilterProps) {
  return (
    <Suspense fallback={<div className="h-10 animate-pulse bg-slate-200 rounded-full w-64" />}>
      <FilterInner selected={selected} />
    </Suspense>
  )
}