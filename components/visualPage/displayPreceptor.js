import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import Dropdown from './dropDown/dropdown';
import SearchString from '../shared/search'
import StatusParser from '../shared/status';
import { AiOutlineDownload } from 'react-icons/ai';
import { parse } from 'json2csv';

export default function DisplayPreceptor(props) {
  const [filteredPrecepData, setFilteredPrecepData] = useState(props.data)
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showCredDropdown, setShowCredDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const positionChoices = props.data.map(x => x.position);
  const credentialChoices = props.data.map(x => x.credential);
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('preceptors', x))

  function searchPreceptorName(substr) {
    setFilteredPrecepData(SearchString(props.data, substr))
  }

  function download_csv_file() {
    const downloadable = props.data.map(x => {
      return {
        firstname: x.firstname,
        lastname: x.lastname,
        position: x.position,
        credential: x.credential,
        email: x.email,
        npi: x.npi,
        phoneNumber: x.phoneNumber,
        status: StatusParser('preceptors', parseInt(x.status)) ,
        notes: x.notes,
        clinics: x.clinics
      }
    })

    const csv = parse(downloadable)
 
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  
    const currentdate = new Date();
    hiddenElement.download = `preceptor-details-${currentdate.getFullYear()}.csv`;  
    hiddenElement.click();  
  }  

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Preceptor Name ..." onChange={(x) => searchPreceptorName(x.target.value)} />
        </div>
        <div className={styles.positionForm}>
          <div className={styles.formTitle} onClick={() => setShowPositionDropdown(!showPositionDropdown)}>
            <p>Position</p>
            <IoIosArrowDown color='#079CDB' style={showPositionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showPositionDropdown} setOpen={setShowPositionDropdown} choices={positionChoices} />
        </div>
        <div className={styles.credsForm}>
          <div className={styles.formTitle} onClick={() => setShowCredDropdown(!showCredDropdown)}>
            <p>Credential</p>
            <IoIosArrowDown color='#079CDB' style={showCredDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showCredDropdown} setOpen={setShowCredDropdown} choices={credentialChoices} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices} />
        </div>
        <div className={styles.download} onClick={download_csv_file}>
          <AiOutlineDownload size={25} style={{marginRight: '0.2rem'}} />
          <p>Download CSV</p>
        </div>
      </div>
      <div className={styles.row}>
        <p className={styles.titleCol1}>Preceptor Name</p>
        <p className={styles.titleCol2} style={{ paddingLeft: '2rem' }}>Position</p>
        <p className={styles.titleCol3} style={{ paddingRight: '1rem' }}>Credential</p>
        <p className={styles.titleCol4}>Status</p>
      </div>
      {filteredPrecepData.map((x, ind) => {
        const statusText = StatusParser("preceptors", parseInt(x.status))
        return (
          <Link href={`/sites/database/clinics/preceptor?preceptor_id=${x.id}`}>
            <div key={`clinics_${ind}`} className='displayRow'>
              <div className="rowContentClinics">
                <p className={styles.dataCol1} style={{ paddingLeft: '2rem' }}>{x.firstname} {x.lastname}</p>
                <p className={styles.dataCol2} style={{ paddingLeft: '2rem' }}>{x.position}</p>
                <p className={styles.dataCol3}>{x.credential}</p>
                <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p>
              </div>
              <div className={`tag${x['status']}`}></div>
            </div>
          </Link>
        )
      }
      )
      }
    </React.Fragment>
  )
}