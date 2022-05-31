import React from 'react';

import { Calculator, Controller, Palette, Globe2, SuitClubFill } from "react-bootstrap-icons";
import { PeopleFill, Building, Activity, Search, FilterCircle } from "react-bootstrap-icons";

// Find the icon associated with the category
export default function LeadingIcon(props) {
    const cat = props.cat;
    if (cat === 'Academic') {
        return <Calculator />;
    } else if (cat === 'Active') {
        return <Globe2 />;
    } else if (cat === 'Carpool') {
        return <PeopleFill />;
    } else if (cat === 'Clubs') {
        return <SuitClubFill />
    } else if (cat === 'Creative') {
        return <Palette />;
    } else if (cat === 'Gaming') {
        return <Controller />;
    } else if (cat === 'Volunteer') {
        return <Building />;
    } else {
        return <Activity />;
    }
}
