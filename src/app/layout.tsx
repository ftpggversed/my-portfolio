// app/layout.tsx
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata = {
  
  title: 'GGVersed | Developer Portfolio',

  
  description: 'The personal portfolio of GGVersed, a passionate frontend developer and designer. Explore my projects, skills, and community contributions.',
  
  
  keywords: ['GGVersed', 'developer', 'portfolio', 'web development', 'frontend', 'Next.js', 'React', 'TypeScript', 'designer'],
  
  
  openGraph: {
    title: 'GGVersed | Developer Portfolio',
    description: 'The personal portfolio of GGVersed, a passionate frontend developer and designer. Explore my projects, skills, and community contributions.',
    url: 'https://ggversed.com', 
    siteName: 'GGVersed Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  
 
  twitter: {
    card: 'summary_large_image',
    title: 'GGVersed | Developer Portfolio',
    description: 'The personal portfolio of GGVersed, a passionate frontend developer and designer. Explore my projects, skills, and community contributions.',
    creator: '@ftpggversed', 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
