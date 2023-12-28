import React from 'react'

//height,width,styling ke liye use karte hai
function Container({children}) {
  return  <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;

  
}

export default Container