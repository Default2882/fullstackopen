import React from 'react'

const Display = ({data}) => {
    // console.log('filetering and displaying')
    const len = data.length
    if (len > 10) return (
      <>
        <p>Too many matches!!!??!!?!?!</p>
      </>
    )
    else if(len > 1){
    //   console.log(data)
      return (
        <>
          <ul>{data.map(element => <li key={element.name}>{element.name}</li>)}</ul>
        </>
      )
    } 
    else if (len === 1){
      const ele = data[0]
      return( 
        <>
          <h1>{ele.name}</h1>
          <p>Capital : {ele.capital}</p>
          <p>Population : {ele.population}</p>
          <p>Languages : </p>
          <ul>{ele.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
          <p>Currencies : </p>
          <ul>{ele.currencies.map(curr => <li key={curr.name}>{curr.name}</li>)}</ul>
          <img src={ele.flag} alt="Flag of the selected country"/>
        </>
      )
    } 
    else return(<></>)
  }

export default Display