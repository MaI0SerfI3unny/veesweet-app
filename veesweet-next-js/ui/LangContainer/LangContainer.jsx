import { useState } from "react";

const LangContainer = () => {
    const [currentLang, setCurrentLang] = useState("UKR")
    const [vision, setVision] = useState(false)

    const changeLang = (lang) => {
        setCurrentLang(lang)
        setVision(false)
    }

    return(
        <div className="lang_container">
        <div onClick={() => setVision(!vision)} className="lang_main_container">
            <p>{currentLang}</p>
            <img style={{
                transition:"0.5s",
                transform: vision ? "rotate(0deg)" : "rotate(180deg)"
            }} src="/header_icon/vector.svg"/>
        </div>
        {vision ? 
            <div className="lang_list_container">
                <p onClick={() => changeLang("RUS")}>RUS</p>
                <p onClick={() => changeLang("ENG")}>ENG</p>
            </div>
        : null}
        </div>
    )
}

export default LangContainer