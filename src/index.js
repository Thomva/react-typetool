import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'

export const Typer = ({
  text,
  stepIntervalMS = 200,
  classes,
  blink = true,
  blinkIntervalMS = 500,
  onFinish,
  showCaret = true,
  getCaretRef
}) => {
  const [textToShow, setTextToShow] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [shouldShowCaret, setShouldShowCaret] = useState(showCaret)
  const [finishedTyping, setFinishedTyping] = useState(false)
  const caretRef = useRef(null)

  // Show the caret
  const forceShowCaret = () => {
    showCaret && setShouldShowCaret(true)
  }

  // Get a reference of the caret
  useEffect(() => {
    if (!caretRef) return
    if (getCaretRef) getCaretRef(caretRef)
  }, [getCaretRef, caretRef])

  // Update caret when property changes
  useEffect(() => {
    setShouldShowCaret(showCaret)
  }, [showCaret])

  useEffect(() => {
    if (!finishedTyping) return

    // Run the onFinish callback when typing has ended
    if (onFinish) onFinish()
  }, [finishedTyping])

  useEffect(() => {
    // Always show the caret when the 'blink' property changes
    forceShowCaret()

    // Don't set blikInterval when 'blink' or 'showCaret' property is false
    if (!blink || !showCaret) return

    // Set blinkInterval
    const blinkInterval = setInterval(() => {
      setShouldShowCaret((prev) => !prev)
    }, blinkIntervalMS)

    // Clear blinkInterval on unmount
    return () => {
      clearInterval(blinkInterval)
    }
  }, [blinkIntervalMS, blink, showCaret])

  useEffect(() => {
    // Set the type interval
    const typeInterval = setInterval(() => {
      setCurrentStep((step) => {
        // Increase the step when it's smaller than the length of the full text
        if (step < text.length) {
          return step + 1
        }

        // Clear typeInterval when all characters are shown
        clearInterval(typeInterval)

        // Finish typing
        setFinishedTyping(true)

        return step
      })

      // Force the caret to show
      forceShowCaret()
    }, stepIntervalMS)

    // Clear typeInterval on unmount
    return () => {
      clearInterval(typeInterval)
    }
  }, [stepIntervalMS, text])

  // Update the string every step
  useEffect(() => {
    const fullText = text
    setTextToShow(fullText.substring(0, currentStep))
  }, [currentStep, text])

  return (
    <div className={`typer${classes && ` ${classes}`}`}>
      {textToShow}
      <div
        className={`typer__caret${!shouldShowCaret && ' typer__caret--hide'}`}
        ref={caretRef}
      ></div>
    </div>
  )
}
