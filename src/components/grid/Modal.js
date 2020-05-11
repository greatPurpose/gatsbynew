import React from 'react'
import { Link } from 'gatsby'
import Button from './Button';
import Logo from './Logo';
import PostType from './PostType';

export default class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.closeRef = React.createRef()
    this.handlerClick = this.handlerClick.bind(this)
  }

  handlerClick() {
    this.closeRef.current.click()
  }

  render() {

    const { data } = this.props
    const html = data.html
    const { title, date, type, path } = data.frontmatter
    const isWhitePaper = !!~path.indexOf('whitepaper')

    return (
      <>
      <div className={'modal'}
        onClick={this.handlerClick}
      />
        <div className={'modal-container'}>

          <div className={'modal-header'}>

            <Logo linkTo={'/'}/>

            <div
            >

            </div>
            <Link
              to={this.props.link}
              className={'modal-link'}
              ref={this.closeRef}
            />

          </div>

          <div className={'modal-caption'}>
            <h2 className={'modal-title'}>
              { title }
            </h2>
            <span className={'modal-date'}>
              {
                !date ? null:
                new Date(date).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
              }
            </span>
          </div>

          {
            !type ? null :
            <div className={'modal-type'}>
              <PostType
                width={'10.7rem'}
                height={'10.7rem'}
                gap={'.97rem'}
                type={type}
              />
            </div>
          }

          <div
            className={"modal-button"}
          >
            {
              !(this.props.pdf && isWhitePaper) ? null :
              <Button
                title={"Download PDF"}
                icon={require('../../assets/img/adobe.svg')}
                link={this.props.pdf}
              />
            }

          </div>

          <div
            className={'modal-content'}
            dangerouslySetInnerHTML={{__html: html}}
          />

        </div>
      </>
    )
  }
}
