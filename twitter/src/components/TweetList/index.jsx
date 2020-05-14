import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

import DeleteIcon from '../../assets/delete.svg'
import MainUpIcon from '../../assets/Main-up.svg'
import EmbededTweetIcon from '../../assets/embededTweet.svg'
import ViewActivityIcon from '../../assets/view-activity.svg'
import ArrowIcon from '../../assets/arrow.svg'

const TweetList = ({ list }) => {
  const TweetOptionWindow = ({}) => (
    <div className={styles.optionWindow}>
      <ul className={styles.optionWindowList}>
        <li className={styles.optionWindowListItem}>
          <img src={DeleteIcon} alt='삭제' />
          <span>삭제</span>
        </li>
        <li className={styles.optionWindowListItem}>
          <img src={MainUpIcon} alt='삭제' />
          <span>내 프로필 메인에 올리기</span>
        </li>
        <li className={styles.optionWindowListItem}>
          <img src={EmbededTweetIcon} alt='삭제' />
          <span>트윗 담아가기</span>
        </li>
        <li className={styles.optionWindowListItem}>
          <img src={ViewActivityIcon} alt='삭제' />
          <span>트윗 활동 보기</span>
        </li>
      </ul>
    </div>
  )

  const Tweet = ({ profile, name, id, description, date, likeCount, comment, retweet, heart, share }) => {
    const [ isOptionOpen, setOptionOpen ] = useState(false)

    // onFocus, onBlur
    // onFocus: 이 친구가 선택이 되었을때,
    // onBlur: 이 친구의 선택이 풀렸을때
    return (
      <div
        className={styles.tweet}
        onBlur={() => {
          setOptionOpen(false)
        }}
      >
        <div className={styles.profile}>
          <img src={profile} alt='profile' />
        </div>
        <div className={styles.contents}>
          <div className={styles.header}>
            <div>
              <span>{name}</span>
              <span>{id}</span>
              <span>{date}</span>
            </div>
            <div>
              <button>
                <img
                  onClick={() => {
                    setOptionOpen(!isOptionOpen)
                  }}
                  className={styles.ArrowIcon}
                  src={ArrowIcon}
                  alt='trendImg'
                />
              </button>
              {isOptionOpen && <TweetOptionWindow />}
            </div>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.footer}>
            <img className={styles.footerImg} src={comment} alt='profile' />
            <img className={styles.footerImg} src={retweet} alt='profile' />
            <img className={styles.footerImg} src={heart} alt='profile' />
            <img className={styles.footerImg} src={share} alt='profile' />
          </div>
        </div>
      </div>
    )
  }

  return <div className={styles.tweetList}>{list.map((tweet) => <Tweet {...tweet} />)}</div>
}

TweetList.defaultProps = {
  list: []
}

TweetList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
}

export default TweetList
