import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Button, TextField, Modal } from '@mui/material'

import { increase, decrease, remove, clear } from '../../redux/slices/cartSlice'

const BASE_URL = 'http://localhost:3333'

const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [showSuccess, setShowSuccess] = useState(false)

  const totalItems = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.count, 0),
    [cartItems],
  )

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, i) => sum + (i.discont_price ?? i.price) * i.count,
        0,
      ),
    [cartItems],
  )

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email.includes('@')) return
    setShowSuccess(true)
  }

  const closeSuccess = () => {
    setShowSuccess(false)
    dispatch(clear())
  }

 if (cartItems.length === 0 && !showSuccess) {
    return (
      <Box sx={{ p: '40px' }}>
        <Typography variant="h3" sx={{ mb: '16px' }}>
          Shopping cart
        </Typography>

        <Typography sx={{ mb: '24px', fontSize: '20px' }}>
          Looks like you have no items in your basket currently.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{ height: '48px' }}
        >
          Continue shopping
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ p: '40px', pb: '80px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h3">Shopping cart</Typography>
          <Button component={Link} to="/products">
            Back to the store
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4 }}>
          <Box>
            {cartItems.map((item) => {
              const price = item.discont_price ?? item.price

              return (
                <Box
                  key={item.id}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    gap: 2,
                    mb: 2,
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                  }}
                >
                  <Button
                    onClick={() => dispatch(remove(item.id))}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      minWidth: 'auto',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#000',
                    }}
                  >
                    ×
                  </Button>

                  <img
                    src={`${BASE_URL}${item.image}`}
                    alt={item.title}
                    width={120}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600} mb={1}>
                      {item.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={() => dispatch(decrease(item.id))}>
                          −
                        </Button>
                        <Typography sx={{ mx: 1 }}>{item.count}</Typography>
                        <Button onClick={() => dispatch(increase(item.id))}>
                          +
                        </Button>
                      </Box>

                      <Box
                        sx={{
                          marginLeft: 'auto',
                          display: 'flex',
                          alignItems: 'flex-end',
                          gap: 1,
                        }}
                      >
                        <Typography fontSize={24} fontWeight={600}>
                          ${(price * item.count).toFixed(2)}
                        </Typography>

                        {item.discont_price && (
                          <Typography
                            sx={{
                              fontSize: '16px',
                              color: '#8b8b8b',
                              textDecoration: 'line-through',
                            }}
                          >
                            ${(item.price * item.count).toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: '12px' }}>
            <Typography variant="h5" mb={1}>
              Order details
            </Typography>

            <Typography mb={2}>{totalItems} items</Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Typography fontSize={24} fontWeight={600}>
                Total
              </Typography>
              <Typography fontSize={32} fontWeight={700}>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <form onSubmit={onSubmit}>
              <TextField
                fullWidth
                label="Name"
                sx={{ mb: 2 }}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <TextField
                fullWidth
                label="Phone number"
                sx={{ mb: 2 }}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <TextField
                fullWidth
                label="Email"
                sx={{ mb: 3 }}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <Button type="submit" fullWidth variant="contained" size="large">
                Order
              </Button>
            </form>
          </Box>
        </Box>
      </Box>

      <Modal open={showSuccess} onClose={closeSuccess}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#0d50ff',
            color: '#fff',
            p: 4,
            width: 420,
            borderRadius: '12px',
          }}
        >
          <Button
            onClick={closeSuccess}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 'auto',
              fontSize: '20px',
              fontWeight: 600,
              color: '#fff',
            }}
          >
            ×
          </Button>

          <Typography variant="h5" fontWeight={600} mb={2}>
            Congratulations!
          </Typography>

          <Typography>
            Your order has been successfully placed on the website.
            <br />A manager will contact you shortly to confirm your order.
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default CartPage
