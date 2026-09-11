

export function randFloatToInt(rand: number, digits: number): number { // input must be a float between 0 and 1
    return Math.floor(rand * Math.pow(10, digits));
}

export function randFloatToIntString(rand: number, digits: number): string { // input must be a float between 0 and 1
    const intResult: number = randFloatToInt(rand, digits);
    const baseString: string = intResult.toString();
    let leadingZeros: string = "";
    while (leadingZeros.length < digits - baseString.length) {
        leadingZeros += "0";
    }
    return leadingZeros + baseString;
}

