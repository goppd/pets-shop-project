import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Button, Select, MenuItem } from '@mui/material'

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
    lineHeight: '110%',
    mb: '40px',
    color: 'rgba(40,40,40,1)',
  },

  filters: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    mb: '40px',
  },

  priceFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },

  priceInput: {
    width: '112px',
    height: '36px',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid rgba(221,221,221,1)',
    fontSize: '16px',
  },

  sortFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },

  card: {
    border: '1px solid rgba(221,221,221,1)',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform .2s ease',

    '&:hover': {
      transform: 'translateY(-4px)',
    },

    '&:hover .addBtn': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },

  imageWrapper: {
    position: 'relative',
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

  discountBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    padding: '4px 8px',
    borderRadius: '6px',
    backgroundColor: 'rgba(13,80,255,1)',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '130%',
  },

  addBtn: {
    position: 'absolute',
    left: '16px',
    right: '16px',
    bottom: '16px',
    height: '58px',
    borderRadius: '6px',
    fontSize: '20px',
    fontWeight: 600,
    textTransform: 'none',
    backgroundColor: 'rgba(13,80,255,1)',
    color: '#fff',
    opacity: 0,
    pointerEvents: 'none',

    '&:hover': {
      backgroundColor: 'rgba(40,40,40,1)',
    },
  },

  addedBtn: {
    backgroundColor: '#fff',
    color: 'rgba(40,40,40,1)',
    border: '1px solid rgba(40,40,40,1)',

    '&:hover': {
      backgroundColor: '#fff',
    },
  },

  name: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '130%',
    textAlign: 'center',
    padding: '16px 32px',
    color: 'rgba(40,40,40,1)',
  },

  prices: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: '16px',
    paddingBottom: '16px',
  },

  price: {
    fontSize: '40px',
    fontWeight: 600,
    lineHeight: '110%',
    color: 'rgba(40,40,40,1)',
  },

  oldPrice: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '110%',
    color: 'rgba(139,139,139,1)',
    textDecoration: 'line-through',
  },

  emptyState: {
    marginTop: '80px',
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 600,
    color: 'rgba(139,139,139,1)',
  },
}

const DiscountedItemsPage = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [sortType, setSortType] = useState('default')
  const [addedIds, setAddedIds] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3333/products/all').then((res) => {
      setProducts(res.data.filter((p) => p.discont_price !== null))
    })
  }, [])

  const resetVisible =
    priceFrom !== '' || priceTo !== '' || sortType !== 'default'

  const resetFilters = () => {
    setPriceFrom('')
    setPriceTo('')
    setSortType('default')
  }

  const toggleAdd = (id) => {
    setAddedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (priceFrom !== '') {
      result = result.filter((p) => p.discont_price >= Number(priceFrom))
    }

    if (priceTo !== '') {
      result = result.filter((p) => p.discont_price <= Number(priceTo))
    }

    if (sortType === 'low-high') {
      result.sort((a, b) => a.discont_price - b.discont_price)
    }

    if (sortType === 'high-low') {
      result.sort((a, b) => b.discont_price - a.discont_price)
    }

    return result
  }, [products, priceFrom, priceTo, sortType])

  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8)

  return (
    <Box sx={styles.container}>
      <Box sx={styles.btnBox}>
        <Button onClick={() => navigate('/')} sx={styles.button}>
          Main page
        </Button>

        <Button
          onClick={() => setShowAll(true)}
          sx={{ ...styles.button, ...styles.buttonActive }}
        >
          All sales
        </Button>
      </Box>

      <Typography sx={styles.title}>Discounted items</Typography>

      <Box sx={styles.filters}>
        <Box sx={styles.priceFilter}>
          <Typography>Price</Typography>
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

        <Box sx={styles.sortFilter}>
          <Typography>Sorted</Typography>
          <Select
            size="small"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <MenuItem value="default">by default</MenuItem>
            <MenuItem value="low-high">price: low-high</MenuItem>
            <MenuItem value="high-low">price: high-low</MenuItem>
          </Select>
        </Box>

        {resetVisible && <Button onClick={resetFilters}>Reset</Button>}
      </Box>

      {visibleProducts.length === 0 ? (
        <Typography sx={styles.emptyState}>No products found</Typography>
      ) : (
        <Box sx={styles.grid}>
          {visibleProducts.map((p) => {
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
                      toggleAdd(p.id)
                    }}
                  >
                    {isAdded ? 'Added' : 'Add to cart'}
                  </Button>
                </Box>

                <Box onClick={() => navigate(`/products/${p.id}`)}>
                  <Typography sx={styles.name}>{p.title}</Typography>

                  <Box sx={styles.prices}>
                    <Typography sx={styles.price}>
                      ${p.discont_price}
                    </Typography>
                    <Typography sx={styles.oldPrice}>${p.price}</Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default DiscountedItemsPage
