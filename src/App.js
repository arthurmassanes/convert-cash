import React from 'react';
import './App.css';

import Converter from './components/Converter';

const styles = {
  container: {
    paddingTop: '10%',
    display: 'flex',
    justifyContent: 'center',
  },
}

const App = () => {
  return (
    <div>
      <div style={styles.container}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Converter />
        </div>
      </div>
    </div>
  );
}

export default App;
