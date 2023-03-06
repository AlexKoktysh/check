import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

function AutocompleteField(props) {
    const [label, setLabel] = useState("");
    const save = (event) => {
        const val = event.currentTarget.innerText;
        props.saveCar(val)
    };
    const newCar = (event) => {
        if (props.item.label === "Наименование товара" && event.target.value.length >= 3) {
            props.getNewCurrencies(event.target.value);
        }
    };
    useEffect(() => {
        switch (props.item.label) {
            case "Наименование товара":
                const obj = props.item.controlValue;
                const index = obj?.indexOf(props.item.value);
                const product = props.item.value !== "" && obj ? obj.find((el) => el === props.item.value) : "";
                if (!product) {
                    const results = {index: props.item?.index || "", label: props.item?.value || ""};
                    return setLabel(results);
                }
                const res = {index: index || "", label: product || ""};
                setLabel(res);
                break;
            case "Номер договора":
                const dogovor = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
                setLabel(dogovor);
                break;
            default:
                break;
        }
    }, [props.item]);
    
    return (
        <Autocomplete
            id="free-solo-demo"
            size="small"
            freeSolo
            loading={props.loader}
            value={label}
            onChange={save}
            options={props.item.currencies?.map((option) => option)}
            renderInput={(params) => {
                return <TextField {...params} label={props.item.label} onChange={newCar} />
            }}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.label, inputValue, { insideWords: true });
                const parts = parse(option.label, matches);
        
                return (
                  <li {...props}>
                    <div>
                      {parts.map((part) => (
                        <span
                          key={part.text}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              }}
        />
    );
}

export default AutocompleteField;