import React from 'react'
import View from './View'

const Display = ({data, buttonclick}) => {
    // console.log('filetering and displaying')
    const len = data.length
    if (len > 10) return (
      <>
        <p>Too many matches!!!??!!?!?! BRUH!!!!!!!!</p>
      </>
    )
    else if(len > 1){
    //   console.log(data)
      return (
        <>
            <ul>{
                    data.map((element,index) => <li key={element.name}>
                            <p>{element.name}</p>
                            <View ele={element} hide={true} id={index}/>
                            <button type="button" onClick={buttonclick} value={index}>Show</button>
                        </li>
                    )
                }
            </ul>
        </>
      )
    } 
    else if (len === 1){
      const ele = data[0]
      return( 
        <View ele={ele} />
      )
    } 
    else return(<></>)
  }

export default Display