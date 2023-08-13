const RadioButtonCheckout = ({ title, val, currentValue, setVal }) => {
    const onChangeFunc = () => {
        setVal(val)
    }
    return(
        <div 
            onClick={() => onChangeFunc()} 
            style={{cursor:"pointer"}} 
            className="radio_input_container">
            <label htmlFor="1" className="radio-label">
                <input
                    className="radio-input"
                    type="radio"
                    checked={false}
                    id="1"
                    readOnly
                />
                <span 
                    style={val === currentValue ? {background:"#B41F1F"}: {}} 
                    className="custom-radio">    
                </span>
            </label>
            <p>{title}</p>
        </div>
    )
}

export default RadioButtonCheckout