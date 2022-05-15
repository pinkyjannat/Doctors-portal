import React from 'react';
import Testimonials from '../Testimonials';
import Banner from './Banner';
import Contact from './Contact';
import Footer from '../shared/Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';

const Home = () => {
    return (
        <div>
         <Banner></Banner>
         <Info></Info>
         <Services></Services>
         <MakeAppointment></MakeAppointment>
         <Testimonials></Testimonials>
         <Contact></Contact>
         <Footer></Footer>
        </div>
    );
};

export default Home;