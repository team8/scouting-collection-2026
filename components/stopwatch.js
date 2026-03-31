import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Stopwatch = (props) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  
  // Use refs for values that shouldn't trigger re-renders or get reset
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  const start = () => {
    if (!running) {
      // Calculate start time relative to any existing elapsed time
      startTimeRef.current = Date.now() - pausedTimeRef.current;
      setRunning(true);

      intervalRef.current = setInterval(() => {
        // Calculate REAL elapsed time since the start
        setElapsedTime(Date.now() - startTimeRef.current);
        props.setTime(Date.now() - startTimeRef.current); // Update parent component with current time
      }, 16); // ~60fps refresh rate
    }
  };

  const stop = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
      pausedTimeRef.current = Date.now() - startTimeRef.current;
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setElapsedTime(0);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.Header}>Time to Neutral Zone</Text>
      <Text style={{ fontSize: 60, fontVariant: ['tabular-nums'] }}>
        {formatTime(elapsedTime)}
      </Text>
      <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around' }}>
        <TouchableOpacity style={styles.Button} onPress={running ? stop : start}>
            <Text>{running ? "STOP" : "START"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={reset}>
            <Text>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  Button: {
    flex: 1,
    borderRadius: 7,
    borderBottomWidth: 5,
    margin: 10,
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Header: {
    fontWeight: 'bold',
    fontSize: 30,
  },

});

export default Stopwatch;
