'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../operation-deadlight.module.css'

interface ActLockProps {
  locked: boolean
  unlockedBy: string
  children: React.ReactNode
}

export function ActLock({ locked, unlockedBy, children }: ActLockProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!locked && containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [locked])

  if (locked) {
    return (
      <div className={styles.actLockOverlay} style={{ minHeight: '100vh', position: 'relative' }}>
        <div className={styles.actLockCard}>
          <div className={styles.actLockIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className={styles.actLockTitle}>SECTOR LOCKED</p>
          <p className={styles.actLockMessage}>
            Complete to breach:<br />
            <em>{unlockedBy}</em>
          </p>
          <div className={styles.actLockScanline} />
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

