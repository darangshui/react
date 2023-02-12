import React from 'react';
import Counter from './Counter';
import './App.css';

function App() {

  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    initialValue: 5,
  }
  return (
    <Counter 
      {...counterProps}
    />
  );
}

export default App;
