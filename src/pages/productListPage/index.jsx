import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Button, Select, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../../redux/slices/cartSlice'

import checkbox_normal from '../../assets/icons/checkbox_normal.svg'
import checkbox_active from '../../assets/icons/checkbox_active.svg'

const styles = {
  container: { p: '40px', pb: '80px' },
  title: {
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: '110%',
    mb: '40px',
    color: 'rgba(40,40,40,1)',
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    mb: '40px',
    flexWrap: 'wrap',
  },
  priceFilter: { display: 'flex', alignItems: 'center', gap: '16px' },
  priceLabel: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '130%',
    color: 'rgba(40,40,40,1)',
  },
  priceInput: {
    width: '112px',
    height: '36px',
    padding: '0 16px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid rgba(221, 221, 221, 1)',
  },
  discountFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkboxIcon: { width: 36, height: 36 },
  sortFilter: { display: 'flex', alignItems: 'center', gap: '16px' },
  sortLabel: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '130%',
  },
  select: { height: '36px', borderRadius: '6px' },
  resetBtn: {
    height: '44px',
    padding: '0 16px',
    borderRadius: '6px',
    border: '1px solid rgba(221,221,221,1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: '16px',
    textTransform: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },
  card: {
    borderRadius: '12px',
    border: '1px solid rgba(221,221,221,1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'translateY(-4px)' },
  },
  imageWrapper: {
    position: 'relative',
    aspectRatio: '316 / 350',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  addBtn: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 58,
    fontSize: '20px',
    fontWeight: 600,
    borderRadius: '6px',
    backgroundColor: 'rgba(13,80,255,1)',
    color: 'rgba(255,255,255,1)',
    opacity: 0,
    '&:hover': { backgroundColor: 'rgba(40,40,40,1)' },
  },
  addedBtn: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(40,40,40,1)',
    border: '1px solid rgba(40,40,40,1)',
  },
  cardHover: {
    '&:hover .addBtn': { opacity: 1 },
  },
  name: {
    fontSize: '20px',
    textAlign: 'center',
    padding: '16px 32px',
  },
  prices: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    paddingBottom: '16px',
  },
  price: { fontSize: '40px', fontWeight: 600 },
  oldPrice: {
    fontSize: '20px',
    color: 'rgba(139,139,139,1)',
    textDecoration: 'line-through',
  },
  emptyState: {
    marginTop: '80px',
    textAlign: 'center',
    fontSize: '32px',
    color: 'rgba(139,139,139,1)',
  },
}

const ProductListPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.items)
  const addedIds = cartItems.map((item) => item.id)

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [sortType, setSortType] = useState('default')

  useEffect(() => {
    axios.get(`http://localhost:3333/categories/${id}`).then((res) => {
      setCategory(res.data.category)
      setProducts(res.data.data)
    })
  }, [id])

  const toggleAdd = (productId) => {
    const exists = cartItems.find((item) => item.id === productId)
    exists
      ? dispatch(remove(productId))
      : dispatch(add({ id: productId, count: 1 }))
  }

  const visibleProducts = useMemo(() => {
    let result = [...products]

    if (onlyDiscounted) result = result.filter((p) => p.discont_price)
    if (priceFrom)
      result = result.filter((p) => (p.discont_price ?? p.price) >= +priceFrom)
    if (priceTo)
      result = result.filter((p) => (p.discont_price ?? p.price) <= +priceTo)

    if (sortType === 'low-high')
      result.sort(
        (a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price),
      )
    if (sortType === 'high-low')
      result.sort(
        (a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price),
      )

    return result
  }, [products, onlyDiscounted, priceFrom, priceTo, sortType])

  if (!category) return null

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>{category.title}</Typography>

      <Box sx={styles.filters}>
        <Box sx={styles.priceFilter}>
          <Typography sx={styles.priceLabel}>Price</Typography>
          <input
            style={styles.priceInput}
            placeholder="from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <input
            style={styles.priceInput}
            placeholder="to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </Box>

        <Box
          sx={styles.discountFilter}
          onClick={() => setOnlyDiscounted((p) => !p)}
        >
          <Typography>Discounted items</Typography>
          <img
            src={onlyDiscounted ? checkbox_active : checkbox_normal}
            style={styles.checkboxIcon}
          />
        </Box>

        <Box sx={styles.sortFilter}>
          <Typography sx={styles.sortLabel}>Sorted</Typography>
          <Select
            size="small"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            sx={styles.select}
          >
            <MenuItem value="default">by default</MenuItem>
            <MenuItem value="low-high">price: low-high</MenuItem>
            <MenuItem value="high-low">price: high-low</MenuItem>
          </Select>
        </Box>

        <Button
          sx={styles.resetBtn}
          onClick={() => {
            setOnlyDiscounted(false)
            setPriceFrom('')
            setPriceTo('')
            setSortType('default')
          }}
        >
          Reset filters
        </Button>
      </Box>

      {visibleProducts.length === 0 ? (
        <Typography sx={styles.emptyState}>No products found</Typography>
      ) : (
        <Box sx={styles.grid}>
          {visibleProducts.map((product) => {
            const isAdded = addedIds.includes(product.id)

            return (
              <Box
                key={product.id}
                sx={{ ...styles.card, ...styles.cardHover }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <Box sx={styles.imageWrapper}>
                  <Box
                    component="img"
                    src={`http://localhost:3333${product.image}`}
                    sx={styles.image}
                  />
                  <Button
                    className="addBtn"
                    sx={{
                      ...styles.addBtn,
                      ...(isAdded ? styles.addedBtn : {}),
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleAdd(product.id)
                    }}
                  >
                    {isAdded ? 'Added' : 'Add to cart'}
                  </Button>
                </Box>

                <Typography sx={styles.name}>{product.title}</Typography>

                <Box sx={styles.prices}>
                  <Typography sx={styles.price}>
                    ${product.discont_price ?? product.price}
                  </Typography>
                  {product.discont_price && (
                    <Typography sx={styles.oldPrice}>
                      ${product.price}
                    </Typography>
                  )}
                </Box>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default ProductListPage
