import React from 'react'
import LandingPage from './LandingPage'
import HomePage from './HomePage'
import { useAuthStore } from '../../store/authUser'

export default function HomeScreen() {
    const {user} = useAuthStore();
  return (
    <div>{user ? <HomePage/> : <LandingPage/>}</div>
  )
}
