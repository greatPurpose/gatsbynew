import React from 'react'
import PropTypes from 'prop-types'
import excelStub from '../../assets/img/excelStub.jpg'
import excelLogo from '../../assets/img/excel.svg'

export default class News extends React.Component{
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.array,
    excelUrl: PropTypes.string,
    documentUrl: PropTypes.string
  };

  constructor(props) {
    super(props)

    this.state = {
      iframeIsMax: false
    }

    this.toggleIframe = this.toggleIframe.bind(this)
  }

  toggleIframe() {
    this.setState({
      iframeIsMax: !this.state.iframeIsMax
    })
  }

  render() {
    return (
      <div className={"company"}>

        {
          !this.state.iframeIsMax ? null :
            <iframe src={this.props.excelUrl}
              title={"excel"}
              id="excel-iframe"
              className={'excel-iframe'}
              frameBorder="0"
              scrolling="no"
            />
        }
        <div
          className={this.state.iframeIsMax ? "iframe__button-maximize" : "iframe__button-maximize hidden"}
          onClick={this.toggleIframe}
        />

        <h1>{this.props.title}</h1>
        <div className="company__col-1">
          {this.props.children}
        </div>
        <div className="company__col-2">
          <div className="company__row-1">
            <section className="company-section"
              dangerouslySetInnerHTML={{ __html: this.props.content[0] }}
            />
            <section className="company-section"
              dangerouslySetInnerHTML={{ __html: this.props.content[1] }}
            />
          </div>
          <div className="company__row-2">

            <img src={excelStub}
               onClick={this.toggleIframe}
               className={"excel-stub"}
               width={"100%"}
               alt="excel"
            />

            <div
              className="company__button-maximize"
              id="maximize"
              onClick={this.toggleIframe}
            />

            {
              !this.props.documentUrl ? null :
                <div className={"excel-download-container"}>
                  <a className={"excel-download"} target={"_blank"} href={this.props.documentUrl}>
                    <img className={"excel-logo"} src={excelLogo} alt="excel logo"/>
                    <span>Download OneDrive Excel</span>
                  </a>
                </div>
            }

          </div>
        </div>
      </div>

    )
  }

}
