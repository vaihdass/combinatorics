import JSBI from "jsbi";
import bigDecimal from "js-big-decimal";

export type nkFormulasProps = {
    params: {
      n: number;
      k: number;
    };
};

export type nFormulasProps = {
    params: {
        n: number;
    };
}

export type nArrFormulasProps = {
    params: {
        nArr: number[];
        n: number;
    };
}

export type nmkFormulasProps = {
    params: {
        n: number;
        m: number;
        k: number;
    };
}

export type nmkrFormulasProps = {
    params: {
        n: number;
        m: number;
        k: number;
        r: number;
    };
}

const factorial = (n: number): JSBI => {
    if (n === 0 || n === 1) {
        return JSBI.BigInt(1);
    }

    let result = JSBI.BigInt(1);
    for (let i = 2; i <= n; i++) {
        result = JSBI.multiply(result, JSBI.BigInt(i));
    }

    return result;
}

const placementsNoRepetitions = ({ params: {n, k} }: nkFormulasProps): JSBI => {
    if (k < 0 || k > n) {
        return JSBI.BigInt(-1);
    }

    return JSBI.divide(
        factorial(n),
        factorial(n - k)
    );
}

const placementsWithRepetitions = ({ params: {n, k} }: nkFormulasProps): JSBI => {
    if (k < 0 || k > n) {
        return JSBI.BigInt(-1);
    }

    return JSBI.exponentiate(JSBI.BigInt(n), JSBI.BigInt(k));
}

const permutationsNoRepetitions = ({ params: {n} }: nFormulasProps): JSBI => {
    if (n < 0) return JSBI.BigInt(-1);

    return factorial(n);
}

const permutationsWithRepetitions = ({ params: {nArr, n} }: nArrFormulasProps): JSBI => {
    const sumArr = nArr.reduce((accumulator, current) => accumulator + current, 0);
    if (sumArr < 0 || sumArr !== n) {
        return JSBI.BigInt(-1);
    }
    for (const elem of nArr) {
        if (elem < 0) return JSBI.BigInt(-1);
    }

    const numerator = factorial(n);
    let denominator = JSBI.BigInt(1);

    for (const elem of nArr) {
        denominator = JSBI.multiply(denominator, factorial(elem));
    }

    return JSBI.divide(numerator, denominator);
}

const combinationsNoRepetitions = ({ params: {n, k} }: nkFormulasProps): JSBI => {
    if (k < 0 ) {
        return JSBI.BigInt(-1);
    }

    if (k > n) {
        return JSBI.BigInt(0);
    }

    const numerator = factorial(n);
    const denominator = JSBI.multiply(factorial(k), factorial(n - k));

    return JSBI.divide(numerator, denominator);
}

const combinationsWithRepetitions = ({ params: {n, k} }: nkFormulasProps): JSBI => {
    if (k < 0 || k > n) {
        return JSBI.BigInt(-1);
    }

    return combinationsNoRepetitions({params: {n: n + k - 1, k: k}});
}

const urnModelAll = ({ params: {n, m, k} }: nmkFormulasProps): string => {
    if (k < 0 || m > n || k >= m) {
        return "-1";
    }

    const numerator = JSBI.toNumber(combinationsNoRepetitions({params: {n: m, k: k}}));
    const denominator = JSBI.toNumber(combinationsNoRepetitions({params: {n: n, k: k}}));

    return bigDecimal.round(bigDecimal.divide(numerator, denominator), 16);
}

const urnModelR = ({ params: {n, m, k, r} }: nmkrFormulasProps): string => {
    if (k < 0 || m > n || k >= m || r > k || r < 0) {
        return "-1";
    }

    const numerator = JSBI.toNumber(JSBI.multiply(
        combinationsNoRepetitions({params: {n: m, k: r}}),
        combinationsNoRepetitions({params: {n: n - m, k: k - r}})
    ));
    const denominator = JSBI.toNumber(combinationsNoRepetitions({params: {n: n, k: k}}));

    return bigDecimal.round(bigDecimal.divide(numerator, denominator), 16);
}

export {
    placementsNoRepetitions, placementsWithRepetitions,
    permutationsNoRepetitions, permutationsWithRepetitions,
    combinationsNoRepetitions, combinationsWithRepetitions,
    urnModelAll, urnModelR
};
