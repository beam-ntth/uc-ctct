import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import Dropdown from './dropDown/dropdown';
import SearchString from '../shared/search'
import StatusParser from '../shared/status';

export default function DisplayPreceptor(props) {
  const [filteredPrecepData, setFilteredPrecepData] = useState(props.data)
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showCredDropdown, setShowCredDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const positionChoices = props.data.map(x => x.position);
  const credentialChoices = props.data.map(x => x.credential);
  const statusChoices = [0].map((x) => StatusParser('preceptors', x))

  function searchPreceptorName(substr) {
    setFilteredPrecepData(SearchString(props.data, substr))
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
          <Dropdown open={showPositionDropdown} setOpen={setShowPositionDropdown} choices={positionChoices} />
        </div>
        <div className={styles.credsForm}>
          <div className={styles.formTitle} onClick={() => setShowCredDropdown(!showCredDropdown)}>
            <p>Credential</p>
            <IoIosArrowDown color='#079CDB' style={showCredDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showCredDropdown} setOpen={setShowCredDropdown} choices={credentialChoices} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices} />
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
                <p className={styles.dataCol1} style={{ paddingLeft: '2rem' }}>{x.name}</p>
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