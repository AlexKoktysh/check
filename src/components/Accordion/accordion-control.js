import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { useState, useEffect } from "react";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";
import Box from '@mui/material/Box';

function AccordionControl(props) {
    const [expanded, setExpanded] = useState("panel1");
    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            {...props}
        />
        ))(({ theme }) => ({
        maxHeight: "40px",
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
    }));
    const listItemsOne = props.items[0]?.items?.map((item) => {
        return <TextFieldControl item={item} key={item.index} />
    });
    const listItemsTwo = props.items[1]?.items?.map((item) => {
        return <TextFieldControl item={item} key={item.index} />
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="mb-5">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <h3>{props.items[0].name}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    {listItemsOne}
                </AccordionDetails>
            </Accordion>
            <Box sx={{ mb: 4 }}>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <h3>{props.items[1].name}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        {listItemsTwo}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </div>
    );
}

export default AccordionControl;