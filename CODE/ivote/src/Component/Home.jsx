import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageSlider from './ImageSlider';
import ViewParticipants from './ViewParticipants';

const Home = () => {
  return (
    <div>
      <Navbar />
      <ImageSlider />
      <ViewParticipants />

      
      <Footer  />
    </div>
  );
};

export default Home;
