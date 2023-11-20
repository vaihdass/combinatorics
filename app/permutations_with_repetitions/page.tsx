'use client'
import { useState } from 'react';
import {permutationsWithRepetitions} from "@/utils/combinatorics";
import JSBI from "jsbi";

export default function FormulaPage() {
    const [inputFields, setInputFields] = useState(['']);
    const [resultMessage, setResultMessage] = useState('Nothing yet...');

    const handleCalculation = () => {
        try {
            const numbers = inputFields.map((value) => {
                const parsedValue = parseInt(value, 10);
                if (isNaN(parsedValue) || parsedValue < 0) {
                    setResultMessage('Incorrect input data! Try again.');
                    throw new Error();
                }
                return parsedValue;
            });

            setResultMessage(calc(numbers));
        } catch (err: any) {
            return;
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCalculation();
        }
    };

    const handleAddField = () => {
        setInputFields([...inputFields, '']);
    };

    const handleRemoveField = () => {
        if (inputFields.length > 1) {
            const updatedFields = inputFields.slice(0, inputFields.length - 1);
            setInputFields(updatedFields);
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedFields = [...inputFields];
        updatedFields[index] = value;
        setInputFields(updatedFields);
    };

    const calc = (numbers: number[]): string => {
        const n = numbers.reduce((accumulator, current) => accumulator + current, 0);
        const result = permutationsWithRepetitions({params: {nArr: numbers, n: n}});
        return JSBI.equal(result, JSBI.BigInt(-1))
            ? 'Incorrect input data! Try again...'
            : `N: ${n}, RESULT: ${result.toString()}`;
    };

    return (
        <div className={"calculation-page"}>
            <h2>Permutations (with repetitions)</h2>
            <img src="/permutations_r.png" alt=""/>
            <h3>RESULT:</h3>
            <div className={"calculation-page__result-message"}>{resultMessage}</div>
            <div className={"calculation-page__inputs"}>
                {inputFields.map((value, index) => (
                    <label key={index}>
                        {index + 1}.&nbsp;&nbsp;
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={handleKeyDown}
                        /><br/>
                    </label>
                ))}
            </div>
            <div className="calculation-page__btn-menu">
                <button onClick={handleAddField}>+</button>
                <button onClick={handleRemoveField}>-</button>
                <button onClick={handleCalculation}>CALC</button>
            </div>
        </div>
    );
}
