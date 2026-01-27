import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Card, Button } from '@mui/material'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3333/categories/all')
        const randomCategories = response.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
        setCategories(randomCategories)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <Box sx={{ padding: '80px 40px 106px 40px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: '64px',
            lineHeight: '110%',
            fontWeight: 700,
            color: 'rgb(40, 40, 41)',
          }}
        >
          Categories
        </Typography>

        <Button
          component={Link}
          to="/categories"
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '130%',
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid rgba(221, 221, 221, 1)',
            color: 'rgba(139, 139, 139, 1)',

            '&:hover': {
              backgroundColor: 'rgba(40, 40, 41, 0.05)',
              borderColor: 'rgb(40, 40, 41)',
            },
          }}
        >
          All Categories
        </Button>
      </Box>

      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid key={category.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              component={Link}
              to={`/categories/${category.id}`}
              elevation={0}
              sx={{
                textDecoration: 'none',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                aspectRatio: '316 / 392',
                boxShadow: 'none',
                transition: 'transform 0.2s ease',

                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '316 / 350',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={`http://localhost:3333/${category.image}`}
                  alt={category.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '130%',
                    color: 'rgb(40, 40, 40)',
                  }}
                >
                  {category.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Categories
