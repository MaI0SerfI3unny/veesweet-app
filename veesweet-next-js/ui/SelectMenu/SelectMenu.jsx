import { useState } from "react"

const SelectMenu = ({ currentValue, setCurrentValue, arrVal }) => {
    const [vision, setVision] = useState(false)
    return(
        <div className='select_main_catalog'>
            <div onClick={() => setVision(!vision)} className='select_main_catalog_header'>
                <p>{currentValue.title.slice(0,14)}</p>
                <img 
                style={{
                    transition:"0.5s",
                    transform: vision ? "rotate(180deg)" : "rotate(0deg)"
                }}
                src="/arrow_select.svg" alt="arrow"/>
            </div>
            {vision ?
                <div className='select_main_catalog_body'>
                    {arrVal.map((el,key) => 
                        <p key={key} onClick={() => {
                            setCurrentValue(el)
                            setVision(false)
                        }}>{el.title}</p>
                    )}
                </div>
            : null}
        </div>
    )
}

export default SelectMenu