import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'

const App = () => {
  const [ textfield, setField ] = useState("")
  const [ mydata, setData ] = useState([])
  const [ todisplay, setDisplay ] = useState([])

  function applyfilter(event){
    // console.log(event.target.value)
    const s = event.target.value.toLowerCase() // string to match
    if (s === "") {
      setDisplay([])
    }
    else{
      let newarr = mydata.filter(element => element.name.toLowerCase().startsWith(s))
      setDisplay(newarr)
    }
    setField(event.target.value)
  }
  // console.log(todisplay)
  useEffect(() => {
    console.log("fetching the data")
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log("promise fullfilled")
      // console.log(response.data)
      setData(response.data)
    })
  }, [])

  // console.log(mydata)
  
  return(
    <>
    <div>debug : {textfield}</div>
    <div>
      <form>
        <div>find countries <input onChange={applyfilter}/></div>
      </form>
      <Display data={todisplay} />
    </div>
    </>
    )
}

export default App;
