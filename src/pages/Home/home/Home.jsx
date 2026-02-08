import React from 'react';
import Banner from '../banner/Banner';
import Hero from './Hero';
import WhyJoinClubSphere from './WhyJoinClubSphere';
import Featuredclub from './Featuredclub';

const Home = () => {
    return (
        <div>
            
            <Hero></Hero>
            <Featuredclub></Featuredclub>
            <Banner></Banner>
            <WhyJoinClubSphere></WhyJoinClubSphere>
        </div>
    );
};

export default Home;