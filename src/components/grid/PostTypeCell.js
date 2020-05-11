import React from 'react'

export default class PostTypeCell extends React.Component {
  render() {
    return (
      <div className={'post-type-cell'}
        style={{
          backgroundColor: this.props.active ? this.props.color : null
        }}
      />
    )
  }

}
