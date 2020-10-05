import React, { Fragment, useEffect } from "react";
import Switches from "./Switch";
import RangeSlider from "./Slider";
import MultipleSelect from "./MultipleSelect";
import Temp from "./Temp";


const Filter = () => {
    const orientation = ["gay", "lesbian", "straight woman", "straight man", "bi"];
    const tags = ['Cooking', 'Art', 'Games'];
    // console.log("filter initiated");
    const countries = ["Finland", "Estonia", "Brazil"];
    return (
        <div>
            <Temp>Temp</Temp>
            <Switches title="Chinese horoscope"></Switches>
            {/* <CustomizedSwitches title="Chinese horoscope">Here</CustomizedSwitches>
            <CustomizedSwitches title="Western horoscope">Here</CustomizedSwitches> */}
            <RangeSlider title="Distance 0 - 20,020 km" min={0} max={20020}>SLider</RangeSlider>
            <RangeSlider title="Age 18 - 120" min={18} max={120}>SLider</RangeSlider>
            <RangeSlider title="Fame rating 0 - 5" min={0} max={5}>SLider</RangeSlider>
            {/* <MultipleSelect names={countries}>Country</MultipleSelect> */}
            <MultipleSelect names={tags} title="Interests">Interests</MultipleSelect>
            {/* <MultipleSelect names={orientation}>Sex orintation</MultipleSelect> */}
        </div>
    );
}

export default Filter;