import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function ProductsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string; category?: string }> 
}) {
  const { page = '1', category } = await searchParams
  const payload = await getPayload({ config: configPromise })
  
  // 1. ലൈവ് സർവർ URL എടുക്കുന്നു (അവസാനം സ്ലാഷ് ഉണ്ടെങ്കിൽ അത് ഒഴിവാക്കുന്നു)
  const serverURL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002').replace(/\/$/, '')

  const whereQuery: any = { isActive: { equals: true } }
  if (category && category !== 'All') {
    whereQuery.category = { equals: category }
  }

  const result = await payload.find({
    collection: 'products',
    where: whereQuery,
    limit: 8,
    page: parseInt(page),
  })

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Other']

  return (
    <div className="relative w-full min-h-screen">
      {/* Full Screen Background */}
      <div className="fixed inset-0 bg-[#0f172a] -z-10"></div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-slate-200">
        
        {/* Back to Home Button */}
        <div className="flex justify-start mb-10">
          <Link 
            href="/" 
            className="px-6 py-2.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-md text-sm font-semibold shadow-sm"
          >
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Our Products
          </h1>
          <p className="mt-4 text-slate-400 font-medium max-w-xl mx-auto">
            Handpicked quality items for your daily needs
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${
                category === cat || (!category && cat === 'All')
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {result.docs.map((product: any) => {
            // 2. ഇമേജ് URL ശരിയാക്കാനുള്ള ലോജിക് (Mixed Content ഒഴിവാക്കുന്നു)
            let imageUrl = product.image?.url || null
            if (imageUrl) {
              if (imageUrl.startsWith('http')) {
                // ഡാറ്റാബേസിലെ localhost ലിങ്കിനെ ലൈവ് URL ആക്കി മാറ്റുന്നു
                imageUrl = imageUrl.replace('http://localhost:3002', serverURL)
              } else {
                // റിലേറ്റീവ് പാത്തിനെ (e.g. /media/img.jpg) ലൈവ് URL ആക്കി മാറ്റുന്നു
                const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
                imageUrl = `${serverURL}${cleanPath}`
              }
            }

            return (
              <div key={product.id} className="flex flex-col bg-slate-800/40 border border-slate-700 rounded-lg overflow-hidden">
                
                {/* Image Section */}
                <div className="relative aspect-4/5 overflow-hidden bg-slate-900">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-600 text-xs uppercase font-bold tracking-widest">
                      No Image
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col grow">
                  <h2 className="text-lg font-bold text-white mb-2 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-xl font-bold text-blue-400 mb-6">₹{product.price}</p>
                  
                  <Link 
                    href={`/products/${product.id}`} 
                    className="mt-auto w-full py-3 bg-slate-700 text-white text-[11px] font-bold uppercase tracking-widest rounded text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        {result.totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-10 pt-10 border-t border-slate-800">
            {result.hasPrevPage ? (
              <Link 
                href={`/products?page=${result.prevPage}${category ? `&category=${category}` : ''}`} 
                className="text-xs font-bold text-blue-500 uppercase tracking-widest"
              >
                Previous
              </Link>
            ) : (
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Previous</span>
            )}

            <div className="text-[11px] font-bold text-slate-500">
              {result.page} / {result.totalPages}
            </div>

            {result.hasNextPage ? (
              <Link 
                href={`/products?page=${result.nextPage}${category ? `&category=${category}` : ''}`} 
                className="text-xs font-bold text-blue-500 uppercase tracking-widest"
              >
                Next
              </Link>
            ) : (
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Next</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}