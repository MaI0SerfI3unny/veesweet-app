import { useState } from "react"

const Checkbox = ({title, changeFunc}) => {
    const [isChecked, setIsChecked] = useState(false)

    const changeFuncVal = (val) => {
        setIsChecked(!isChecked)
        changeFunc(val)
    }

    return(
        <div className="checkbox-wrapper">
        <label onClick={() => changeFuncVal(title)}>
            <input
            type="checkbox"
            className={isChecked ? "checked" : ""}
            /> {title}</label>
        </div>
    )
}

export default Checkbox