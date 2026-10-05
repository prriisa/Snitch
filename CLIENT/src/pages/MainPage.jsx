import React from 'react'
import Navbar from '../components/Main/Navbar'
import HeroBanner from '../components/Main/HeroBanner'
import ShopByCategory from '../components/Main/ShopByCategory'
import ShopYourSize from '../components/Main/ShopBySize'
import ShopByOccasion from '../components/Main/ShopByOccasion'
import ShopByPrice from '../components/Main/ShopByPrice'
import Footer from '../components/Main/Footer'
import ProductsPage from './ProductsPage'

const MainPage = () => {
  return (
    <div>
        <HeroBanner/>
        <ShopByCategory/>
        <ShopYourSize/>
        <ShopByOccasion/>
        <ShopByPrice/>
        <ProductsPage/>
        <Footer/>
    </div>
  )
}

export default MainPage