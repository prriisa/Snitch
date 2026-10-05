import React from 'react'
import ShopSearch from '../components/Shop/ShopSearch'
import ShopTopBanners from '../components/Shop/ShopTopBanners'
import ShopCategories from '../components/Shop/ShopCategories'
import ShopBottomBanners from '../components/Shop/ShopBottomBanners'
import ProductsPage from './ProductsPage'

const ShopPage = () => {
  return (
    <div>
        <ShopSearch/>
        <ShopTopBanners/>
        <ShopCategories/>
        <ShopBottomBanners/>

        <ProductsPage/>
    </div>
  )
}

export default ShopPage