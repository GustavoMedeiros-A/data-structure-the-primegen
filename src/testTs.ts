// npx ts-node src/testTs.ts

function quick_sort(arr: number[]): void {
    quick_sort_function(arr, 0, arr.length - 1);
}

function quick_sort_function(arr: number[], low: number, high: number): void {
    if (low >= high) {
        return;
    }

    const pivotIndex = partition(arr, low, high);

    quick_sort_function(arr, pivotIndex + 1, high);
    quick_sort_function(arr, low, pivotIndex - 1);

    console.log(arr);
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];

    let index = low - 1;

    for (let i = low; i < high; ++i) {
        if (arr[i] <= pivot) {
            index++;
            const temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }

    index++;
    arr[high] = arr[index];
    arr[index] = pivot;

    return index;
}

quick_sort([100, 2138, 123, 1, 2, 4, 1237, 21, 2]);
