const InputCheckout = ({ type, holder, formData,setFormData,value }) => {
    const handleInputChange = (e) => {
        setFormData(prevData => ({
          ...prevData,
          [value]: e,
        }));
      }

    const validText = () => {
        if(formData[value].length < 2 || 
            /^[A-Za-z]+$/.test(formData[value]) === false)
            return true
        return false
    }
    
    const validEmail = () => {
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[value]) === false)
            return true
        return false
    }
    
    const validPhone = () => {
        if(/^(?:\+380|380)[1-9]\d{8}$/.test(formData[value]) === false)
            return true
        return false
    }

     const validErrFund = {
        text: validText(),
        email: validEmail(),
        tel: validPhone(),
    }
    return(
        <div className="col-md-6">
        <div className="order_input_container">
            <input 
                value={formData[value]} 
                type={type} 
                onChange={(e) => handleInputChange(e.target.value)} 
                placeholder={holder}/>
            {validErrFund[type] ? null : <img src="/accept.svg" alt="accept"/>}
        </div>
    </div>
    )
}

export default InputCheckout