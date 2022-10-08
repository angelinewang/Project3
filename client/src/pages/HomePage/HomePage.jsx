import { Link } from 'react-router-dom';
import React from 'react';

function HomePage() {
  return (
  <>
  <div>The Home Page</div>
  <Link to='/detail'>
    <p>Detail Page Link</p>
  </Link>
  
  </>
  )
}

export default HomePage;