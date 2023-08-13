export const countOccurrences = (arr, value) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++)
        if (arr[i] == value) count++
    return count;
}