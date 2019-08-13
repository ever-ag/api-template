export default <T extends { [index: string]: any }>(filter: Partial<T>) => (modelValue: T) => {
    let isMatch = true;
    Object.keys(filter).forEach((key: keyof T) => {
        if (modelValue[key] !== filter[key]) {
            isMatch = false;
        }
    });
    return isMatch;
};
