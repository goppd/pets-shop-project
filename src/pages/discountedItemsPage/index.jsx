import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Button, Select, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../../redux/slices/cartSlice'

const styles = {
  container: { px: '40px', pb: '80px' },
  btnBox: { display: 'flex', gap: '16px', mb: '40px' },
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '6px',
    textTransform: 'none',
    backgroundColor: '#fff',
    border: '1px solid rgba(221,221,221,1)',
    color: 'rgba(139,139,139,1)',
  },
  buttonActive: {
    borderColor: 'rgba(40,40,40,1)',
    color: 'rgba(40,40,40,1)',
  },
  title: {
    fontSize: '64px',
    fontWeight: 700,
    mb: '40px',
  },
  filters: {
    display: 'flex',
    gap: '40px',
    mb: '40px',
  },
  priceFilter: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  priceInput: {
    width: '112px',
    height: '36px',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
  },
  sortFilter: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
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
    '&:hover .addBtn': { opacity: 1 },
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
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
  },
  addBtn: {
    position: 'absolute',
    left: '16px',
    right: '16px',
    bottom: '16px',
    height: '48px',
    backgroundColor: '#0d50ff',
    color: '#fff',
    opacity: 0,
  },
  addedBtn: {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #000',
    opacity: 1,
  },
  name: {
    textAlign: 'center',
    padding: '16px',
    fontWeight: 500,
  },
  prices: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    paddingBottom: '16px',
  },
  price: {
    fontSize: '24px',
    fontWeight: 600,
  },
  oldPrice: {
    textDecoration: 'line-through',
    color: '#8b8b8b',
  },
}

const DiscountedItemsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.items)
  const addedIds = cartItems.map((item) => item.id)

  const [products, setProducts] = useState([])
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [sortType, setSortType] = useState('default')

  useEffect(() => {
    axios.get('http://localhost:3333/products/all').then((res) => {
      setProducts(res.data.filter((p) => p.discont_price))
    })
  }, [])

  const toggleAdd = (product) => {
    const exists = cartItems.find((i) => i.id === product.id)

    if (exists) {
      dispatch(remove(product.id))
    } else {
      dispatch(add({ ...product, count: 1 }))
    }
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (priceFrom)
      result = result.filter((p) => p.discont_price >= Number(priceFrom))
    if (priceTo)
      result = result.filter((p) => p.discont_price <= Number(priceTo))

    if (sortType === 'low-high')
      result.sort((a, b) => a.discont_price - b.discont_price)
    if (sortType === 'high-low')
      result.sort((a, b) => b.discont_price - a.discont_price)

    return result
  }, [products, priceFrom, priceTo, sortType])

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Discounted items</Typography>

      <Box sx={styles.grid}>
        {filteredProducts.map((p) => {
          const isAdded = addedIds.includes(p.id)

          return (
            <Box key={p.id} sx={styles.card}>
              <Box sx={styles.imageWrapper}>
                <Box
                  component="img"
                  src={`http://localhost:3333${p.image}`}
                  sx={styles.image}
                />

                <Box sx={styles.discountBadge}>
                  -{Math.round(((p.price - p.discont_price) / p.price) * 100)}%
                </Box>

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
