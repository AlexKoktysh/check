import axios from "axios";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTAyOTIxMjEsIkFwcGxpY2F0aW9uIjoiUnVrb3ZvZGl0ZWwifQ.tdUIEg-hrhP2dRQHL1r6x3raC2GZ8qu0utwrTC8zUBk";

const instance = axios.create({
    baseURL: `https://portal.liloo.by/api/services/invoice/`,
    headers: {
        Authorization : `Bearer ${token}`,
    },
});
const instance_commodity = axios.create({
    baseURL: `https://portal.liloo.by/api/services/`,
    headers: {
        Authorization : `Bearer ${token}`,
    },
});
instance.interceptors.response.use(
    (response) => response,
    (error) => checkError(error)
);
instance_commodity.interceptors.response.use(
    (response) => response,
    (error) => checkError(error)
);
const checkError = (error) => {
    alert(error.message);
};

export const getDataForCreateTtn = async () => {
    const response = await instance.post("get_data_for_create");
    return response.data;
};

export const sendTemplate = async (params) => {
    const json = {...params};
    const response = await instance.post("fill_template", json);
    return response.data;
};

export const addSample = async (params) => {
    const json = {...params};
    const response = await instance.post("create", json);
    return response.data;
};

export const sendCommodityDictionary = async (params) => {
    const json = {...params};
    const response = await instance.post("add_position", json);
    return response.status === 200;
};

export const showSection = async (section) => {
    const response = await instance.post("show_section", { "position": section, "invoice_type": "invoice" });
    return response;
};

export const deleteSection = async (section) => {
    const response = await instance.post("remove_position", { "position": section, "invoice_type": "invoice" });
    return { status: response.status === 200, "message": response.data["ajax-response"] };;
};

export const updateCommodityDictionary = async (params) => {
    const json = {...params};
    await instance.post("update_section", json);
};

export const getCommodityDictionary = async (searchText) => {
    const response = await instance_commodity.post("get_commodity_dictionaries",  { filter: searchText });
    return response.data;
};