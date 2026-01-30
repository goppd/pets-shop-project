import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'

import logo from '../../assets/icons/logo.svg'
import basket from '../../assets/icons/basket.empty.svg'

const Header = () => {
  const navigate = useNavigate()

  const items = useSelector((state) => state.cart.items)

  const cartCount = items.reduce((sum, item) => sum + item.count, 0)

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
        onClick={() => navigate('/')}
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
        sx={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => navigate('/cart')}
      >
        <Box
          component="img"
          src={basket}
          alt="basket"
          sx={{ width: '48px', height: '48px' }}
        />

        {cartCount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: 'rgba(13, 80, 255, 1)',
              color: 'rgba(255, 255, 255, 1)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {cartCount}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Header
