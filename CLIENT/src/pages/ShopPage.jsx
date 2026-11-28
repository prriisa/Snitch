import { useLocation } from "react-router"
import ShopSearch from '../components/Shop/ShopSearch'
import ShopTopBanners from '../components/Shop/ShopTopBanners'
import ShopCategories from '../components/Shop/ShopCategories'
import ShopBottomBanners from '../components/Shop/ShopBottomBanners'
import ProductsPage from './ProductsPage'

const ShopPage = () => {
  const location = useLocation()
  const hasSearch = Boolean(new URLSearchParams(location.search).get("search")?.trim())
  return (
    <div>
        <ShopSearch/>
        {!hasSearch && (
          <>
            <ShopTopBanners/>
            <ShopCategories/>
            <ShopBottomBanners/>
          </>
        )}

        <ProductsPage/>
    </div>
  )
}

export default ShopPage