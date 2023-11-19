type PropsType = {
    key: string;
    value: string;
};
const validationInput = (dataInput: PropsType[]) => {
    let result = {};
    dataInput.map((item) => {
        if (!item.value) result = { ...result, [item.key]: true };
    });

    return result;
};

export default validationInput;
