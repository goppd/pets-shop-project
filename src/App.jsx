import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Main from './components/main'
import Categories from './components/categories'
import Discount from './components/discount'
import Sale from './components/sale'
import Footer from './components/footer'

import CategoriesPage from './pages/categoriesPage'
import ProductListPage from './pages/productListPage'
import ProductItemPage from './pages/productItemPage'
import AllProductsPage from './pages/allProductsPage'
import DiscountedItemsPage from './pages/discountedItemsPage'

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <Categories />
              <Discount />
              <Sale />
            </>
          }
        />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<ProductListPage />} />

        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/sales" element={<DiscountedItemsPage />} />

        <Route path="/products/:id" element={<ProductItemPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
