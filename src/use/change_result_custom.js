import moment from "moment";

export const changeDogovorDictionary_result_custom = (element) => {
    switch (element.fieldName) {
        case "doc_number":
            const field_name = element.currencies?.find((el) => el.label === element.value)?.label || "";
            return { fieldName: element.fieldName, value: field_name };
        case "invoce_start_date":
            const date = moment(element.value, "YYYY-MM-DD").format("DD.MM.YYYY")
            return { fieldName: element.fieldName, value: date };
        case "doc_start_date":
            const date_new = moment(element.value, "YYYY-MM-DD").format("DD.MM.YYYY")
            return { fieldName: element.fieldName, value: date_new };
        default:
            return {fieldName: element.fieldName, value: element.value}
    }
};

export const changeMapper = (items) => {
    const result = items?.map((element) => {
        return {fieldName: element.fieldName, value: element.value}
    });
    return result;
};

export const changeCommodity = (response, fieldName, parenValue, commodityDictionary, currency) => {
    const obj = Object.values(response?.commodityDictionary);
    const findItem = obj.find((el) => el.product_name === parenValue);
    let item = null;
    if (findItem) {
        item = obj.find((el) => el.product_name === parenValue)[fieldName];
        if (fieldName === "product_price") {
            const price = item ? item[currency] : "";
            return price ? `${price}` : "";
        }
        return item ? `${item}` : "";
    } else {
        return "";
    }
};
export const changeDogovor = (response, fieldName, parenValue) => {
    if (fieldName === "doc_start_date") {
        return response?.dogovorDictionary.find((el) => el.doc_number === parenValue)?.doc_start_date || "";
    }
};