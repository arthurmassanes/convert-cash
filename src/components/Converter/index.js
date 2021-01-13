import React, { useEffect, useState } from 'react';
import {
    Dropdown,
    Button,
    Card,
    Divider,
    Icon,
    Input,
    Message,
    Loader,
} from 'semantic-ui-react';
import axios from 'axios';

import fullCurrencyNames from '../../currencyNames';

const styles = {
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    button: {
        fontSize: 15,
        marginBottom: 20
    },
    card: {
      width: 'auto',
      minHeight: 100,
      borderRadius: 40,
      padding: 80,
      minWidth: '50vh',
    },
    container: {
      paddingTop: '20%',
      display: 'flex',
      justifyContent: 'center'
    },
}

const Converter = () => {
    const [options, setOptions] = useState([]);
    const [currencies, setCurrencies] = useState({});
    const [base, setBase] = useState('USD');
    const [target, setTarget] = useState('EUR');
    const [result, setResult] = useState(`${base} 0 = ${target} 0.00`);
    const [isLoading, setIsLoading] = useState(true);
    const [input, setInput] = useState('');
  
    const isValidInput = () => {
        return (!isNaN(input));
    }

    const swapCurrencies = () => {
        const tmp = base;
        setBase(target);
        setTarget(tmp);
    }

    const computeResult = () => {
        if (currencies?.rates && isValidInput()) {
            const computedResult = input * currencies.rates[target];
            setResult(`${base} ${input || 0} = ${target} ${computedResult.toFixed(2) || 0}`);
        }
    }

    const getFullCurrencyName = () => {
        const fullBase = fullCurrencyNames[base] || base;
        const fullTarget = fullCurrencyNames[target] || target;
        return (`${fullBase} to ${fullTarget}`);
    }

    useEffect(() => {
        computeResult();
    }, [base, input, target, currencies]); //eslint-disable-line

    useEffect(() => {
        computeResult();
        const fetchCurrencies = async () => {
            setIsLoading(true);
            const response = await axios.get(`?base=${base}`);
            setCurrencies(response.data);
            // convert the currencies object into an array for the dropdown component
            setOptions(Object.keys(response.data.rates).map(key => ({ value: key, text: key })));
            // also add the base currency so as to swap easily
            setOptions(options => [...options, { value: base, text: base }]);
            setIsLoading(false);
        }
        fetchCurrencies();
    }, [base]); //eslint-disable-line
    return (<Card style={styles.card}>
        {isLoading ? <Loader active /> : <Card.Content>
        <Card.Header style={{ paddingBottom: 10 }}>currency converter by arthur massanes</Card.Header>
        <Card.Meta>select an amount, a base and a target to convert a currency</Card.Meta>
        <Message size="tiny">Last rates update: {currencies.date}</Message>
        <Divider />
        <Button positive style={styles.button} size="mini" onClick={() => { swapCurrencies() }}>
            Swap currencies <Icon name="arrows alternate horizontal" />
        </Button>
            <div style={styles.inputContainer}>
                <Input
                    value={input}
                    error={!isValidInput()}
                    onChange={(event, { value }) => { setInput(value); computeResult(); }} //eslint-disable-line
                    label={
                        <Dropdown
                        value={base}
                        onChange={(event, { value }) => {setBase(value); computeResult();} }
                        search
                        options={options}
                        />
                    }
                    labelPosition='right'
                    placeholder='Enter amount...'
                />
                <Icon color="grey" size="big" name="arrow alternate circle right outline" />
                <Dropdown
                    value={target}
                    onChange={(event, { value }) => { setTarget(value); computeResult(); }}
                    button
                    search
                    options={options}
                />
            </div>
        <i>{getFullCurrencyName()}</i>
        <Divider/>
        <h1>{result}</h1>
        </Card.Content>}
    </Card>);
}



export default Converter;
