'use client'
import { useState } from 'react';
import {
    combinationsNoRepetitions,
    combinationsWithRepetitions,
    placementsWithRepetitions,
    urnModelAll, urnModelR
} from "@/utils/combinatorics";
import JSBI from "jsbi";

export default function FormulaPage() {
    const [n, setN] = useState('');
    const [k, setK] = useState('');
    const [m, setM] = useState('');
    const [r, setR] = useState('');
    const [resultMessage, setResultMessage] = useState('Nothing yet...');

    const handleCalculation = () => {
        const parsedN = parseInt(n, 10);
        const parsedK = parseInt(k, 10);
        const parsedM = parseInt(m, 10);
        const parsedR = parseInt(r, 10);

        if (isNaN(parsedN) || isNaN(parsedK) || isNaN(parsedM) || isNaN(parsedR) || parsedR < 0 || parsedN < 0 || parsedK < 0 || parsedN < parsedK || parsedK < parsedR) {
            setResultMessage('Incorrect input data! Try again...');
        } else {
            const result = calc(parsedN, parsedK, parsedM, parsedR);
            setResultMessage(result);
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCalculation();
        }
    };

    const calc = (n: number, k: number, m: number, r: number): string => {
        const result = urnModelR({params: {n, m, k, r}})
        return result === "-1" ? 'Incorrect input data! Try again...' : `${result.toString()}`;
    };

    return (
        <div className={"calculation-page"}>
            <h2>Url model (get R marked)</h2>
            <p>Имеются <strong>N</strong> предметов, среди которых <strong>M</strong> меченых.<br/>
                Наугад извлекаются <strong>K</strong> предметов (k {"<"} m).<br/>
                Вероятность того, что среди извлеченных предметов окажутся <strong>R</strong> меченых, равна:</p>
            <img src="/urn_part.png" alt=""/>
            <h3>RESULT:</h3>
            <div className={"calculation-page__result-message"}>{resultMessage}</div>
            <div className={"calculation-page__inputs"}>
                <label>
                    N:&nbsp;&nbsp;
                    <input name={"n"} type="text" value={n} onChange={(e) => setN(e.target.value)} onKeyDown={handleKeyDown} />
                </label>
                <br/>
                <label>
                    M:&nbsp;&nbsp;
                    <input type="text" value={m} onChange={(e) => setM(e.target.value)} onKeyDown={handleKeyDown} />
                </label>
                <br/>
                <label>
                    K:&nbsp;&nbsp;
                    <input type="text" value={k} onChange={(e) => setK(e.target.value)} onKeyDown={handleKeyDown} />
                </label>
                <br/>
                <label>
                    R:&nbsp;&nbsp;
                    <input type="text" value={r} onChange={(e) => setR(e.target.value)} onKeyDown={handleKeyDown} />
                </label>
            </div>
            <div className="calculation-page__btn-menu">
                <button onClick={handleCalculation}>CALC</button>
            </div>
        </div>
    );
}
