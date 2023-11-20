'use client'
import { useState } from 'react';
import {combinationsNoRepetitions, placementsNoRepetitions} from "@/utils/combinatorics";
import JSBI from "jsbi";

export default function FormulaPage() {
    const [n, setN] = useState('');
    const [k, setK] = useState('');
    const [resultMessage, setResultMessage] = useState('Nothing yet...');

    const handleCalculation = () => {
        const parsedN = parseInt(n, 10);
        const parsedK = parseInt(k, 10);

        if (isNaN(parsedN) || isNaN(parsedK) || parsedN < 0 || parsedK < 0 || parsedN < parsedK) {
            setResultMessage('Incorrect input data! Try again...');
        } else {
            const result = calc(parsedN, parsedK);
            setResultMessage(result);
        }
    };

    const calc = (n: number, k: number): string => {
        const result = placementsNoRepetitions({params: {n, k}})
        return JSBI.equal(result, JSBI.BigInt(-1)) ? 'Incorrect input data! Try again...' : `${result.toString()}`;
    };

    return (
        <div className={"calculation-page"}>
            <h2>Placements (no repetitions)</h2>
            <img src="/placements_n.png" alt=""/>
            <h3>RESULT:</h3>
            <div className={"calculation-page__result-message"}>{resultMessage}</div>
            <div className={"calculation-page__inputs"}>
                <label>
                    N:&nbsp;&nbsp;
                    <input name={"n"} type="text" value={n} onChange={(e) => setN(e.target.value)} />
                </label>
                <br/>
                <label>
                    K:&nbsp;&nbsp;
                    <input type="text" value={k} onChange={(e) => setK(e.target.value)} />
                </label>
            </div>
            <div className="calculation-page__btn-menu">
                <button onClick={handleCalculation}>CALC</button>
            </div>
        </div>
    );
}
