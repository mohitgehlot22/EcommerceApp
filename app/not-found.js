  'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function NotFound() {

  let router = useRouter()

  useEffect(()=>{
      setTimeout(()=>{
        router.push('/')
      },5000)
  },[])

  return (
    <>This  page is not-found Error</>
    
  )
}
