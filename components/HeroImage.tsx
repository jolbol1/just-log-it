'use client';

import darkPromo from '@/public/images/promo-dark.png';
import lightPromo from '@/public/images/promo-light.png';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export const HeroImage = () => {
  const { resolvedTheme: mode } = useTheme();
  return (
    <>
      <Image
        className="relative rounded-xl"
        alt="Dashboard of site"
        src={mode && mode == 'light' ? lightPromo : darkPromo}
      />
    </>
  );
};
