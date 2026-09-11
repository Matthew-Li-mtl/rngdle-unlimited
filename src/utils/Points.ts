let pointsJSON: pointInfo[] = [];

interface pointInfo {
    name: string,
    description: string,
    points: number
}

// the variables initialized by initializePointCalculation()
let initializedPointCalculation: boolean = false;
const powerValues: Record<string, number[]> = {} // k^n = powerValues["n"][k]

export function initializePointCalculation(maxDigits: number) { // for expensive one time calculations.
    initializedPointCalculation = true;
    
    const numMaxRounded = Math.pow(10, maxDigits);
    const numMax = numMaxRounded - 1;
    

    // Powers
    const MAX_POWER_TO_CHECK = 20; // don't change this
    const MAX_NUMBER_FOR_POWER_CHECK = 10000; // don't change this, but if you do it won't impact many numbers.
    const trueMaxPower = Math.min( 
        Math.floor( Math.log(MAX_NUMBER_FOR_POWER_CHECK) / Math.log(2) ),
        MAX_POWER_TO_CHECK
    );
    const maxSqrtFloor = Math.floor( Math.sqrt( numMaxRounded ) );
    const trueMaxNumberForPowerCheck = Math.min( maxSqrtFloor, MAX_NUMBER_FOR_POWER_CHECK );

    
    let remainingNumbers: number[] = [];
    for (let i = 0; i < trueMaxNumberForPowerCheck + 1; i++) {
        remainingNumbers.push(i)
    }

    for (let pow = 2; pow < trueMaxPower; pow++) {
        let valuesOfOnePower: number[] = [];
        for (let num = 0; Math.pow(num, pow) < numMax; num++) {
            valuesOfOnePower.push( Math.pow(num, pow) );
        }
        powerValues[pow.toString()] = valuesOfOnePower;
    }



}

type constPointDBType = Record<string, pointInfo>; // string id, NEVER CHANGE IT AFTER DECLARATION

const constPointDB: constPointDBType = {
    "0":
    {
        name: "error",
        description: "error in points calculation",
        points: 0
    },
    "0.1":
    {
        name: "zero",
        description: "something went wrong internally (non-error). zero points",
        points: 0
    },
}

export function constPointLookup(id: string, name: string): pointInfo {
    try {
        if (constPointDB[id]) {
            if (constPointDB[id].name == name) {
                return constPointDB[id]
            }
            throw new Error(`id exists on constPointDB but name ${name} does not match.`);
        }
        throw new Error(`id ${id} does not exist on constPointDB`);
    } catch (error) {
        let errorPointInfo: pointInfo = constPointDB["0"];
        if (error instanceof Error) {
            errorPointInfo.description = error.message
        }
        return errorPointInfo;
    }
}


export function calculatePointsJSON(numString: string) {
    if (!initializedPointCalculation) {
        initializePointCalculation(numString.length);
    }


    const num: number = parseInt(numString);
    const numMaxRounded = Math.pow(10, numString.length);
    const numMax = numMaxRounded - 1;

    if (num === undefined || numString === undefined) {
        return;
    }

    if (numString.length < 1) {
        return;
    }

    //const lastChar: string = numString.at(-1) || ""; // above logic prevents undefined
    //const firstChar: string = numString.at(0) || "";

    if (num < 10) {
        pointsJSON.push({
            name: num.toString(),
            description: `Single digit: ${num.toString}`,
            points: (0.1*(10-num))*numMaxRounded,
        })
    }
    if (num == numMax) {
        pointsJSON.push({
            name: numMax.toString(),
            description: `Maximum number.`,
            points: numMaxRounded,
        })
    }

    const MAX_FACTOR_TO_CHECK = 100; // don't change this

    for (let i = 2; i < MAX_FACTOR_TO_CHECK; i++) {
        if (num % i == 0) {
            pointsJSON.push({
                name: `multiple of ${i}`,
                description: `divisible by ${i}`,
                points: i
            })
        }
    }

    

    // Points

    for (const [pow, valuesOfOnePower] of Object.entries(powerValues)) {
        valuesOfOnePower.forEach((value, ind) => {
            if (num == value) {
                pointsJSON.push({
                    name: `Power of ${pow}`,
                    description: `${num} = ${ind} ^ ${pow}`,
                    points: Math.ceil( numMaxRounded / valuesOfOnePower.length )
                });
            }
        })
    }
    

    // n-of-a-kind calculation

    let digitRepeats: Record<string, number> = {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0
    }

    for (let i = 0; i < numString.length; i++) {
        const digit = numString.at(i) || ""
        digitRepeats[digit]++;
    }

    // formula for probability of combinations of n-of-a-kinds for points?



}