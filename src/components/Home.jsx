import React from 'react'

import LatestProducts from './common/LatestProducts';
import FeatureProducts from './common/FeatureProducts';

import Hero from './common/Hero';
import Layout from './common/Layout';


const Home = () => {
  return (
    <>
      <Layout>
        <Hero/>
        <LatestProducts/>
        <FeatureProducts/>
      </Layout>
    </>
  )
}

export default Home