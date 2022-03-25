export default function SearchString(data, substr) {
    return data.filter((clinic) => {
        const cleanedSearch = substr.toLowerCase();
        console.log(cleanedSearch)
        let cleanedName = '';
        try {
            cleanedName = clinic.name.toLowerCase()
        } catch {
            cleanedName = clinic.toLowerCase()
        } 
        return cleanedName.includes(cleanedSearch)
    })
}