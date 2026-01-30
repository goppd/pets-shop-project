import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../../redux/slices/cartSlice'

const styles = {
  container: { px: '40px', pb: '80px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },
  card: {
    border: '1px solid rgba(221, 221, 221, 1)',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover .addBtn': { opacity: 1 },
  },
  imageWrapper: { position: 'relative' },
  image: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
  },
  addBtn: {
    position: 'absolute',
    left: '16px',
    right: '16px',
    bottom: '16px',
    height: '48px',
    backgroundColor: 'rgba(13, 80, 255, 1)',
    color: 'rgba(255, 255, 255, 1)',
    opacity: 0,
  },
  addedBtn: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(40, 40, 40, 1)',
    border: '1px solid rgba(40, 40, 40, 1)',
    opacity: 1,
  },
}

const AllProductsPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const addedIds = cartItems.map((item) => item.id)

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3333/products/all')
      .then((res) => setProducts(res.data))
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
      <Box sx={styles.grid}>
        {products.map((p) => {
          const isAdded = addedIds.includes(p.id)

          return (
            <Box key={p.id} sx={styles.card}>
              <Box sx={styles.imageWrapper}>
                <Box
                  component="img"
                  src={`http://localhost:3333${p.image}`}
                  alt={p.title}
                  sx={styles.image}
                />

                <Button
                  className="addBtn"
                  sx={{
                    ...styles.addBtn,
                    ...(isAdded
                      ? styles.addedBtn
                      : {
                          '&:hover': {
                            backgroundColor: '#282828',
                          },
                        }),
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleAdd(p)
                  }}
                >
                  {isAdded ? 'Added' : 'Add to cart'}
                </Button>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default AllProductsPage
