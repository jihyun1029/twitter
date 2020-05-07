import React from 'react'

//import PropTypes from 'prop-types'

import styles from './index.module.scss'

import FindIcon from '../../assets/find.svg'
import SetIcon from '../../assets/set.svg'

const RightSidebar = ({ trendList, fllowList }) => {
  const createTrend = (text1, text2, text3, trendIcon) => (
    <div className={styles.trendList}>
      <div className={styles.trendText1}>{text1}</div>
      <div className={styles.trendText2}>{text2}</div>
      <div className={styles.trendText3}>{text3}</div>
      <div className={styles.trendImage}>
        <img className={styles.trendImg} src={trendIcon} alt='trendImg' />
      </div>
    </div>
  )

  const createTrends = (
    <ul className={styles.trends}>
      {trendList.map((trendListItem) => (
        <li className={styles.trendItem}>
          {createTrend(trendListItem.text1, trendListItem.text2, trendListItem.text3, trendListItem.trendIcon)}
        </li>
      ))}
      <li className={styles.trendItem}>
        <div className={styles.trendList}>
          <span>더 보기</span>
        </div>
      </li>
    </ul>
  )

  const createFollow = (f_profile, f_text1, f_text2, f_button) => (
    <div className={styles.floowList}>
      <div className={styles.profileImage}>
        <img className={styles.profileImg} src={f_profile} alt='profileImg' />
      </div>
      <div className={styles.fllowText}>
        <p className={styles.floowText1}>{f_text1}</p>
        <p className={styles.floowText2}>{f_text2}</p>
      </div>
      <div className={styles.fllowButton}>
        <span className={styles.fllow_buttonText}>{f_button}</span>
      </div>
    </div>
  )

  const createFllows = (
    <ul className={styles.fllows}>
      {fllowList.map((fllowListItem) => (
        <li className={styles.fllowItem}>
          {createFollow(fllowListItem.f_profile, fllowListItem.f_text1, fllowListItem.f_text2, fllowListItem.f_button)}
        </li>
      ))}
      <li className={styles.fllowItem}>
        <div className={styles.floowList}>
          <span className={styles.fllowListMore}>더 보기</span>
        </div>
      </li>
    </ul>
  )

  return (
    <div className={styles.rightSidebar}>
      <div className={styles.search}>
        <div className={styles.searchImg}>
          <img src={FindIcon} alt='searchImage' />
        </div>
        <div className={styles.input}>
          <input type='text' placeholder='트위터 검색' />
        </div>
      </div>
      <div className={styles.trend}>
        <div className={styles.trendTitle}>
          <div className={styles.trendText}>나를 위한 트렌드</div>
          <div className={styles.setImage}>
            <img className={styles.setImg} src={SetIcon} alt='setImg' />
          </div>
        </div>
        <div className={styles.trendListArea}>{createTrends}</div>
      </div>
      <div className={styles.fllow}>
        <div className={styles.fllowTitle}>팔로우 추천</div>
        <div className={styles.fllowListArea}>{createFllows}</div>
      </div>
    </div>
  )
}

export default RightSidebar
