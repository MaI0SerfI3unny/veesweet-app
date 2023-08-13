import { useState } from "react";
import { RangeSlider } from 'rsuite';

const FilterSlider = ({title, onFunc, min, max}) => {
    const [vision,setVision] = useState(false)
    return(
        <div className='slider_filter_container'>
        <div onClick={() => setVision(!vision)} className='slider_filter_container_header'>
            <p>{title}</p>
            <img 
            style={{
                transition:"0.5s",
                transform: vision ? "rotate(180deg)" : "rotate(0deg)"
            }}
            src="/arrow_select.svg" alt="arrow"/>
        </div>
        {vision && 
            <div>
                <RangeSlider
                max={max}
                onChange={(e) => onFunc(e)}
                defaultValue={[min, max]}
                constraint={([start, end]) => start !== end}
                />
                <div className='equil_start_end'>
                    <div><p>{min}</p></div>
                    <div><p>{max}</p></div>
                </div>
            </div>}

    </div>
    )
}

export default FilterSlider