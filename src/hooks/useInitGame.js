import { useState, useMemo } from 'react'
import { shuffle } from 'common/util/helperFunction'

import WORDS from 'sourceData'


const defaultEval = {
  msg: '',
  status: null,
}

function useInitGame() {
  // generate character
  const chars = Array(26).fill('').map((item, i) => String.fromCharCode(65 + i))

  // sort randomly
  const shuffleChars = useMemo(() => shuffle(chars), [])



  // decleare states
  const [word, setWord] = useState('')
  const [score, setScore] = useState(0)
  const [evaluateResult, setEvaluateResult] = useState(defaultEval)


  // remove chat at certain position
  const removeItem = index => {
    const str = word.split('')

    str.splice(index, 1)

    setWord(str.join(''))
  }

  // clear input
  const clear = () => {
    setWord('')
    setEvaluateResult(defaultEval)
  }


  // evaluate input text
  const evaluate = () => {
    // lower case word
    const w = word.toLowerCase()

    // find input word in source word
    const res = WORDS.map(item => item.toLowerCase()).includes(w)


    // if ok
    if (res) {
      // clear input
      setWord('')

      // add score
      setScore(s => s + 1)

      // set eval res
      setEvaluateResult({
        msg: 'Congratulation! your word is correct',
        status: 'correct'
      })
    } else {
      setEvaluateResult({
        msg: 'Sorry! your word is incorrect',
        status: 'incorrect'
      })
    }
  }



  return [shuffleChars, word, setWord, score, removeItem, clear, evaluate, evaluateResult]
}

export default useInitGame
