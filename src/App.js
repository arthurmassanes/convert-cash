import React, { useState } from 'react';
import './App.css';
import Converter from './components/Converter';

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    width: 'auto'
  },
  container: {
    paddingTop: '20%',
    display: 'flex',
    justifyContent: 'center',
  },
}

const App = () => {
  return (
    <div>
      <div style={styles.container}>
        <Converter />
      </div>
    </div>
  );
}

export default App;
