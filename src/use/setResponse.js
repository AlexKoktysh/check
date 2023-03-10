import { commodityDictionary_default } from "../constants";

export const setResponseMapper = (items, response) => {
    const result = items?.map((element) => setResponse_custom(element, response));
    return result;
};
export const changeLabel = (items, value) => {
    const result = items?.map((element) => {
        const element_name = element.fieldName;
        switch (element_name) {
            case "product_price":
                return {...element, label: `${commodityDictionary_default[3].label} ${value}`};
            case "product_cost":
                return {...element, label: `${commodityDictionary_default[4].label} ${value}`};
            case "invoice_product_vat_sum":
                return {...element, label: `${commodityDictionary_default[6].label} ${value}`};
            case "product_cost_with_vat":
                return {...element, label: `${commodityDictionary_default[7].label} ${value}`};
            default:
                return element;
        }
    });
    return result;
};
export const getValueLabel = (value) => {
    switch(value) {
        case 2:
            return "BYN";
        case 3:
            return "RUB";
        case 4:
            return "USD";
        case 5:
            return "EUR";
        default:
            return null;
    }
};

const setResponse_custom = (element, response) => {
    const element_name = element.fieldName;
    switch (element_name) {
        case "docNumber":
            return getLabel(element, response?.docNumber);
        case "doc_number":
            return getCurrencies(element, response?.dogovorDictionary, true, "doc_number", response?.dogovorDictionary);
        case "product_name":
            return getCurrencies(element, response?.commodityDictionary, true, "product_name", response?.commodityOptions);
        default:
            return element;
    }
};
const getCurrencies = (element, response, isControl, label, control_response) => {
    const isArray = Array.isArray(response);
    const mapEntity = response && !isArray ? Object.values(response) : response || [];
    return {
        ...element,
        currencies: mapEntity?.map((el, index) => {
            return { index: index, label: label ? el[label] : el, invoice_max_qty: el.ttnProductQty || "" };
        }) || [],
        controlValue: isControl ? control_response : "",
    };
};
const getLabel = (element, response) => {
    return {
        ...element,
        value: response || "",
        disabled: response ? true : false,
    };
};