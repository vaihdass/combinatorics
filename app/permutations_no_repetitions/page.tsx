'use client'
import { useState } from 'react';
import {permutationsNoRepetitions, placementsWithRepetitions} from "@/utils/combinatorics";
import JSBI from "jsbi";

export default function FormulaPage() {
    const [n, setN] = useState('');
    const [resultMessage, setResultMessage] = useState('Nothing yet...');

    const handleCalculation = () => {
        const parsedN = parseInt(n, 10);

        if (isNaN(parsedN) || parsedN < 0) {
            setResultMessage('Incorrect input data! Try again...');
        } else {
            const result = calc(parsedN);
            setResultMessage(result);
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCalculation();
        }
    };

    const calc = (n: number): string => {
        const result = permutationsNoRepetitions({params: {n}})
        return JSBI.equal(result, JSBI.BigInt(-1)) ? 'Incorrect input data! Try again...' : `${result.toString()}`;
    };

    return (
        <div className={"calculation-page"}>
            <h2>Permutations (no repetitions)</h2>
            <img src="/permutations_n.png" alt=""/>
            <h3>RESULT:</h3>
            <div className={"calculation-page__result-message"}>{resultMessage}</div>
            <div className={"calculation-page__inputs"}>
                <label>
                    N:&nbsp;&nbsp;
                    <input name={"n"} type="text" value={n} onChange={(e) => setN(e.target.value)} onKeyDown={handleKeyDown} />
                </label>
            </div>
            <div className="calculation-page__btn-menu">
                <button onClick={handleCalculation}>CALC</button>
            </div>
        </div>
    );
}
