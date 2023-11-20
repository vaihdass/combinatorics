'use client'
import { useState } from 'react';
import {combinationsNoRepetitions, combinationsWithRepetitions, placementsWithRepetitions} from "@/utils/combinatorics";
import JSBI from "jsbi";

export default function FormulaPage() {
    const [n, setN] = useState('');
    const [k, setK] = useState('');
    const [resultMessage, setResultMessage] = useState('Nothing yet...');

    const handleCalculation = () => {
        const parsedN = parseInt(n, 10);
        const parsedK = parseInt(k, 10);

        if (isNaN(parsedN) || isNaN(parsedK) || parsedN < 0 || parsedK < 0) {
            setResultMessage('Incorrect input data! Try again...');
        } else {
            const result = calc(parsedN, parsedK);
            setResultMessage(result);
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCalculation();
        }
    };

    const calc = (n: number, k: number): string => {
        const result = combinationsWithRepetitions({params: {n, k}})
        return JSBI.equal(result, JSBI.BigInt(-1)) ? 'Incorrect input data! Try again...' : `${result.toString()}`;
    };

    return (
        <div className={"calculation-page"}>
            <h2>Combinations (with repetitions)</h2>
    <img src="/combinations_r.png" alt=""/>
        <h3>RESULT:</h3>
    <div className={"calculation-page__result-message"}>{resultMessage}</div>
        <div className={"calculation-page__inputs"}>
        <label>
            N:&nbsp;&nbsp;
    <input name={"n"} type="text" value={n} onChange={(e) => setN(e.target.value)} onKeyDown={handleKeyDown} />
    </label>
    <br/>
    <label>
        K:&nbsp;&nbsp;
    <input type="text" value={k} onChange={(e) => setK(e.target.value)} onKeyDown={handleKeyDown} />
    </label>
    </div>
    <div className="calculation-page__btn-menu">
    <button onClick={handleCalculation}>CALC</button>
        </div>
        </div>
);
}
