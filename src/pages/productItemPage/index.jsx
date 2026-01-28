import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Button } from '@mui/material'

import Image1 from '../../assets/images/image1.svg'
import Image2 from '../../assets/images/image2.svg'
import Image3 from '../../assets/images/image3.svg'

const BASE_URL = 'http://localhost:3333'

const ProductItemPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [count, setCount] = useState(1)
  const [added, setAdded] = useState(false)
  const [expanded, setExpanded] = useState(false)

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

  return (
    <Box sx={{ p: '40px', pb: '80px' }}>
      <Box sx={{ display: 'flex', gap: '16px', mb: '40px' }}>
        {['Main page', 'Categories', category.title, title].map((text, i) => (
          <Box
            key={i}
            sx={{
              px: '16px',
              py: '8px',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '130%',
              border: '1px solid',
              borderColor: i === 3 ? 'rgba(40,40,40,1)' : 'rgba(221,221,221,1)',
              borderRadius: '6px',
              color: i === 3 ? 'rgba(40,40,40,1)' : 'rgba(139,139,139,1)',
              whiteSpace: 'nowrap',
            }}
          >
            {text}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr',
          gap: '32px',
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ display: 'flex', gap: '32px', height: '100%' }}>
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

          <Box sx={{ flex: 1, display: 'flex' }}>
            <Box
              component="img"
              src={`${BASE_URL}${image}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{
              fontSize: '40px',
              fontWeight: 700,
              lineHeight: '110%',
              mb: '32px',
              color: 'rgba(40,40,40,1)',
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', gap: '16px', mb: '32px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              <Typography sx={{ fontSize: '64px', fontWeight: 700 }}>
                ${finalPrice}
              </Typography>
              {discont_price && (
                <Typography
                  sx={{
                    fontSize: '40px',
                    textDecoration: 'line-through',
                    color: 'rgba(139,139,139,1)',
                  }}
                >
                  ${price}
                </Typography>
              )}
            </Box>

            {discont_price && (
              <Box
                sx={{
                  height: '32px', 
                  minWidth: '56px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 

                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: '130%',

                  borderRadius: '6px',
                  backgroundColor: 'rgba(13,80,255,1)',
                  color: '#fff',

                  transform: 'translateY(-12px)',
                  flexShrink: 0, 
                }}
              >
                -{discountPercent}%
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: '32px', mb: '32px' }}>
            <Box sx={{ display: 'flex' }}>
              <Button
                onClick={() => setCount((p) => Math.max(1, p - 1))}
                sx={counterBtn}
              >
                −
              </Button>
              <Box sx={counterValue}>{count}</Box>
              <Button onClick={() => setCount((p) => p + 1)} sx={counterBtn}>
                +
              </Button>
            </Box>

            <Button
              onClick={() => setAdded((p) => !p)}
              sx={{
                flex: 1,
                height: '58px',
                fontSize: '20px',
                fontWeight: 600,
                borderRadius: '6px',
                backgroundColor: added ? '#fff' : 'rgba(13,80,255,1)',
                color: added ? 'rgba(40,40,40,1)' : '#fff',
                border: added ? '1px solid rgba(40,40,40,1)' : 'none',
                '&:hover': {
                  backgroundColor: added ? '#fff' : 'rgba(40,40,40,1)',
                },
              }}
            >
              {added ? 'Added' : 'Add to cart'}
            </Button>
          </Box>

          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: '16px' }}>
              Description
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                lineHeight: '130%',
                color: 'rgba(40,40,40,1)',
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
              sx={{
                mt: '16px',
                fontSize: '16px',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {expanded ? 'Read less' : 'Read more'}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

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

export default ProductItemPage
