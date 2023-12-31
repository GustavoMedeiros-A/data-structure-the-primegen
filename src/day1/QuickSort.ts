function quick_sort_function(arr: number[], low: number, high: number): void {
    if (low >= high) {
        return;
    }

    const pivotIndex = partition(arr, low, high);

    // Run the algorithm in one side
    quick_sort_function(arr, low, pivotIndex - 1);
    // Run the algorithm in other side
    quick_sort_function(arr, pivotIndex + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];

    let index = low - 1;

    for (let i = low; i < high; ++i) {
        if (arr[i] <= pivot) {
            index++;
            //swapping
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

export default function quick_sort(arr: number[]): void {
    quick_sort_function(arr, 0, arr.length - 1);
}
