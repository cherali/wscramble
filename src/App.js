import styled, { createGlobalStyle } from 'styled-components'
import useInitGame from 'hooks/useInitGame'


const width = 250     // board width in px
const itemPerRow = 5  // number of character per row



const GlobalStyle = createGlobalStyle`
  margin: 0%;
  padding: 0;

  * {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }
`



const Wrapper = styled.div`
  width: 100%;
`

const Container = styled.div`
  width: ${width}px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

const WordContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const Button = styled.button`
  margin: 0 10px;
`

const WordCharContainer = styled.div`
  width: ${width / (2 * itemPerRow)}px;
  height: ${width / (2 * itemPerRow)}px;
  position: relative;

  span {
    cursor: pointer;
    padding: 0px 4px;
    border-radius: 50%;
    position: absolute;
    top: -14px;
    right: -2px;
    
    :hover {
      background-color: #efefef;
    }
  }
`

const WordContent = styled.div`
  font-size: 1.3rem;
`

const CharContainer = styled.div`
  width: ${width / itemPerRow}px;
  height: ${width / itemPerRow}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
`

const CharContent = styled.div`
  width: 95%;
  height: 95%;
  background: #efffda;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Helper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px 0;
`

const MsgContainer = styled.div`
  color: ${p => p.status === 'correct' ? 'green' : 'red'};
`



function App() {
  const [chars, word, setWord, score, removeItem, clear, evaluate, evaluateResult] = useInitGame()



  const handleClick = char => () => setWord(s => s + char)

  const handleRemoveChar = index => () => removeItem(index)

  return (
    <>
      <GlobalStyle />
      <Wrapper>

        <WordContainer className='noselect'>
          {
            word && word?.split('').map((item, i) => (
              <WordCharContainer key={i}>
                <span onClick={handleRemoveChar(i)}>×</span>
                <WordContent>{item}</WordContent>
              </WordCharContainer>
            ))
          }

          <div>
            {word && <Button onClick={clear}>×</Button>}

            <Button onClick={evaluate}>check</Button>
          </div>


        </WordContainer>

        <Helper>
          <div>
            <p>score: {score}</p>
          </div>

          <MsgContainer status={evaluateResult.status}>
            <p>{evaluateResult.msg}</p>
          </MsgContainer>
        </Helper>

        <Container>
          {
            chars.map((char, i) => (
              <CharContainer key={i} className='noselect'>
                <CharContent onClick={handleClick(char)}>{char}</CharContent>
              </CharContainer>
            ))
          }
        </Container>
      </Wrapper>
    </>
  )
}

export default App;
