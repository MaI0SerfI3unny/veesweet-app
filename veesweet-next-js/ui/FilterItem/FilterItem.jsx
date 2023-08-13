import { useState } from "react"
import Checkbox from "../Checkbox/Checkbox"

const FilterItem = ({title, arr, size, setSize}) => {
    const [vision,setVision] = useState(false)
    const changeFunc = (val) => {
        const findVal = size.some((e) => e === val)
        if(!findVal)
        {
            setSize([...size, val]);
        }else{
            setSize(size.filter((e) => e !== val))
        }
    }

    return(
        <div className='chooser_list_container'>
        <div 
            onClick={() => setVision(!vision)} 
            className='chooser_list_container_header'>
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
                {arr.map((el,key) => 
                    <Checkbox 
                        key={key}
                        changeFunc={changeFunc}
                        title={el} 
                        size={size} 
                        setSize={setSize}/>)}
            </div>}
    </div>
    )
}

export default FilterItem