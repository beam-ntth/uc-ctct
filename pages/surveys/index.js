import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from '../../styles/Surveys.module.css'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import { MdScience, MdOutlineEmojiPeople } from 'react-icons/md'
import { FiRefreshCcw } from 'react-icons/fi'
import { getAllPreceptors, getAllStudents, getSurveyStatus, updateSurveyStatus } from '../../api-lib/azure/azureOps';
import { STUDENT_SURVEY, PRECEPTOR_SURVEY, getSurveyExportProgress, downloadSurveyResponse } from '../../api-lib/qualtrics/qualtricsOps';
import Loading from '../../components/shared/loading';
import { useRouter } from 'next/router';
import PopUp from '../../components/surveyPage/popUp';
import { downloadSurveys } from '../../components/surveyPage/downloadSurveys';
import { runAuthMiddleware } from '../../api-lib/auth/authMiddleware';

export async function getServerSideProps({ req, res }) {
  const redirect = await runAuthMiddleware(req, res);
  // If the user is invalid then we redirect them back to the index.js page
  if (redirect) return redirect;
  return {
    props: { user: req.user },
  };
}

export default function StudentMgmt({ user }) {
  /**
   * State to keep track of the last updated timestamp
   */
  const [lastUpdated, setLastUpdated] = useState("")
  const [studentLink, setStudentLink] = useState("")
  const [preceptorLink, setPreceptorLink] = useState("")

  /**
   * States to keep track of communications with Qualtrics
   */
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [displayText, setDisplayText] = useState("Refreshing usually takes about 1 minute. Hang Tight!")

  /**
   * Lazy load data of the last updated timestamp
   */
  const loadData = async () => {
    const data = await getSurveyStatus()
    setLastUpdated(data.metadata.last_updated)
    setStudentLink(data.links.student)
    setPreceptorLink(data.links.preceptor)
    return
  }
  useEffect(() => loadData(), [isRefreshing])

  /**
   * This function checks to see if Qualtrics server is ready for us to download
   * @param {*} survey_id : ID of the Survey
   * @param {*} progress_id : Progress ID when the download was initiated
   * @returns Promise with a timeout of 0.5 seconds delay for the server to load
   */
  const checkForProgress = (survey_id, progress_id) => {
    return new Promise((resolve, _) => {
      setTimeout(async () => {
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

  /**
   * @function refreshSurveyResponse : Download all the survey responses for students and preceptors
   */
  const refreshSurveyResponse = async () => {
    try {
      setIsRefreshing(true)
      // Downloading survey responses and parse data
      setDisplayText("START DOWNLOADING STUDENT SURVEYS")
      await downloadSurveys("student", STUDENT_SURVEY, checkForProgress, waitToDownload, setDisplayText)
      setDisplayText("START DOWNLOADING PRECEPTOR SURVEYS")
      await downloadSurveys("preceptor", PRECEPTOR_SURVEY, checkForProgress, waitToDownload, setDisplayText)
      // FINISHED EVERYTHING - Update the refresh timestamp
      setDisplayText("Finished Updating EVERTHING. Let's go!")
      await updateSurveyStatus()
      setIsRefreshing(false)
    } catch (error) {
      setIsRefreshing(false)
      throw new Error(`Error occurs while refresh Qualtrics response data. Error: ${error}`)
    }
  }

  /**
   * States for sending emails to all the students
   */
  const [popUpChoice, setPopUpChoice] = useState("")
  const [sendAllEmail, setSendAllEmail] = useState(false)
  const [allEmailAddress, setAllEmailAddress] = useState([])
  const [surveyUrl, setSurveyUrl] = useState("")

  /**
   * @function getAllUnrespondedEmails : Create an email list of all the students or preceptors who didn't respond to the survey
   * @param {*} choice : Whether user clicked on the student or preceptor button
   */
  const getAllUnrespondedEmails = async (choice) => {
    if (choice == "student") {
      const student_data = await getAllStudents()
      const all_emails = student_data.filter(x => !x.survey.hasResponded).map(x => x.email)
      setAllEmailAddress(all_emails)
      setSurveyUrl(studentLink)
      setPopUpChoice("student")
    } else {
      const preceptor_data = await getAllPreceptors()
      const all_emails = preceptor_data.filter(x => !x.survey.hasResponded).map(x => x.email)
      setAllEmailAddress(all_emails)
      setSurveyUrl(preceptorLink)
      setPopUpChoice("preceptor")
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
        {isRefreshing ? <Loading text={displayText} /> : null}
        {sendAllEmail ? <PopUp open={setSendAllEmail} emailList={allEmailAddress} setEmailList={setAllEmailAddress} url={surveyUrl} setUrl={setSurveyUrl} choice={popUpChoice} /> : null}
        <Navbar icons={[false, false, false, true, false]} />
        <div className={styles.content}>
          <Header header="Site Management Tools" imgSrc={user.photo ? user.photo : "/asset/images/user-image.png"} />
          <div className={styles.menu}>
            <div className={styles.lastUpdated}>
              <p>Surveys Last Updated: {lastUpdated ? lastUpdated : 'Loading...'}</p>
              <FiRefreshCcw size={30} style={{ cursor: 'pointer' }} onClick={() => refreshSurveyResponse()} />
            </div>
            <div className={styles.optionSection}>
              <div className={styles.mainOption}>
                <Link href="/surveys/student">
                  <div className={styles.menuOption}>
                    <MdOutlineEmojiPeople size={100} color='#079CDB' />
                    <h1>Manage Student Surveys</h1>
                  </div>
                </Link>
                <div className={styles.uploadOption} onClick={() => { getAllUnrespondedEmails('student'); setSendAllEmail(true); }}>
                  <h4>Send email to all students</h4>
                </div>
              </div>
              <div className={styles.mainOption}>
                <Link href="/surveys/preceptor">
                  <div className={styles.menuOption}>
                    <MdScience size={100} color='#079CDB' />
                    <h1>Manage Preceptor Surveys</h1>
                  </div>
                </Link>
                <div className={styles.uploadOption} onClick={() => { getAllUnrespondedEmails('preceptor'); setSendAllEmail(true); }}>
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