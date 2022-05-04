import { editPreceptorInfo, editStudentInfo, getPreceptorFromEmail, getStudentFromEmail } from "../../api-lib/azure/azureOps";
import { startExportResponses } from "../../api-lib/qualtrics/qualtricsOps";
import { parsePrecpetorData, parseStudentData } from "./parseQualtricsData";

export const downloadSurveys = async(type, STUDENT_SURVEY, checkForProgress, waitToDownload, setDisplayText) => {
    if (type != "student" && type != "preceptor") {
        throw new Error(`Invalid type (${type}). Needs to be either "student" or "preceptor"`)
    }

    let file_id = null
    let downloaded_data = null

    // Start Exporting Section
    const res = await startExportResponses(STUDENT_SURVEY)
    const progress_id = res.result.progressId
    setDisplayText("Initiated Survey Export Responses. Hang Tight!")
    
    // Progress Section
    const progress = await checkForProgress(STUDENT_SURVEY, progress_id)

    let progressIsDone = false
    if (progress == 400) {
        progressIsDone = false
    } else {
        progressIsDone = true
        file_id = progress
    }

    while (!progressIsDone) {
        setDisplayText("Apparently, Qualtrics server was not ready. Retrying right now. Hang Tight!")
        const checkResult = await checkForProgress(STUDENT_SURVEY, progress_id)
        if (checkResult == 400) {
            progressIsDone = false
        } else {
            progressIsDone = true
            file_id = checkResult
        }
    }

    setDisplayText("Survey responses are ready to be exported. Hang Tight!")
    setDisplayText("Downloading survey responses. Hang Tight!")
    
    // Download File Section
    let downloadDone = false
    // Usually have about 1 seconds delay, try to wait first
    const downloadAttempt = await waitToDownload(STUDENT_SURVEY, file_id, 1000)
    if (downloadAttempt == 400) {
        downloadDone = false
    } else {
        downloadDone = true
        downloaded_data = downloadAttempt
    }
    // If still cannot download, implement retry mechanism, delay 1 sec per each retry
    while (!downloadDone) {
        setDisplayText("Apparently, Qualtrics server was not ready. Retrying right now. Hang Tight!")
        const nextAttempt = await waitToDownload(STUDENT_SURVEY, file_id, 1000)
        if (nextAttempt != 400) {
            downloadDone = false
        } else {
            downloadDone = true
            downloaded_data = nextAttempt
        }
    }

    if (type == "student") {
        setDisplayText("Finished downloading survey responses. Yay!")
        // downloaded_data.forEach(x => console.log(parseStudentData(x)))
    
        setDisplayText("Updating STUDENT survey responses to the records in the database. Hang Tight!")
        downloaded_data.map(student => parseStudentData(student)).forEach(async(student) => {
            const checkStudent = await getStudentFromEmail(student.homeEmail)
            // You should only find one student to match with the email
            if (checkStudent.length == 1) {
                let newStudentData = {...checkStudent[0]}
                newStudentData.survey.data = student
                editStudentInfo(newStudentData.id, newStudentData)
            }
        })
    } else {
        setDisplayText("Finished downloading survey responses. Yay!")
        downloaded_data.forEach(x => console.log(JSON.stringify(parsePrecpetorData(x))))
        setDisplayText("Updating PRECEPTOR survey responses to the records in the database. Hang Tight!")
        downloaded_data.map(preceptor => parsePrecpetorData(preceptor)).forEach(async(preceptor) => {
            const checkPreceptor = await getPreceptorFromEmail(preceptor.homeEmail)
            // You should only find one preceptor to match with the email
            if (checkPreceptor.length == 1) {
                let newPrecepData = {...checkPreceptor[0]}
                newPrecepData.survey.data = preceptor
                editPreceptorInfo(newPrecepData.id, newPrecepData)
            }
        })
    }
}