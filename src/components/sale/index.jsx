import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Typography, Button, Card, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'

const Sale = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3333/products/all')

        const discounted = response.data
          .filter((product) => product.discont_price !== null)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)

        setProducts(discounted)
      } catch (error) {
        console.error('Error loading sale products:', error)
      }
    }

    fetchSaleProducts()
  }, [])

  return (
    <Box sx={{ px: '40px', pb: '80px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '40px',
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: '110%',
            color: 'rgba(40,40,40,1)',
          }}
        >
          Sale
        </Typography>

        <Button
          component={Link}
          to="/discountedItem"
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '126%',
            borderRadius: '6px',
            borderColor: 'rgba(221,221,221,1)',
            color: 'rgba(139,139,139,1)',
            px: '16px',
            py: '8px',
            '&:hover': {
              borderColor: '#282829',
              backgroundColor: 'rgba(40,40,41,0.05)',
            },
          }}
        >
          All sales
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
        }}
      >
        {products.map((product) => {
          const discountPercent = Math.round(
            ((product.price - product.discont_price) / product.price) * 100,
          )

          return (
            <Card
              key={product.id}
              component={Link}
              to={`/products/${product.id}`}
              elevation={0}
              sx={{
                position: 'relative',
                borderRadius: '12px',
                border: '1px solid rgba(221,221,221,1)',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(13,80,255,1)',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: '130%',
                  px: '8px',
                  py: '4px',
                  borderRadius: '6px',
                  zIndex: 2,
                }}
              >
                -{discountPercent}%
              </Box>

              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '316 / 284',
                }}
              >
                <Box
                  component="img"
                  src={`http://localhost:3333/${product.image}`}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>

              <Box sx={{ px: '32px', pb: '32px' }}>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '130%',
                    color: 'rgba(40,40,40,1)',
                    mb: '16px',
                  }}
                >
                  {product.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: '40px',
                      fontWeight: 600,
                      lineHeight: '110%',
                      color: 'rgba(40,40,40,1)',
                    }}
                  >
                    ${product.discont_price}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: '130%',
                      color: 'rgba(139,139,139,1)',
                      textDecoration: 'line-through',
                      ml: '16px',
                      pt: '16px',
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
              </Box>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}

export default Sale
