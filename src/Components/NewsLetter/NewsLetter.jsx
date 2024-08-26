import React from 'react'
import './NewsLetter.css'

 export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive offer on your E-mail</h1>
        <p>Subscribe our NewsLetter and Stay upadated.</p>
        <div>
            <input type="Email" placeholder='Your Email-id' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter