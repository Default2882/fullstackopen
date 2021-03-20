import React from 'react'
import Weather from './Weather'

const View = ({ele, hide, id}) => {
  if (hide)
    return(
        <div id={id} hidden>
          <h1>{ele.name}</h1>
          <p>Capital : {ele.capital}</p>
          <p>Population : {ele.population}</p>
          <p>Languages : </p>
          <ul>{ele.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
          <p>Currencies : </p>
          <ul>{ele.currencies.map(curr => <li key={curr.name}>{curr.name}</li>)}</ul>
          <img src={ele.flag} alt="Flag of the selected country"/>
        </div>
    )
  else {
    // console.log(weather(ele.name))
    return(
      <div>
        <h1>{ele.name}</h1>
        <p>Capital : {ele.capital}</p>
        <p>Population : {ele.population}</p>
        <p>Languages : </p>
        <ul>{ele.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
        <p>Currencies : </p>
        <ul>{ele.currencies.map(curr => <li key={curr.name}>{curr.name}</li>)}</ul>
        <img src={ele.flag} alt="Flag of the selected country"/>
        <Weather location={ele.name} />
      </div>
    )
  }
}

export default View