import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { add, remove, increase, decrease } from '../../redux/slices/cartSlice'

import Image1 from '../../assets/images/image1.svg'
import Image2 from '../../assets/images/image2.svg'
import Image3 from '../../assets/images/image3.svg'

const BASE_URL = 'http://localhost:3333'

/* ================= STYLES ================= */
const counterBtn = {
  width: '58px',
  height: '58px',
  minWidth: '58px',
  border: '1px solid rgba(221,221,221,1)',
  borderRadius: 0,
  fontSize: '20px',
  color: 'rgba(40,40,40,1)',
}

const counterValue = {
  width: '58px',
  height: '58px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: '1px solid rgba(221,221,221,1)',
  borderBottom: '1px solid rgba(221,221,221,1)',
  fontSize: '20px',
  fontWeight: 600,
}

/* ================= COMPONENT ================= */
const ProductItemPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const cartItems = useSelector((state) => state.cart.items)

  const cartItem = useMemo(
    () => cartItems.find((item) => item.id === Number(id)),
    [cartItems, id],
  )

  const count = cartItem?.count ?? 1
  const added = Boolean(cartItem)

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    axios.get(`${BASE_URL}/products/${id}`).then((res) => {
      const item = res.data[0]
      setProduct(item)

      axios
        .get(`${BASE_URL}/categories/${item.categoryId}`)
        .then((res) => setCategory(res.data.category))
    })
  }, [id])

  if (!product || !category) return null

  const { title, price, discont_price, description, image } = product
  const finalPrice = discont_price ?? price

  const discountPercent = discont_price
    ? Math.round(100 - (discont_price / price) * 100)
    : null

  /* ================= CART LOGIC ================= */
  const toggleAdd = () => {
    if (added) {
      dispatch(remove(product.id))
    } else {
      dispatch(add({ id: product.id, count: 1 }))
    }
  }

  const handleIncrease = () => {
    if (!added) {
      dispatch(add({ id: product.id, count: 1 }))
    } else {
      dispatch(increase(product.id))
    }
  }

  const handleDecrease = () => {
    if (added) {
      dispatch(decrease(product.id))
    }
  }

  return (
    <Box sx={{ p: '40px', pb: '80px' }}>
      {/* ================= BREADCRUMBS ================= */}
      <Box sx={{ display: 'flex', gap: '16px', mb: '40px' }}>
        {['Main page', 'Categories', category.title, title].map((text, i) => (
          <Box
            key={i}
            sx={{
              px: '16px',
              py: '8px',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid',
              borderColor: i === 3 ? 'rgba(40,40,40,1)' : 'rgba(221,221,221,1)',
              borderRadius: '6px',
              color: i === 3 ? 'rgba(40,40,40,1)' : 'rgba(139,139,139,1)',
            }}
          >
            {text}
          </Box>
        ))}
      </Box>

      {/* ================= CONTENT ================= */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr',
          gap: '32px',
        }}
      >
        {/* IMAGES */}
        <Box sx={{ display: 'flex', gap: '32px' }}>
          <Box
            sx={{
              width: '32%',
              maxWidth: '200px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {[Image1, Image2, Image3].map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img}
                sx={{
                  width: '100%',
                  aspectRatio: '200 / 180',
                  objectFit: 'cover',
                  border: '1px solid rgba(221,221,221,1)',
                  borderRadius: '12px',
                }}
              />
            ))}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={`${BASE_URL}${image}`}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>

        {/* INFO */}
        <Box>
          <Typography sx={{ fontSize: '40px', fontWeight: 700, mb: '32px' }}>
            {title}
          </Typography>

          <Box sx={{ display: 'flex', gap: '16px', mb: '32px' }}>
            <Typography sx={{ fontSize: '64px', fontWeight: 700 }}>
              ${finalPrice}
            </Typography>

            {discont_price && (
              <Typography
                sx={{
                  fontSize: '40px',
                  textDecoration: 'line-through',
                  color: '#8b8b8b',
                }}
              >
                ${price}
              </Typography>
            )}

            {discountPercent && (
              <Box
                sx={{
                  height: '32px',
                  minWidth: '56px',
                  backgroundColor: 'rgba(13,80,255,1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  fontWeight: 600,
                }}
              >
                -{discountPercent}%
              </Box>
            )}
          </Box>

          {/* COUNTER + BUTTON */}
          <Box sx={{ display: 'flex', gap: '32px', mb: '32px' }}>
            <Box sx={{ display: 'flex' }}>
              <Button onClick={handleDecrease} sx={counterBtn}>
                −
              </Button>
              <Box sx={counterValue}>{count}</Box>
              <Button onClick={handleIncrease} sx={counterBtn}>
                +
              </Button>
            </Box>

            <Button
              onClick={toggleAdd}
              sx={{
                flex: 1,
                height: '58px',
                fontSize: '20px',
                fontWeight: 600,
                borderRadius: '6px',
                backgroundColor: added ? '#fff' : 'rgba(13,80,255,1)',
                color: added ? '#000' : '#fff',
                border: added ? '1px solid #000' : 'none',
              }}
            >
              {added ? 'Added' : 'Add to cart'}
            </Button>
          </Box>

          {/* DESCRIPTION */}
          <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: '16px' }}>
            Description
          </Typography>

          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '130%',
              display: expanded ? 'block' : '-webkit-box',
              WebkitLineClamp: expanded ? 'none' : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>

          <Box
            onClick={() => setExpanded((p) => !p)}
            sx={{ mt: '16px', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {expanded ? 'Read less' : 'Read more'}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductItemPage
