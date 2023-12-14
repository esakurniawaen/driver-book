export function groupBy<T>(collection: T[], key: keyof T) {
    const groupedResult = collection.reduce((previous, current) => {
        if (!previous[current[key]]) {
            previous[current[key]] = [] as T[];
        }

        previous[current[key]].push(current);
        return previous;
    }, {} as any); 
    return groupedResult;
}

function capitalizeFirstWord(str: string) {
    const firstChar = str.charAt(0).toLocaleUpperCase();
    const restOfStr = str.substring(1).toLocaleLowerCase();

    return `${firstChar}${restOfStr}`;
}

export function capitalizeEveryWord(str: string) {
    return str
        .split(" ")
        .map((word: string) => capitalizeFirstWord(word))
        .join(" ");
}
