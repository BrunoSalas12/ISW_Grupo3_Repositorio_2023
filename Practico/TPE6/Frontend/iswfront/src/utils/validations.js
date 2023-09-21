

export const isValid = (object, validations) => {
    const results = {};
    let valid = true;
    Object.keys(validations).forEach(property => {
        const result = validations[property](object, property);
        valid = valid && result;
        results[property] = result;
    })
    return { isValid: valid, results: results };
}

export const nonEmpty = () => {
    return (object, property) => {
        const valid = !!object[property];
        return valid;
    }
}

export const greaterOrEqualThan = (number) => {
    return (object, property) => {
        const valid = !!(Number(object[property]) >= number);
        return valid;
    }
}
