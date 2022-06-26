import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// setTimeOutが使えない ←　setStateはfunction扱いされない?　第一argを() => { content }　にすれば機能する
function App() {
  const [quotes, setQuotes] = React.useState([])
  const [randomQuote, setRandomQuote] = React.useState('')
  const [color, setColor] = React.useState('#000')
  const [isShow, setIsShow] = React.useState(false)

  const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

  const setRandomColor = () => {
    let hexColor = '#'
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * hex.length)
      hexColor += hex[randomNumber]
    }
    setColor(hexColor)
  }

  const getNewQuote = () => {
    const randomNumber = Math.floor(Math.random() * quotes.length)
    setTimeout(() => {
      setRandomQuote(quotes[randomNumber])
      setIsShow(true)
    }, 700)

    setIsShow(false)
    setRandomColor()
  }

  React.useEffect(() => {
    async function fetchData() {
      const url =
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      const res = await fetch(url)
      const data = await res.json()
      setQuotes(data.quotes)
      const randomNumber = Math.floor(Math.random() * data.quotes.length)
      setRandomQuote(data.quotes[randomNumber])
    }
    fetchData()
    setTimeout(() => {
      setIsShow(true)
    }, 300)
  }, [])

  // console.log(color,  randomQuote)

  document.body.style.backgroundColor = color
  const styles = {
    backgroundColor: color,
  }
  const show = isShow ? 'fade-in' : 'fade-out'
  const { quote, author } = randomQuote

  return (
    <div className='container'>
      <div id='quote-box' style={{ color: color }}>
        <div className='quote-author' className={show}>
          <p id='text' className=''>
            <i className='bi bi-quote' style={{ color: color }}></i>
            {quote}
          </p>
          <p id='author' className=''>
            - {author}
          </p>
        </div>
        <div className='links-button'>
          <div className='links'>
            <a
              href={
                'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                encodeURIComponent('"' + quote + '"' + '-' + author)
              }
              target='_blank'
              id='tweet-quote'
              style={styles}
            >
              <i className='bi bi-twitter'></i>
            </a>
            <a
              href={
                'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                encodeURIComponent('"' + quote + '"' + '-' + author)
              }
              target='_blank'
              id=''
              style={styles}
            >
              <i className='bi bi-twitter'></i>
            </a>
          </div>
          <div className='button'>
            <button id='new-quote' onClick={getNewQuote} style={styles}>
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
