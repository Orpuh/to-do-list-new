import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

interface CountdownTimerProps {
  deadline: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      
      if (deadlineDate <= now) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = differenceInDays(deadlineDate, now);
      const hours = differenceInHours(deadlineDate, now) % 24;
      const minutes = differenceInMinutes(deadlineDate, now) % 60;
      const seconds = differenceInSeconds(deadlineDate, now) % 60;

      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const getColor = () => {
    const days = timeLeft.days;
    if (days > 7) return '#4caf50'; // Green
    if (days > 2) return '#ff9800'; // Amber
    if (days > 1) return '#ef5350'; // Light red
    return '#d32f2f'; // Dark red
  };

  return (
    <Typography 
      variant="body2" 
      sx={{ 
        color: getColor(),
        fontWeight: 'bold'
      }}
    >
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </Typography>
  );
}; 