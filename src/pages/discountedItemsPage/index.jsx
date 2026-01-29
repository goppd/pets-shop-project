import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../../redux/slices/cartSlice'

const styles = {
  container: { px: '40px', pb: '80px' },

  title: {
    fontSize: '64px',
    fontWeight: 700,
    mb: '40px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },

  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': { transform: 'translateY(-4px)' },
    '&:hover .addBtn': { opacity: 1 },
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    display: 'block',
  },

  discountBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: '#0d50ff',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '16px',
  },

  addBtn: {
    position: 'absolute',
    left: '16px',
    right: '16px',
    bottom: '16px',
    height: '48px',
    borderRadius: '6px',
    backgroundColor: '#0d50ff',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 600,
    textTransform: 'none',
    opacity: 0,
    transition: 'opacity 0.2s ease, background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#282828',
    },
  },

  addedBtn: {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #000',
    opacity: 1,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },

  name: {
    textAlign: 'center',
    padding: '16px',
    fontWeight: 500,
    fontSize: '18px',
  },

  prices: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '16px',
    paddingBottom: '16px',
  },

  price: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '110%',
  },

  oldPrice: {
    fontSize: '18px',
    color: '#8b8b8b',
    textDecoration: 'line-through',
    lineHeight: '110%',
  },
}

const DiscountedItemsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.items)
  const addedIds = cartItems.map((item) => item.id)

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3333/products/all').then((res) => {
      setProducts(res.data.filter((p) => p.discont_price))
    })
  }, [])

  const toggleAdd = (product) => {
    const exists = addedIds.includes(product.id)

    if (exists) {
      dispatch(remove(product.id))
    } else {
      dispatch(
        add({
          id: product.id,
          title: product.title,
          price: product.price,
          discont_price: product.discont_price,
          image: product.image,
          count: 1,
        }),
      )
    }
  }

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Discounted items</Typography>

      <Box sx={styles.grid}>
        {products.map((p) => {
          const isAdded = addedIds.includes(p.id)
          const discountPercent = Math.round(
            ((p.price - p.discont_price) / p.price) * 100,
          )

          return (
            <Box key={p.id} sx={styles.card}>
              <Box sx={styles.imageWrapper}>
                <Box
                  component="img"
                  src={`http://localhost:3333${p.image}`}
                  alt={p.title}
                  sx={styles.image}
                />

                <Box sx={styles.discountBadge}>-{discountPercent}%</Box>

                <Button
                  className="addBtn"
                  sx={{
                    ...styles.addBtn,
                    ...(isAdded ? styles.addedBtn : {}),
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleAdd(p)
                  }}
                >
                  {isAdded ? 'Added' : 'Add to cart'}
                </Button>
              </Box>

              <Box onClick={() => navigate(`/products/${p.id}`)}>
                <Typography sx={styles.name}>{p.title}</Typography>

                <Box sx={styles.prices}>
                  <Typography sx={styles.price}>${p.discont_price}</Typography>
                  <Typography sx={styles.oldPrice}>${p.price}</Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default DiscountedItemsPage
