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
    <Box sx={{ padding: '80px 40px' }}>
      {/* HEADER */}
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
            color: 'rgb(40, 40, 41)',
          }}
        >
          Sale
        </Typography>

        <Button component={Link} to="/discountedItem" variant="outlined">
          All sales
        </Button>
      </Box>

      {/* PRODUCTS */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            component={Link}
            to={`/products/${product.id}`}
            sx={{
              textDecoration: 'none',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
            elevation={0}
          >
            <CardMedia
              component="img"
              image={`http://localhost:3333/${product.image}`}
              alt={product.title}
            />
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Sale
