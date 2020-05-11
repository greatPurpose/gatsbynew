import React from 'react'
import Button from './Button';
import { Link } from 'gatsby'

export default class Whitepaper extends React.Component {
  render() {
    return (
      <div className={'whitepaper'}>
        <div className={'whitepaper-header'}>
          <span className={'whitepaper-header-wrapper'}>
            <span className={'whitepaper-title'}>
              { this.props.data.title }
            </span>
            <span className={'whitepaper-fairly'}>
              Fairly Valued
            </span>
          </span>

          {
            !this.props.pdf ? null :
            <Button
              title={'Download PDF White Paper'}
              icon={require('../../assets/img/adobe.svg')}
              link={this.props.pdf}
            />
          }


        </div>
        <div className={'whitepaper-content'}>
          { this.props.data.excerpt }
          <Link to={this.props.link || '/'} className={'link'}> Read more</Link>
        </div>
      </div>
    )
  }

}
