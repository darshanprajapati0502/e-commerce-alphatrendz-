import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import ProductGrid from '../ProductGrid'


export const Shop = () => {
  return (
    <>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
      <ProductGrid />
      
    </>
  );
} 
export default Shop 
