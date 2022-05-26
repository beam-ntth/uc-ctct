export function searchString(data, substr) {
    return data.filter((clinic) => {
        const cleanedSearch = substr.toLowerCase();
        let cleanedName = '';
        try {
            cleanedName = clinic.name.toLowerCase()
        } catch {
            cleanedName = clinic.toLowerCase()
        } 
        return cleanedName.includes(cleanedSearch)
    })
}

export function searchPreceptorName(data, substr) {
    return data.filter(preceptor => {
        const cleanedSearch = substr.toLowerCase();
        const name = `${preceptor.firstname} ${preceptor.lastname}`.toLowerCase()
        return name.includes(cleanedSearch)
    })
}
export function searchStudentName(data, substr) {
    return data.filter(student => {
        const cleanedSearch = substr.toLowerCase();
        const name = `${student.firstName} ${student.lastName}`.toLowerCase()
        return name.includes(cleanedSearch)
    })
}