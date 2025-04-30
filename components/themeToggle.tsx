"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    
    // Add a slight delay to make the animation visible
    setTimeout(() => {
      if (theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
      
      // Reset animation state after the transition
      setTimeout(() => {
        setIsAnimating(false)
      }, 600)
    }, 150)
  }

  if (!mounted) {
    return null
  }

  const isChecked = theme === 'light'
  
  return (
    <label 
      className={`switch ${isAnimating ? 'animate-pulse' : ''}`}
      style={{ 
        transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.3s ease'
      }}
    >
      <input 
        checked={isChecked} 
        onChange={toggleTheme}
        type="checkbox" 
      />
      <span className="slider">
        <div className="star star_1"></div>
        <div className="star star_2"></div>
        <div className="star star_3"></div>
        <svg viewBox="0 0 16 16" className="cloud">
          <path
            transform="matrix(.77976 0 0 .78395-299.99-418.63)"
            fill="#fff"
            d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
          ></path>
        </svg>
      </span>
    </label>
  )
}
