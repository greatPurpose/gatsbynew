import React from 'react'
import PostTypeCell from './PostTypeCell'

const TYPE_COLOR_1 = '#00A14B'
const TYPE_COLOR_2 = '#8BC53F'
const TYPE_COLOR_3 = '#ED8A19'
const TYPE_COLOR_4 = '#EC1C24'


export default class PostType extends React.Component {
  render() {
    let { type } = this.props

    return (
      <div className={'post-type'}
         style={{
           width: this.props.width  || '100%',
           height: this.props.width || '100%',
           gridGap: this.props.gap || '1rem'
         }}
      >

        <PostTypeCell
          active={type === 1}
          color={TYPE_COLOR_1}
        />

        <PostTypeCell
          active={type === 2}
          color={TYPE_COLOR_2}
        />

        <PostTypeCell
          active={type === 3}
          color={TYPE_COLOR_3}
        />

        <PostTypeCell
          active={type === 4}
          color={TYPE_COLOR_4}
        />

      </div>
    )
  }

}
