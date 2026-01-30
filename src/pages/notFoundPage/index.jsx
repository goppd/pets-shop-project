import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import dogImg from '../../assets/images/page404.svg'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '32px',
        px: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <Typography
          sx={{
            fontSize: '148px',
            fontWeight: 700,
            color: 'rgba(13, 80, 255, 1)',
            lineHeight: '110%',
          }}
        >
          4
        </Typography>

        <Box
          component="img"
          src={dogImg}
          alt="404 dog"
          sx={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
          }}
        />

        <Typography
          sx={{
            fontSize: '148px',
            fontWeight: 700,
            color: 'rgba(13, 80, 255, 1)',
            lineHeight: '110%',
          }}
        >
          4
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: '32px',
          fontWeight: 600,
          color: 'rgba(40, 40, 40, 1)',
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        sx={{
          maxWidth: '420px',
          fontSize: '16px',
          lineHeight: '130%',
          color: 'rgba(139,139,139,1)',
        }}
      >
        We’re sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: '16px',
          height: '48px',
          px: '32px',
          fontSize: '16px',
          fontWeight: 500,
          textTransform: 'none',
          backgroundColor: 'rgba(13, 80, 255, 1)',

          '&:hover': {
            backgroundColor: 'rgba(40,40,40,1)',
          },
        }}
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </Box>
  )
}

export default NotFoundPage
