import React from 'react'
import styles from './styles.module.css'
import banner from '../../assets/images/banner.svg'
import Categories from '../categories'
import Discount from '../discount'
import Sale from '../sale'

const Main = () => {
  return (
    <main className={styles.main}>
      <img src={banner} alt="banner" />
      <Categories />
      <Discount />
      <Sale />
    </main>
  )
}

export default Main
