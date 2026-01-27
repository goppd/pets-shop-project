import './App.css'
import React from 'react'
import Header from './components/Header'
import Main from './components/main'
import Categories from './components/categories'
import Discount from './components/discount'
import Sale from './components/sale'
import Footer from './components/footer'
import ProductListPage from './pages/productListPage'
import CategoriesPage from './pages/categoriesPage'
import DiscountedItemPage from './pages/discountedItemPage'
import ProductItemPage from './pages/productItemPage'

import { Route, Routes } from 'react-router-dom'

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
        <Route path="/discountedItem" element={<DiscountedItemPage />} />
        <Route path="/products/:id" element={<ProductItemPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
