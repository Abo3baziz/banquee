import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ['192.168.1.6', 'd-16.tail16190b.ts.net'],
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
