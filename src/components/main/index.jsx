import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import banner from '../../assets/images/banner.svg'
import Categories from '../categories'
import Discount from '../discount'
import Sale from '../sale'

const Main = () => {
  const navigate = useNavigate()

  return (
    <Box component="main">
      <Box
        sx={{
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          component="img"
          src={banner}
          alt="banner"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: { xs: '20%', md: '25%' },
            left: { xs: '5%', md: '40px' },
            maxWidth: { xs: '90%', md: '600px' },
            color: 'rgba(255, 255, 255, 1)',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '32px', md: '64px' },
              fontWeight: 700,
              lineHeight: '110%',
              mb: '24px',
            }}
          >
            Amazing Discounts
            <br />
            on Pets Products!
          </Typography>

          <Button
            onClick={() => navigate('/sales')}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',

              padding: '16px 56px',
              borderRadius: '6px',

              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '130%',
              textTransform: 'none',

              backgroundColor: 'rgba(13, 80, 255, 1)',
              color: 'rgba(255, 255, 255, 1)',

              '&:hover': {
                backgroundColor: '#282828',
              },
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>

      <Categories />
    </Box>
  )
}

export default Main
