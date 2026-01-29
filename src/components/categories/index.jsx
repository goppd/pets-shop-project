import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Box, Typography, Card, Button } from '@mui/material'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3333/categories/all')

        const randomCategories = response.data
          .slice()
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
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid rgba(221, 221, 221, 1)',
            color: 'rgba(139, 139, 139, 1)',
          }}
        >
          All Categories
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // ✅ 4 в ряд
          gap: '32px',
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.id}
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
              <Box
                component="img"
                src={`http://localhost:3333/${category.image}`}
                alt={category.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
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
        ))}
      </Box>
    </Box>
  )
}

export default Categories
