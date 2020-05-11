import React from 'react'
import Button from './Button';

export default class ContentBlock extends React.Component {
  render() {
    const { title, children, gridClass, button } = this.props

    return (
      <div className={'contentBlock ' + (gridClass || '')}>
        {
          !title ? null :
            <div className={button ? 'contentBlock-header contentBlock-header--sb' : 'contentBlock-header'}>
              <h2 className={'contentBlock-title'}> { title } </h2>

              {
                !button ? null :
                <Button
                  link={button.link}
                  title={button.title}
                  icon={button.icon}
                />
              }

            </div>
        }

        { children }

      </div>
    )
  }
}
