export default function SearchString(data, substr) {
    return data.filter((clinic) => {
        const cleanedSearch = substr.toLowerCase()
        const cleanedName = clinic.name.toLowerCase()
        return cleanedName.includes(cleanedSearch)
    })
}