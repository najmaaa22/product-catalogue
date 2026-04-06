import Link from 'next/link'

interface ProductCardProps {
  id: string
  title: string
  price: number
  category: string
  imageUrl?: string | null
  imageAlt?: string
}

export default function ProductCard({
  id,
  title,
  price,
  category,
  imageUrl,
  imageAlt,
}: ProductCardProps) {
  // ✅ Safe image URL handling
  const fullImageUrl =
    imageUrl && imageUrl.startsWith('http')
      ? imageUrl
      : imageUrl
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}${imageUrl}`
      : null

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <Link href={`/products/${id}`} className="flex flex-col h-full">

        {/* Image Container */}
        <div className="relative w-full aspect-4/3 bg-slate-100 overflow-hidden">
          {fullImageUrl ? (
            <img
              src={fullImageUrl}
              alt={imageAlt || title}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2">
              <span className="text-2xl">📸</span>
              <span className="text-xs font-medium uppercase tracking-wider">
                No Image
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm shadow-sm text-slate-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-white/20">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {title}
          </h2>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                Price
              </span>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                ₹{price.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white text-slate-400 transition-colors">
              <span className="text-lg transform group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </div>
          </div>
        </div>

      </Link>
    </div>
  )
}