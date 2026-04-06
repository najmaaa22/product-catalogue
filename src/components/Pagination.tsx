interface PaginationProps {
  page: number
  totalPages: number
  category?: string
}

export default function Pagination({ page, totalPages, category }: PaginationProps) {
  if (totalPages <= 1) return null

  function buildHref(p: number) {
    const params = new URLSearchParams()
    params.set('page', String(p))
    if (category && category !== 'All') params.set('category', category)
    return `/?${params.toString()}`
  }

  const pageNumbers: number[] = []
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)

  return (
    <nav className="inline-flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
      {page > 1 ? (
        <a 
          href={buildHref(page - 1)} 
          className="px-3 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
        >
          Previous
        </a>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-slate-300 cursor-not-allowed">
          Previous
        </span>
      )}

      <div className="flex items-center gap-1 px-2 border-l border-r border-slate-100">
        {pageNumbers.map((p) => {
          const isActive = page === p
          return (
            <a
              key={p}
              href={buildHref(p)}
              className={`
                w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              {p}
            </a>
          )
        })}
      </div>

      {page < totalPages ? (
        <a 
          href={buildHref(page + 1)} 
          className="px-3 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
        >
          Next
        </a>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-slate-300 cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  )
}