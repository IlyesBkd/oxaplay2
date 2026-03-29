import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|de|en|es|it)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)']
};
