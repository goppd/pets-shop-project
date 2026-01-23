import React, { useState } from 'react'
import dogsImage from '../../assets/images/dogs.svg'
import { Box, Typography, TextField, Button } from '@mui/material'

const Discount = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Discount form data:', form)

    setForm({
      name: '',
      phone: '',
      email: '',
    })
  }
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: 'rgba(13, 80, 255, 1)',
        borderRadius: '12px',
        padding: '32px 32px 0',
        marginBottom: '80px',
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: '64px',
          fontWeight: 700,
          lineHeight: '110%',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'center',
        }}
      >
        5% off on the first order
      </Typography>

      <Box
        sx={{
          display: 'flex',
          // justifyContent: 'space-between',
          alignItems: 'stretch',
          flexWrap: 'wrap', // 👈 для адаптива
        }}
      >
        <Box
          sx={{
            flex: '1 1 55%',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box
            component="img"
            src={dogsImage}
            alt="dogs"
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: '1 1 35%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '32px 0 32px 32px',
          }}
        >
          {[
            { name: 'name', placeholder: 'Name' },
            { name: 'phone', placeholder: 'Phone number' },
            { name: 'email', placeholder: 'Email' },
          ].map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  sx: {
                    backgroundColor: 'rgba(36, 81, 198, 1)',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    padding: '16px 32px',
                    fontSize: '20px',

                    '& input': {
                      color: 'rgba(255, 255, 255, 1)',
                    },
                    '& input::placeholder': {
                      color: 'rgba(255, 255, 255, 1)',                     
                    },
                  },
                },
              }}
            />
          ))}

          <Button
            type="submit"
            sx={{
              mt: '16px',
              padding: '16px 32px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: 'rgba(40, 40, 40, 1)',
              fontSize: '20px',
              fontWeight: 600,
              textTransform: 'none',

              '&:hover': {
                backgroundColor: '#f2f2f2',
              },
            }}
          >
            Get a discount
          </Button>
        </Box>
      </Box>
    </Box>
   
  )
}
export default Discount
