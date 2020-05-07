import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import styles from './index.module.scss'

import ImgaeIcon from '../../assets/image.svg'
import GifIcon from '../../assets/gif.svg'
import VoteIcon from '../../assets/vote.svg'
import EmojiIcon from '../../assets/emoji.svg'

const InputTwit = ({ profile, onTweet }) => {
  // const [ textarea, setTextarea ] = useState('')

  const Editor = ({}) => {
    const [ textList, setTextList ] = useState([ '' ])
    const textListRef = useRef([])
    const [ inputEnter, setInputEnter ] = useState(false)
    const [ hasPlaceholder, setHasPlaceholder ] = useState(true)

    // useEffect(
    //   () => {
    //     if (textList.length === textListRef.length) return

    //     textListRef.splice()
    //     textList.forEach(() => {
    //       textListRef.push(useRef(null))
    //     })
    //   },
    //   [ textList ]
    // )

    useEffect(
      () => {
        if (textList.length === 1 && textList[0] === '') {
          setHasPlaceholder(true)
        } else if (textList[0] !== '' || textList.length > 1) {
          setHasPlaceholder(false)
        }
      },
      [ textList ]
    )

    useEffect(
      () => {
        if (!inputEnter) return

        textListRef.current[textList.length - 1].focus()

        setInputEnter(false)
      },
      [ inputEnter ]
    )

    const onEnter = (e, index) => {
      if (e.key === 'Backspace' && textList[index] === '') {
        if (textList.length === 1) return

        e.preventDefault()
        e.stopPropagation()

        const tempList = textList.slice()
        tempList.splice(index, 1)

        // 삭제를 할 때 리스트 카운트를 동일하게 주기 위해
        // textListRef.splice(index, 1)

        setTextList(tempList)
        textListRef.current[index - 1].focus()

        // const temp = textListRef.current[index - 1].innerText
        // textListRef.current[index - 1].innerText = ''
        // textListRef.current[index - 1].innerText = temp

        if (textListRef.current[index - 1].innerText === '') return

        const rangeobj = document.createRange() // 커서를 어떻게 만들 것인가 범위
        const selectobj = window.getSelection() // 현재 선택된 객체가 무엇이냐 text 범위 지정해서 오른쪽

        // 그 전 노드에 맨 뒤에 커서를 놓는다.
        rangeobj.setStart(textListRef.current[index - 1].childNodes[0], textListRef.current[index - 1].innerText.length)
        // rangeobj.setEnd(textListRef.current[index - 1].childNodes[0], textListRef.current[index - 1].innerText.length)
        rangeobj.collapse(true) // collapse 란? 고정한다. true를 주면 커서를 놓았던 곳을 확정한다.
        selectobj.removeAllRanges() // 작업들이 고이지 않기 위해
        selectobj.addRange(rangeobj) // 기존에 있던 작...    모르겠다 놓쳤다...

        return
      }

      if ((e.key === 'Enter' && e.shiftKey) || e.key === 'Enter') {
        // e.preventDefault = 이벤트를 무시하겠다. = 실제로 텍스트에 적용하지 않겠다
        e.preventDefault()
        // e.stopPropagation = 이벤트 전파를 중지하겠다. = 상위의 이벤트에 이벤트전달을 하지 않겠다.
        e.stopPropagation()

        // console.log('개행!')
        const tempList = textList.slice()
        tempList.push('')

        // 상태가 변경되기 전에, textListRef도 동일한 상태로 유지한다.
        // textListRef.push(useRef(null))

        setTextList(tempList)
        setInputEnter(true)

        return
      }

      const tempList = textList.slice()
      tempList[index] = e.target.innerText
      setTextList(tempList)
      // textList.slice() <- 배열이 복사됨

      // e = keyCode
      // const code = e.keyCode // keyCode
      // console.log('In decimal ' + e.keyCode) // keyCode = 10

      // const hex = code.toString(16)
      // console.log('In hex ' + hex) // 0x00 = 16진수
    }

    return (
      <div className={styles.editorWrapper}>
        {/* onKeyDown = 눌렀을 때 최초 1회 */}
        {hasPlaceholder && <span className={styles.placeholder}>무슨일이 일어나고 있나요?</span>}
        {textList.map((text, index) => (
          <div
            ref={(el) => {
              textListRef.current[index] = el
            }}
            key={index}
            value={text}
            contentEditable='true'
            className={styles.editor}
            onKeyDown={(e) => {
              onEnter(e, index)
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.default}>
      <div className={styles.profile}>
        <img className={styles.profileImage} src={profile} alt='profile' />
      </div>

      <div className={styles.textBox}>
        <div className={styles.inputBox}>
          {/* <textarea
            value={textarea}
            onChange={(e) => {
              setTextarea(e.currentTarget.value)
            }}
            className={styles.textarea}
            placeholder='무슨 일이 일어나고 있나요?'
          /> */}
          <Editor />
        </div>

        <div className={styles.optionals}>
          <div className={styles.leftArea}>
            <img className={styles.lefAreaImage} src={ImgaeIcon} alt='image' />
            <img className={styles.lefAreaImage} src={GifIcon} alt='gif' />
            <img className={styles.lefAreaImage} src={VoteIcon} alt='vote' />
            <img className={styles.lefAreaImage} src={EmojiIcon} alt='emoji' />
          </div>
          <div className={styles.rightArea}>
            <div className={styles.typoOptions}>
              <div className={styles.gaugeArea} />
              <div className={styles.scaleUp} />
            </div>
            <Button
              onClick={() => {
                onTweet(textList.toString())
              }}
              type='button'
              className={styles.twitButton}
            >
              트윗
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

InputTwit.defaultProps = {
  profile: null,
  onTweet: null
}

InputTwit.propTypes = {
  profile: PropTypes.string,
  onTweet: PropTypes.func
}

export default InputTwit
