import React from 'react';
import Banner from '../banner/Banner';
import Hero from './Hero';
import WhyJoinClubSphere from './WhyJoinClubSphere';

const Home = () => {
    return (
        <div>
            <h1>this is home</h1>
            <Hero></Hero>
            <Banner></Banner>
            <WhyJoinClubSphere></WhyJoinClubSphere>
        </div>
    );
};

export default Home;