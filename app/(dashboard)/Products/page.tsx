'use client';
import { Suspense } from 'react';
import Products from './wrapper';

export default function ProductWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  );
}
