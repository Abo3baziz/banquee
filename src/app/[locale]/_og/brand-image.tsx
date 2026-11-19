import { ImageResponse } from 'next/og'

export const alt = 'Banquee — Modern banking for digital living'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#5BB5A2',
        color: '#1A1C1C',
        padding: '80px 96px',
        fontFamily: 'Sora, Inter, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          opacity: 0.75,
        }}
      >
        Digital banking
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 168,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
          }}
        >
          Banquee
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 44,
            lineHeight: 1.3,
            maxWidth: 820,
          }}
        >
          Modern banking for digital living.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          fontSize: 26,
          opacity: 0.75,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 56,
            height: 6,
            borderRadius: 999,
            backgroundColor: '#1A1C1C',
          }}
        />
        <div style={{ display: 'flex' }}>
          Instant transfers · Card controls · Savings goals
        </div>
      </div>
    </div>,
    size,
  )
}
