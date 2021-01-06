import React, { useEffect, useState } from 'react';
import {
    Dropdown,
    Card,
    Divider,
    Icon,
    Input,
    Loader,
} from 'semantic-ui-react';
import axios from 'axios';

const styles = {
    inputContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    card: {
      width: 'auto',
      minHeight: 100,
      minWidth: 200,
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
    const computeResult = () => {
        if (currencies?.rates && isValidInput()) {
            console.log(currencies, base, target);
            const computedResult = input * currencies.rates[target];
            setResult(`${base} ${input || 0} = ${target} ${computedResult.toFixed(2)}`);
        }
    }
    useEffect(() => {
        computeResult();
    }, [base, input, target, currencies]);

    useEffect(() => {
        computeResult();
        const fetchCurrencies = async () => {
            setIsLoading(true);
            const response = await axios.get(`?base=${base}`);
            setCurrencies(response.data);
            setOptions(Object.keys(response.data.rates).map(key => ({ value: key, text: key })));
            setBase(base);
            console.log(options);
            setIsLoading(false);
        }
        fetchCurrencies();
    }, [base]);
    return (<Card style={styles.card}>
        {isLoading ? <Loader active /> : <Card.Content>
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
        <Divider/>
        <h1>{result}</h1>
        </Card.Content>}
    </Card>);
}



export default Converter;
