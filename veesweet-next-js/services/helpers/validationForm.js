export const validText = (text) => {
    if(text.length < 2 || 
        /^[A-Za-z]+$/.test(text) === false)
        return true
    return false
}

export const validEmail = (text) => {
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) === false)
        return true
    return false
}

export const validPhone = (text) => {
    if(/^(?:\+380|380)[1-9]\d{8}$/.test(text) === false)
        return true
    return false
}