export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jumpAmount; // I is Square of N

    //Check for breaks
    for (; i < breaks.length; i += jumpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    //Just back a Square root of N
    i -= jumpAmount;

    //Linearly walk forward at most, a square root of N until we find a break
    for (let j = 0; j < jumpAmount && i < breaks.length; ++j, ++i) {
        if (breaks[i]) {
            // Return the index of break
            return i;
        }
    }
    return -1;
}
