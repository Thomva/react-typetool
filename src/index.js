import React, { useState, useRef, useEffect, useCallback } from 'react';

export const Typer = ({
  text = '',
  classes,
  useDefaultStyle = true,
  startStep = 0,
  stepIntervalMS = 200,
  blink = true,
  blinkIntervalMS = 500,
  onStart,
  onFinish,
  showCaret = true,
  getCaretRef,
  loop = false,
  loopIntervalMS = 2000,
  replay = false,
  startInstantly = true,
}) => {
  const [textToShow, setTextToShow] = useState('');
  const [currentStep, setCurrentStep] = useState(startStep);
  const [shouldShowCaret, setShouldShowCaret] = useState(showCaret);
  const [finishedTyping, setFinishedTyping] = useState(false);
  const caretRef = useRef(null);

  // The default typer style
  const typerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    whiteSpace: 'pre',
  };

  // The default caretStyle
  const caretStyle = {
    width: '2px',
    height: '1.2rem',
    backgroundColor: 'black',
    marginLeft: '.14rem',
    marginBottom: '0.06rem',
  };

  // Show the caret
  const forceShowCaret = () => {
    showCaret && setShouldShowCaret(true);
  };

  // Start typing
  const startTyping = useCallback(() => {
    // Run the onStart callback when typing starts
    if (onStart) onStart();

    // Set the type interval
    let typeInterval;

    typeInterval = setInterval(() => {
      setCurrentStep((step) => {
        // Increase the step when it's smaller than the length of the full text
        if (step < text.length) {
          return step + 1;
        }

        // Clear typeInterval when all characters are shown
        clearInterval(typeInterval);

        // Finish typing
        setFinishedTyping(true);

        return step;
      });

      // Force the caret to show
      forceShowCaret();
    }, stepIntervalMS);

    // Clear typeInterval on unmount
    return () => {
      clearInterval(typeInterval);
    };
  }, [stepIntervalMS, text]);

  // Resets steps and finishedTyping
  const reset = () => {
    setCurrentStep(startStep);
    setFinishedTyping(false);
  }

  // Start typing when startInstantly is true
  useEffect(() => {
    if (!startInstantly) return;
    startTyping();
  }, [startInstantly]);

  // Replay whe the replay property is true
  useEffect(() => {
    if (!replay) return;
    reset();
    startTyping();
    replay = false;
  }, [replay, reset]);

  // Get a reference of the caret
  useEffect(() => {
    if (!caretRef) return;
    if (getCaretRef) getCaretRef(caretRef);
  }, [getCaretRef, caretRef]);

  // Update step when property changes
  useEffect(() => {
    setCurrentStep(startStep);
  }, [startStep]);

  // Update caret when property changes
  useEffect(() => {
    setShouldShowCaret(showCaret);
  }, [showCaret]);

  // Finish typing
  useEffect(() => {
    if (!finishedTyping) return;

    let loopTimeout;

    if (loop) {
      // Wait
      loopTimeout = setTimeout(() => {
        // Reset
        reset();

        // Start typing
        startTyping();
      }, loopIntervalMS);
    }

    // Run the onFinish callback when typing has ended
    if (onFinish) onFinish();

    // Clear loopTimeout on unmount
    return () => {
      clearTimeout(loopTimeout)
    };
  }, [finishedTyping]);

  useEffect(() => {
    // Always show the caret when the 'blink' property changes
    forceShowCaret();

    // Don't set blikInterval when 'blink' or 'showCaret' property is false
    if (!blink || !showCaret) return;

    // Set blinkInterval
    const blinkInterval = setInterval(() => {
      setShouldShowCaret((prev) => !prev);
    }, blinkIntervalMS);

    // Clear blinkInterval on unmount
    return () => {
      clearInterval(blinkInterval);
    };
  }, [blinkIntervalMS, blink, showCaret]);

  // Update the string every step
  useEffect(() => {
    const fullText = text;
    setTextToShow(fullText.substring(0, currentStep));
  }, [currentStep, text]);

  // Make the caret blink by changing the opacity
  useEffect(() => {
    if (!caretRef) return;
    caretRef.current.style.opacity = shouldShowCaret ? 1 : 0;
  }, [shouldShowCaret]);

  return (
    <div
      className={`typer${!!classes ? ` ${classes}` : ''}`}
      style={useDefaultStyle ? typerStyle : {}}
    >
      {textToShow}
      <div
        className={`typer__caret${
          shouldShowCaret ? '' : ' typer__caret--hide'
        }`}
        ref={caretRef}
        style={useDefaultStyle ? caretStyle : {}}
      ></div>
    </div>
  );
};
