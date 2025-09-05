import { useState, useEffect, useCallback } from "react"

interface UseIdleTimeOptions {
  timeout?: number // in milliseconds, default 15 minutes
  onIdle?: () => void // callback when idle timeout is reached
  events?: string[] // events to track for activity
  checkInterval?: number // how often to check for idle, default 1 minute
}

export function useIdleTime(options: UseIdleTimeOptions = {}) {
  const {
    timeout = 15 * 60 * 1000, // 15 minutes default
    onIdle,
    events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'],
    checkInterval = 60000 // 1 minute default
  } = options

  const [lastActivity, setLastActivity] = useState(Date.now())
  const [isIdle, setIsIdle] = useState(false)

  const updateActivity = useCallback(() => {
    setLastActivity(Date.now())
    setIsIdle(false)
  }, [])

  const checkIdleTimeout = useCallback(() => {
    const now = Date.now()
    if (now - lastActivity > timeout) {
      setIsIdle(true)
      onIdle?.()
    }
  }, [lastActivity, timeout, onIdle])

  useEffect(() => {
    // Add event listeners for user activity
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true)
    })

    // Check for idle timeout at specified intervals
    const interval = setInterval(checkIdleTimeout, checkInterval)

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true)
      })
      clearInterval(interval)
    }
  }, [events, updateActivity, checkIdleTimeout, checkInterval])

  const resetIdleTimer = useCallback(() => {
    setLastActivity(Date.now())
    setIsIdle(false)
  }, [])

  return {
    lastActivity,
    isIdle,
    resetIdleTimer,
    timeSinceLastActivity: Date.now() - lastActivity
  }
}