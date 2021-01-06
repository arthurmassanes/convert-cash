import React from 'react';
import './App.css';
import { Header } from 'semantic-ui-react';

import Converter from './components/Converter';

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    width: 'auto'
  },
  header: {
    color: 'white',
    fontSize: 50,
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header style={styles.header}></Header>
        <Converter />
        </div>
      </div>
    </div>
  );
}

export default App;
