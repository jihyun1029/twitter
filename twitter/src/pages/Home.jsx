import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Header from '../components/Header'
import InputTwit from '../components/InputTwit'
import TweetList from '../components/TweetList'

import RightSidebar from '../components/RightSidebar'

import './home.css'

import CommentIcon from '../assets/comment.svg'
import RetweetIcon from '../assets/retweet.svg'
import HeartIcon from '../assets/heart.svg'
import ShareIcon from '../assets/share.svg'
import ArrowIcon from '../assets/arrow.svg'

const Home = () => {
  const [ timeline, setTimeline ] = useState([])

  // axios = 비동기 통신을 하기위한 라이브러리
  const http = axios.create({
    // base URL = 나 여기서 호출할꺼다.
    baseURL: 'http://localhost:8080',
    // ms 단위: 1000 = 1초 / 10초동안 서버 연결이 안되면, 그만 연결하겠다.
    timeout: 10000
  })

  const getTimeline = () => {
    // http = axios 구현체
    // http를 이용해서 RESTful API를 사용할 수 있음.
    // GET POST PATCH DELETE PUT
    // GET = 서버에서 보안이나 그런거 없이 열려있는 데이터를 가져오겠다.
    http
      .get('/users/1/timeline')
      // 비동기 통신이 끝나면 다음으로
      .then((res) => {
        // then 안에 함수를 실행한다.
        setTimeline(res.data)
      })
  }

  const onTweet = (description) => {
    http
      .post('/tweets', {
        userId: 1,
        description,
        date: new Date()
      })
      .then(getTimeline)
  }

  // useEffect = 두번째 인자에 변경점이 있다면, 첫번째 인자 함수를 실행시켜주는 react hook
  useEffect(() => {
    // getTimeLine 두번째 인자에 변경점이 있다면, 실행
    getTimeline()
    // 두번째 인자: 빈 배열? -> 아무것도 안들어가 있으므로, 최초 1회만 실행한다. (컴포넌트가 실행이 될 때 실행.)
  }, [])

  return (
    <div className='home'>
      <main className='main'>
        <Header title='홈' />
        <InputTwit
          profile='https://file2.nocutnews.co.kr/newsroom/image/2015/11/22/20151122142356616047.jpg'
          onTweet={onTweet}
        />
        <TweetList
          list={timeline.map((tweet) => {
            return {
              profile: tweet.user.profile,
              name: tweet.user.name,
              id: tweet.user.nickname,
              date: tweet.date,
              description: tweet.description,
              likeCount: tweet.likeCount,
              comment: CommentIcon,
              retweet: RetweetIcon,
              heart: HeartIcon,
              share: ShareIcon,
              arrow: ArrowIcon
            }
          })}
        />
      </main>
      <RightSidebar
        trendList={[
          {
            text1: '대한민국에서 트렌드 중',
            text2: 'tvN 예능 피디',
            text3: '12,912 트윗',
            trendIcon: ArrowIcon
          },
          {
            text1: '대한민국에서 트렌드 중',
            text2: '집안구석 한남',
            text3: '12,65 트윗',
            trendIcon: ArrowIcon
          },
          {
            text1: '대한민국에서 트렌드 중',
            text2: '벚꽃레시피',
            text3: '6,951 트윗',
            trendIcon: ArrowIcon
          },
          {
            text1: '대한민국에서 트렌드 중',
            text2: '#최애_넷을_모으면_취향이_보인다',
            text3: '6,941 트윗',
            trendIcon: ArrowIcon
          }
        ]}
        fllowList={[
          {
            f_profile: 'https://pbs.twimg.com/profile_images/884588798486601728/RsxrZOnb_bigger.jpg',
            f_text1: 'KTV 국민방송',
            f_text2: '@Mylife_KTV',
            f_button: '팔로우'
          },
          {
            f_profile: 'https://pbs.twimg.com/profile_images/1246664412372426752/WtAa7JMR_bigger.jpg',
            f_text1: 'Huawei Enterprise',
            f_text2: '@HuaweiEnt',
            f_button: '팔로우'
          },
          {
            f_profile: 'https://pbs.twimg.com/profile_images/882392331642560512/7xa2lXmr_bigger.jpg',
            f_text1: '김정하',
            f_text2: '@7OTHxv9wCgEmeL1',
            f_button: '팔로우'
          }
        ]}
      />
    </div>
  )
}

export default Home
