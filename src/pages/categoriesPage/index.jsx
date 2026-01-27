import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

const styles = {
  container: {
    px: '40px',
    pb: '80px',
  },

  btnBox: {
    display: 'flex',
    gap: '16px',
    mb: '40px',
  },

  button: {
    padding: '8px 16px',
    fontSize: '16px',
    lineHeight: '126%',
    fontWeight: 500,
    borderRadius: '6px',
    textTransform: 'none',
    backgroundColor: '#fff',
    border: '1px solid rgba(221, 221, 221, 1)',
    color: 'rgba(139, 139, 139, 1)',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: 'rgba(40, 40, 41, 0.05)',
      borderColor: 'rgba(221, 221, 221, 1)',
      boxShadow: 'none',
    },
  },

  buttonActive: {
    borderColor: 'rgba(40, 40, 40, 1)',
    color: 'rgba(40, 40, 40, 1)',
  },

  title: {
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: '110%',
    mb: '40px',
    color: 'rgba(40, 40, 40, 1)',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },

  card: {
    borderRadius: '12px',
    border: '1px solid rgba(221, 221, 221, 1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    backgroundColor: '#fff',

    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },

  imageWrapper: {
    width: '100%',
    aspectRatio: '316 / 350',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  name: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '130%',
    textAlign: 'center',
    color: 'rgba(40, 40, 40, 1)',
    py: '16px',
  },
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [showAll, setShowAll] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3333/categories/all')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err))
  }, [])
  const visibleCategories = showAll ? categories : categories.slice(0, 4)

  return (
    <Box sx={styles.container}>
      {/* BUTTONS */}
      <Box sx={styles.btnBox}>
        <Button disableRipple onClick={() => navigate('/')} sx={styles.button}>
          Main page
        </Button>

        <Button
          disableRipple
          onClick={() => setShowAll(true)}
          sx={{
            ...styles.button,
            ...(showAll ? styles.buttonActive : {}),
          }}
        >
          Categories
        </Button>
      </Box>

      {/* TITLE */}
      <Typography sx={styles.title}>Categories</Typography>

      {/* GRID */}
      <Box sx={styles.grid}>
        {visibleCategories.map((cat) => (
          <Box
            key={cat.id}
            sx={styles.card}
            onClick={() => navigate(`/categories/${cat.id}`)}
          >
            <Box sx={styles.imageWrapper}>
              <Box
                component="img"
                src={`http://localhost:3333/${cat.image}`}
                alt={cat.title}
                sx={styles.image}
              />
            </Box>

            <Typography sx={styles.name}>{cat.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default CategoriesPage
