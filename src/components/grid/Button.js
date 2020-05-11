import React from 'react'

export default class Button extends React.Component {
  render() {
    const { title, icon, link } = this.props

    return (
      <a className={ 'button' }
         href={ link || '#'}
         target={'_blank'}
      >

        {
          !icon ? null :
          <img
            className={'button-icon'}
            src={icon}
            alt='button-icon'
          />
        }

        <div className={'button-title'}>
          { title || 'Button' }
        </div>

      </a>
    )
  }
}
