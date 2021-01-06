import React, { useEffect, useState } from 'react';
import {
    Dropdown,
    Card,
    Divider,
    Icon,
    Input,
} from 'semantic-ui-react';
import axios from 'axios';

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
      justifyContent: 'center'
    },
}

const options = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
];

const Converter = () => {
    const [currencies, setCurrencies] = useState({});
    const [result, setResult] = useState(0);
    const [input, setInput] = useState('');
  
    const computeResult = () => {
        console.log(currencies);
        setResult(result + 1);
    }

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await axios.get(`?base=USD`);
            setCurrencies(response.data);
            console.log(response.data);
        }
        fetchCurrencies();
    }, []);
    return (
    <Card style={styles.card}>
        <Card.Content>
            <div style={styles.inputContainer}>
                <Input
                    onChange={() => computeResult()}
                    value={input}
                    error={isNaN(input)}
                    onChange={(target, event) => { setInput(event.value); }} //eslint-disable-line
                    label={
                        <Dropdown
                            defaultValue={options[0].value}
                            search
                            options={options}
                        />
                    }
                    labelPosition='right'
                    placeholder='Enter amount...'
                />
                <Icon color="grey" size="big" name="arrow alternate circle right outline" />
                <Dropdown
                    button
                    defaultValue='az'
                    search
                    options={options}
                />
            </div>
        <Divider/>
        <h1>{result}</h1>
        </Card.Content>
    </Card>);
}



export default Converter;
