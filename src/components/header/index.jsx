import React from 'react'
import styles from './styles.module.css'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import basket from '../../assets/icons/basket.empty.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="logo" />
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Main Page
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Categories
        </NavLink>

        <NavLink
          to="/productsList"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          All products
        </NavLink>

        <NavLink
          to="/discountedItem"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          All sales
        </NavLink>
      </nav>
      <img className={styles.basket} src={basket} alt="basket" />
    </header>
  )
}

export default Header
