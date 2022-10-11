import { Link } from 'react-router-dom';
import React from 'react';

function HomePage() {
  return (
  <>
  <div>The Home Page</div>
  <Link to='/detail/634546889e63d1f8aee569dc'>
    <p>Detail Page Link</p>
  </Link>

  <Link to='/upload'>
    <p>Image Upload Link</p>
  </Link>

  <Link to="/user">
    <p>User Info</p>
  </Link>
  
  </>
  )
}

export default HomePage;