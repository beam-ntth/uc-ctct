import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from '../../styles/Surveys.module.css'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import { MdScience, MdOutlineEmojiPeople } from 'react-icons/md'
import { FiRefreshCcw } from 'react-icons/fi'
import { getAllPreceptors, getAllStudents, getSurveyStatus, updateSurveyStatus } from '../../api-lib/azure/azureOps';
import { STUDENT_SURVEY, PRECEPTOR_SURVEY, startExportResponses, getSurveyExportProgress, downloadSurveyResponse } from '../../api-lib/qualtrics/qualtricsOps';
import Loading from '../../components/shared/loading';
import { useRouter } from 'next/router';
import PopUp from '../../components/surveyPage/popUp';
import { parseStudentData } from '../../components/surveyPage/parseQualtricsData';

export default function StudentMgmt() {
    const [ lastUpdated, setLastUpdated ] = useState(null)

    /**
     * States to keep track of communications with Qualtrics
     */
    const [ isRefreshing, setIsRefreshing ] = useState(false)
    const [ displayText, setDisplayText ] = useState("Refreshing usually takes about 1 minute. Hang Tight!")

    const loadData = async () => {
        const data = await getSurveyStatus()
        setLastUpdated(data.metadata.last_updated)
        return
    }

    /**
     * This function checks to see if Qualtrics server is ready for us to download
     * @param {*} survey_id : ID of the Survey
     * @param {*} progress_id : Progress ID when the download was initiated
     * @returns Promise with a timeout of 0.5 seconds delay for the server to load
     */
    const checkForProgress = (survey_id, progress_id) => {
        return new Promise((resolve, _) => {
            setTimeout(async() => {
                const cur_progress = await getSurveyExportProgress(survey_id, progress_id)
                const resultObj = await cur_progress.json()
                // If the progress is 100%, mark it as complete
                if (cur_progress.status == 200 && parseInt(resultObj.result.percentComplete) == 100) {
                    resolve(resultObj.result.fileId)
                } else {
                    resolve(400)
                }
            }, 500) 
        })
    }

    /**
     * This function tries to download the JSON file, the server usually takes a second
     * for the JSON file to be ready
     * @param {*} survey_id : ID of the Survey
     * @param {*} file_id : File ID received when the progress is 100%
     * @param {*} waitTime : custom waitTime based on whether it's the initial download or retry download
     * @returns Promise with a custom timeout for the server to load
     */
    const waitToDownload = (survey_id, file_id, waitTime) => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const downloaded_file = await downloadSurveyResponse(survey_id, file_id)
                // If the server respond with a 400, then we need to wait a little longer
                if (downloaded_file.status == 400) {
                    resolve(400)
                } else {
                    const resultObj = await downloaded_file.json()
                    resolve(resultObj.responses)
                }
            }, waitTime)
        })
    }

    const refreshSurveyResponse = async () => {
        try {
            setIsRefreshing(true)

            let student_file_id = null
            let downloaded_data = null

            // Start Exporting Section
            const student_res = await startExportResponses(STUDENT_SURVEY)
            const student_progress_id = student_res.result.progressId
            setDisplayText("Initiated Survey Export Responses. Hang Tight!")
            
            // Progress Section
            const student_progress = await checkForProgress(STUDENT_SURVEY, student_progress_id)

            let progressIsDone = false
            if (student_progress == 400) {
                progressIsDone = false
            } else {
                progressIsDone = true
                student_file_id = student_progress
            }

            while (!progressIsDone) {
                setDisplayText("Apparently, Qualtrics server was not ready. Retrying right now. Hang Tight!")
                const checkResult = await checkForProgress(STUDENT_SURVEY, student_progress_id)
                if (checkResult == 400) {
                    progressIsDone = false
                } else {
                    progressIsDone = true
                    student_file_id = checkResult
                }
            }

            setDisplayText("Survey responses are ready to be exported. Hang Tight!")
            setDisplayText("Downloading survey responses. Hang Tight!")
            
            // Download File Section
            let downloadDone = false
            // Usually have about 1 seconds delay, try to wait first
            const downloadAttempt = await waitToDownload(STUDENT_SURVEY, student_file_id, 1000)
            if (downloadAttempt == 400) {
                downloadDone = false
            } else {
                downloadDone = true
                downloaded_data = downloadAttempt
            }
            // If still cannot download, implement retry mechanism, delay 1 sec per each retry
            while (!downloadDone) {
                setDisplayText("Apparently, Qualtrics server was not ready. Retrying right now. Hang Tight!")
                const nextAttempt = await waitToDownload(STUDENT_SURVEY, student_file_id, 1000)
                if (nextAttempt != 400) {
                    downloadDone = false
                } else {
                    downloadDone = true
                    downloaded_data = nextAttempt
                }
            }
            setDisplayText("Finished downloading survey responses. Yay!")
            downloaded_data.forEach(x => console.log(JSON.stringify(parseStudentData(x))))
            await updateSurveyStatus()
            setIsRefreshing(false)
        } catch (error) {
            setIsRefreshing(false)
            throw new Error(`Error occurs while refresh Qualtrics response data. Error: ${error}`)
        }
    }

    useEffect(() => loadData(), [ isRefreshing ])

    /**
     * States for sending emails to all the students
     */
    const [ sendAllEmail, setSendAllEmail ] = useState(false)
    const [ allEmailAddress, setAllEmailAddress ] = useState([])
    const [ surveyUrl, setSurveyUrl ] = useState("")

    const getAllUnrespondedEmails = async (choice) => {
        if (choice == "student") {
            const student_data = await getAllStudents()
            const all_emails = student_data.filter(x => !x.survey.hasResponded).map(x => x.email)
            setAllEmailAddress(all_emails)
            setSurveyUrl("https://ucdavis.co1.qualtrics.com/jfe/form/SV_9vFAo599TwEHR7U")
        } else {
            const preceptor_data = await getAllPreceptors()
            const all_emails = preceptor_data.filter(x => !x.survey.hasResponded).map(x => x.email)
            setAllEmailAddress(all_emails)
            setSurveyUrl("https://ucdavis.co1.qualtrics.com/jfe/form/SV_0d20t3ZmuQH2WLY")
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>UC-CTCT: Site Management Systems</title>
                <meta name="description" content="University of California - Clinic Coordination Tools" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                { isRefreshing ? <Loading text={displayText} /> : null }
                { sendAllEmail ? <PopUp open={setSendAllEmail} emailList={allEmailAddress} setEmailList={setAllEmailAddress} url={surveyUrl} setUrl={setSurveyUrl} /> : null }
                <Navbar icons={[false, false, false, true, false]} /> 
                <div className={styles.content}>
                    <Header header="Site Management Tools" imgSrc="/asset/images/user-image.png" />
                    <div className={styles.menu}>
                        <div className={ styles.lastUpdated }>
                            <p>Surveys Last Updated: { lastUpdated ? lastUpdated : 'Loading...' }</p>
                            <FiRefreshCcw size={ 30 } style={{ cursor: 'pointer' }} onClick={() => refreshSurveyResponse()} />
                        </div>
                        <div className={ styles.optionSection }>
                            <div className={styles.mainOption}>
                                <Link href="/surveys/student">
                                    <div className={styles.menuOption}>
                                        <MdOutlineEmojiPeople size={100} color='#079CDB' />
                                        <h1>Manage Student Surveys</h1>
                                    </div>
                                </Link>
                                <div className={styles.uploadOption} onClick={() => {getAllUnrespondedEmails('student'); setSendAllEmail(true);}}>
                                    <h4>Send email to all students</h4>
                                </div>
                            </div>
                            <div className={styles.mainOption}>
                                <Link href="/surveys/preceptor">
                                    <div className={styles.menuOption}>
                                        <MdScience size={100} color='#079CDB'/>
                                        <h1>Manage Preceptor Surveys</h1>
                                    </div>
                                </Link>
                                <div className={styles.uploadOption} onClick={() => {getAllUnrespondedEmails('preceptor'); setSendAllEmail(true);}}>
                                    <h4>Send email to all preceptors</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}