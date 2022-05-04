const URL = "https://iad1.qualtrics.com/API/v3"

export const STUDENT_SURVEY = "SV_9vFAo599TwEHR7U"
export const PRECEPTOR_SURVEY = "SV_0d20t3ZmuQH2WLY"

/**
 * GET SURVEY INFORMATION
 */

export async function getAllSurveys() {
    try {
        const res = await fetch(`${URL}/surveys`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "X-API-TOKEN": `${process.env.NEXT_PUBLIC_QUALTRICS_API}`
            }
        })
        return res.json();
    } catch (error) {
        throw new Error(`Issue while getting all surveys. Error is: ${error}`);
    }
}

export async function getSurvey(survey_id) {
    try {
        const res = await fetch(`${URL}/surveys${survey_id}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "X-API-TOKEN": `${process.env.NEXT_PUBLIC_QUALTRICS_API}`
            }
        })
        return res.json();
    } catch (error) {
        throw new Error(`Issue while getting a survey. Error is: ${error}`);
    }
}

/**
 * DOWNLOAD SURVEY RESPONSES
 */
export async function startExportResponses(survey_id) {
    try {
        const res = await fetch(`${URL}/surveys/${survey_id}/export-responses/`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "X-API-TOKEN": `${process.env.NEXT_PUBLIC_QUALTRICS_API}`
            },
            "body": JSON.stringify({
                format: "json",
                compress: false
            })
        })
        if (res.status != 200) {
            console.log(res)
            throw new Error(`Start Exporting Responses failed with an error code of ${res.status}: ${res.statusText}`)
        }
        return res.json();
    } catch (error) {
        throw new Error(`Issue while initiating survey responses download. Error is: ${error}`);
    }
}

export async function getSurveyExportProgress(survey_id, progress_id) {
    try {
        const res = await fetch(`${URL}/surveys/${survey_id}/export-responses/${progress_id}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "X-API-TOKEN": `${process.env.NEXT_PUBLIC_QUALTRICS_API}`
            }
        })
        return res;
    } catch (error) {
        throw new Error(`Issue while survey responses download progress. Error is: ${error}`);
    }
}

export async function downloadSurveyResponse(survey_id, file_id) {
    try {
        const res = await fetch(`${URL}/surveys/${survey_id}/export-responses/${file_id}/file`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "X-API-TOKEN": `${process.env.NEXT_PUBLIC_QUALTRICS_API}`
            }
        })
        return res;
    } catch (error) {
        throw new Error(`Issue while survey responses download progress. Error is: ${error}`);
    }
}