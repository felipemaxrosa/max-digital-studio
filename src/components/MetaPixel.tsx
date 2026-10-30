'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// ID do Meta Pixel — defina NEXT_PUBLIC_META_PIXEL_ID para ativar.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

// Só carrega em produção e quando há um ID configurado.
const enabled = process.env.NODE_ENV === 'production' && Boolean(PIXEL_ID);

export function MetaPixel() {
  const pathname = usePathname();
  const firstView = useRef(true);

  // O init já envia o PageView inicial; aqui cuidamos das navegações SPA.
  useEffect(() => {
    if (!enabled) return;
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    if (typeof window.fbq !== 'function') return;
    window.fbq('track', 'PageView');
  }, [pathname]);

  if (!enabled) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- pixel 1x1 de fallback do Meta */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
