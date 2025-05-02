import React from 'react'
import { useAuthStore } from '../../store/authUser'

export default function HomePage() {
  const {logout} = useAuthStore();
  return (
    <div className='hero-bg h-screen'>
      Home Page

      <button onClick={logout}>Logout </button>
    </div>
  )
}
