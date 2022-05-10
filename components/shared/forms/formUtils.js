export const cleanFormName = (text) => {
    if (text.includes(" ") || text.includes("-")) {
        let fnArr = text.split(" ").map(x => {
            if (text.includes("-")) {
                const fnArr = x.split("-").map(x => `${x.charAt(0).toUpperCase()}${x.slice(1).toLowerCase()}`)
                return fnArr.join("-")
            }
            return `${x.charAt(0).toUpperCase()}${x.slice(1).toLowerCase()}`
        })
        return fnArr.join(" ")
    }
    return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`
}

export const removeAllAlphabets = (text) => {
    return text.replaceAll( /\D+/g, '')
}

export const removeAllNumbers = (text) => {
    return text.replaceAll( /\d+/g, '')
}