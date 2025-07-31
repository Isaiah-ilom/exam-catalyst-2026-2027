import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const Timer = ({ timeRemaining, onTimeUpdate, isPaused = false, showWarning = false }) => {
  const [displayTime, setDisplayTime] = useState(timeRemaining);

  useEffect(() => {
    setDisplayTime(timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    if (isPaused || displayTime <= 0) return;

    const interval = setInterval(() => {
      setDisplayTime(prev => {
        const newTime = Math.max(0, prev - 1);
        onTimeUpdate(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, displayTime, onTimeUpdate]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (displayTime <= 300) return 'text-red-600 dark:text-red-400';
    if (displayTime <= 600) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-900 dark:text-white';
  };

  const getBackgroundColor = () => {
    if (displayTime <= 300) return 'bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700';
    if (displayTime <= 600) return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700';
    return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
  };

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${getBackgroundColor()} ${showWarning ? 'timer-pulse' : ''}`}>
      {showWarning ? (
        <AlertTriangle className="w-5 h-5 text-red-500" />
      ) : (
        <Clock className="w-5 h-5 text-gray-500" />
      )}
      <span className={`font-mono text-lg font-bold ${getTimerColor()}`}>
        {formatTime(displayTime)}
      </span>
      {isPaused && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">PAUSED</span>
      )}
    </div>
  );
};

export default Timer;