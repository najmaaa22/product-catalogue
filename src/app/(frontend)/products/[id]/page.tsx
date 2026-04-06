import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  try {
    const product: any = await payload.findByID({
      collection: 'products',
      id: id,
    })

    if (!product || !product.isActive) return notFound()

    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/products" className="text-gray-500 hover:text-black mb-8 inline-block">
          ← Back to Products
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="rounded-2xl overflow-hidden bg-gray-50 border">
            {product.image?.url && (
              <img src={product.image.url} alt={product.title} className="w-full h-auto" />
            )}
          </div>
          
          <div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-5xl font-extrabold mt-4 mb-2">{product.title}</h1>
            <p className="text-3xl font-light text-green-600 mb-6">₹{product.price}</p>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium">Stock Availability: <span className="text-black font-bold">{product.stock || 0} items left</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (e) {
    return notFound()
  }
}