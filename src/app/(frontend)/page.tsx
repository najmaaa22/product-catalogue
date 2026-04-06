import Link from 'next/link'

export default function HomePage() {
  return (
    /* 1. Full Screen Container - സ്ക്രീൻ മുഴുവൻ ബാക്ക്ഗ്രൗണ്ട് വരാൻ fixed inset-0 ഉപയോഗിച്ചു */
    <div className="fixed inset-0 w-full h-full flex items-center justify-center">
      
    
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://img.freepik.com/free-photo/black-friday-sales-sign-neon-light_23-2151833076.jpg?semt=ais_incoming&w=740&q=80')` 
        }}
      >
        
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 3. Content Section - */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
         <span className="text-white-400">   WELCOME TO PRODUCT CATALOGUE</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
          Discover a world of premium products curated just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Browse Products
            
          </Link>
          
          <Link 
            href="/admin" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Open Admin
          </Link>
        </div>
      </div>
    </div>
  )
}