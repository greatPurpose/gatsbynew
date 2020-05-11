import React from 'react'

export default class keyNumber extends React.Component {
  render() {
    const { data, mode } = this.props

    let headerData = null

    if (data.length === 0) {
      return null
    }

    if (mode === 0) {
      headerData = (
        <>
          <h3 className={'key-number-header'}>{ data[0].term }</h3>
          <div className={'key-number-header-value'}>{ data[0].definition }</div>
        </>
      )
    }

    const definitionsList = data.map((item, index) => {
      if (mode === 0 && index === 0) {
        return null
      }

      return (
        <React.Fragment  key={'fragment' + index}>
          <dt className={'key-number-term'} key={'dt' + index}>{ item.term }:</dt>
          <dd className={'key-number-definition'} key={'dd' + index}>{ item.definition }</dd>
          <br key={'br' + index}/>
        </React.Fragment>
      )

    })

    return (
      <div className={'key-number'}>

        { headerData }

        <dl className={'key-number-definition-list'}>
          { definitionsList }
        </dl>
      </div>
    )
  }
}
