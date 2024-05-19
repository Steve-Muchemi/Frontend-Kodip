import React from 'react';
import TipsTricks from '../components/LandingPage/tips-tricks/TipsTricks';
import SubscribeNL from '../components/LandingPage/subscribe-newsletter/SubscribeNL';
import Review from '../components/LandingPage/review/Review';
import Hero from '../components/LandingPage/hero/Hero';
import Recomendation from '../components/LandingPage/recommendation/Recomendation';
import ReadyRent from '../components/LandingPage/ready-rent/ReadyRent';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Recomendation />
      <ReadyRent />
      <Review />
      <TipsTricks />
      <SubscribeNL />
    </div>
  )
}

export default LandingPage