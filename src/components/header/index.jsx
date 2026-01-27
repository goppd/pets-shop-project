import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import logo from '../../assets/icons/logo.svg'
import basket from '../../assets/icons/basket.empty.svg'

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: '40px',
        py: '30px',
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{
          width: '70px',
          height: '70px',
          cursor: 'pointer',
        }}
      />

      <Box
        component="nav"
        sx={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        {[
          { to: '/', label: 'Main Page' },
          { to: '/categories', label: 'Categories' },
          { to: '/products', label: 'All products' },
          { to: '/sales', label: 'All sales' },
        ].map((link) => (
          <Typography
            key={link.to}
            component={NavLink}
            to={link.to}
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              fontFamily: 'Roboto, sans-serif',
              textDecoration: 'none',
              color: 'rgba(40,40,40,1)',
              transition: 'color 0.2s ease',

              '&:hover': {
                color: 'rgba(40,40,40,0.5)',
              },

              '&.active': {
                color: 'rgba(40,40,40,0.5)',
                borderBottom: '2px solid rgba(40,40,40,0.5)',
              },
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Box>

      <Box
        component="img"
        src={basket}
        alt="basket"
        sx={{
          width: '48px',
          height: '48px',
          cursor: 'pointer',
        }}
      />
    </Box>
  )
}

export default Header
