import React from 'react';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
import Sidebar from './Sidebar'; // Assuming you have a Sidebar component
import './styles.css'; // Update the path as needed

const IndexPage = () => {
  return (
    <div id="main-content">
      <Header />
      <Sidebar />
      <section id="landing">
        {/* ... Content of landing section ... */}
      </section>
      <section id="about">
        {/* ... Content of about section ... */}
      </section>
      <section id="how-it-works">
        {/* ... Content of how-it-works section ... */}
      </section>
      <section id="cta">
        {/* ... Content of call-to-action section ... */}
      </section>
      <Footer />
    </div>
  );
};

export default IndexPage;
