import React from 'react'

export default class Iframe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.handlerClick = this.handlerClick.bind(this)
  }

  handlerClick() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { iframeSrc } = this.props

    return (
      <>
        <div className={'iframe'}
             onClick={this.handlerClick}
        >
          <img
            src={require('../../assets/img/excelStub.jpg')}
            alt='Excel stub'
            className={'iframe-stub'}
          />
          <div className={this.state.isOpen ? 'iframe-action fixed' : 'iframe-action'}/>
        </div>
        {
          !this.state.isOpen ? null :
          <div className={'iframe-modal'}>
            <div className={'iframe-loader'}/>

            <iframe src={ iframeSrc } title={'Excel document'} frameBorder="0" />

          </div>
        }

      </>
    )
  }
}
