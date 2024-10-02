// Import necessary hooks and CSS
import { useState, useEffect, useRef } from "react";
import "./CounterTimer.css";

const CountdownTimer = () => {
  // Declare state variables for the timer value, active status, and pause status
  const [timeInSeconds, setTimeInSeconds] = useState(0); // Stores the timer value in seconds
  const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running
  const [isPaused, setIsPaused] = useState(false); // Tracks if the timer is paused
  const timerRef = useRef(null); // Ref to store the interval ID for clearing the timer

  // Handle user input and convert the entered minutes to seconds
  const handleTimeInput = (event) => {
    const minutes = parseInt(event.target.value, 10);
    setTimeInSeconds(minutes * 60); // Convert entered minutes to seconds
  };

  // Format the remaining time as MM:SS for display
  const formatTime = () => {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0"); // Convert seconds to minutes and format to two digits
    const seconds = String(timeInSeconds % 60).padStart(2, "0"); // Calculate remaining seconds and format to two digits
    return `${minutes} : ${seconds}`; // Return the formatted string in MM:SS format
  };

  // Start the timer by setting it to running and removing the paused state
  const startTimer = () => {
    setIsRunning(true); // Set the timer to running
    setIsPaused(false); // Unpause the timer if it was paused
  };

  // Use useEffect to manage the timer logic whenever isRunning, isPaused, or timeInSeconds changes
  useEffect(() => {
    if (isRunning && !isPaused && timeInSeconds > 0) {
      // If the timer is running, not paused, and has time left
      timerRef.current = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1); // Decrease the time by 1 second
      }, 1000); // Run the interval every 1 second (1000ms)
    } else if (timeInSeconds === 0) {
      // If the time runs out
      clearInterval(timerRef.current); // Clear the interval to stop the timer
      setIsRunning(false); // Deactivate the timer
      alert("Time is up! Would you like to reset the timer?"); // Show a reset confirmation alert
    }
    return () => clearInterval(timerRef.current); // Clean up the interval on unmount or dependency change
  }, [isRunning, isPaused, timeInSeconds]); // The effect depends on isRunning, isPaused, and timeInSeconds

  // Toggle the paused state of the timer
  const togglePause = () => {
    setIsPaused(!isPaused); // If paused, resume; if running, pause
  };

  // Reset the timer by clearing the interval, deactivating it, and resetting the time
  const resetTimer = () => {
    clearInterval(timerRef.current); // Clear the interval to stop the timer
    setIsRunning(false); // Deactivate the timer
    setIsPaused(false); // Unpause if paused
    setTimeInSeconds(0); // Reset the time to 0
  };

  return (
    <div className="countdown-timer">
      {/* Timer title */}
      <h1>Countdown Timer</h1>

      {/* Input field and timer display */}
      <div className="timer-display">
        <input
          type="number"
          placeholder="Enter Time in Minutes"
          onChange={handleTimeInput} // Call handleTimeInput when user types a value
        />
        {/* Display the formatted time */}
        <div>{formatTime()}</div>
      </div>

      {/* Timer control buttons */}
      <div className="timer-controls">
        {/* Start button, disabled if the timer is running and not paused */}
        <button onClick={startTimer} disabled={isRunning && !isPaused}>
          Start
        </button>
        {/* Pause/Resume button, disabled if the timer is not running */}
        <button onClick={togglePause} disabled={!isRunning}>
          {isPaused ? "Resume" : "Pause"} {/* Show 'Resume' if paused, 'Pause' if running */}
        </button>
        {/* Reset button */}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer; // Export the component to use it elsewhere
