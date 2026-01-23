import React from 'react'
import { Box, Typography } from '@mui/material'
import instagramIcon from '../../assets/icons/ic-instagram.svg'
import whatsappIcon from '../../assets/icons/ic-whatsapp.svg'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: '0 40px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '64px',
          lineHeight: '110%',
          color: '#282828',
        }}
      >
        Contact
      </Typography>

      <Box sx={{ display: 'flex', gap: '32px' }}>
        <Box
          sx={{
            flex: '0 0 62%',
            padding: '32px',
            backgroundColor: '#F1F3F4',
            borderRadius: '12px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '130%',
              color: '#8B8B8B',
            }}
          >
            Phone
          </Typography>

          <Typography
            sx={{
              marginTop: '16px',
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '110%',
              color: '#282828',
            }}
          >
            +49 30 915-88492
          </Typography>
        </Box>

        <Box
          sx={{
            flex: '0 0 38%',
            padding: '32px',
            backgroundColor: '#F1F3F4',
            borderRadius: '12px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '130%',
              color: '#8B8B8B',
            }}
          >
            Socials
          </Typography>

          <Box sx={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                width={43}
                height={43}
                style={{
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.1)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              />
            </a>

            <a
              href="https://wa.me/493091588492"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                src={whatsappIcon}
                alt="Whatsapp"
                width={43}
                height={43}
                style={{
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.1)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              />
            </a>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '32px' }}>
        {/* Address */}
        <Box
          sx={{
            flex: '0 0 62%',
            padding: '32px',
            backgroundColor: '#F1F3F4',
            borderRadius: '12px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '130%',
              color: '#8B8B8B',
            }}
          >
            Address
          </Typography>

          <Typography
            sx={{
              marginTop: '16px',
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '110%',
              color: '#282828',
            }}
          >
            Wallstraße 9–13,
            <br />
            10179 Berlin, Deutschland
          </Typography>
        </Box>

        <Box
          sx={{
            flex: '0 0 38%',
            padding: '32px',
            backgroundColor: '#F1F3F4',
            borderRadius: '12px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '130%',
              color: '#8B8B8B',
            }}
          >
            Working Hours
          </Typography>

          <Typography
            sx={{
              marginTop: '16px',
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '110%',
              color: '#282828',
            }}
          >
            24 hours a day
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          aspectRatio: '16 / 9',
        }}
      >
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Wallstraße 9-13 Berlin&output=embed"
          style={{
            width: '100%',
            height: '100%',
            border: 0,
            display: 'block',
          }}
          loading="lazy"
        />
      </Box>
    </Box>
  )
}

export default Footer

