// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import moment from 'moment';
import * as d3 from 'd3';
import FontAwesome from 'react-fontawesome';
import Slider from 'react-rangeslider';


// import './DateFilter.css';


export default class DateFilter extends Component {
  state = {
    playing: false,
    width: 450,
    height: 20,
  };

  setInterval = null;

  parseDate = d3.timeParse('%Y-%m-%d');

  componentWillReceiveProps(nextProps) {
    if (this.props.currentDate.playing !== nextProps.currentDate.playing) {
      if (!nextProps.currentDate.playing && this.interval) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(() => {
          const { index, value } = this.props.currentDate;

          if (this.props.currentDate.index < this.props.allDates.length - 1) {
            this.props.onChange({
              index: index + 1,
              value: this.props.allDates[index + 1],
              playing: true,
            });
          } else {
            this.props.onChange({ index, value, playing: false });
          }
        }, 500);
      }
    }
  }

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    if (this.setInterval) {
      clearInterval(this.setInterval);
    }
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    this.setState({
      width: this.refs.slider.getBoundingClientRect().width,
    });
  };

  play = () => {
    const { index, value } = this.props.currentDate;
    if (index === this.props.allDates.length - 1) {
      this.props.onChange({ index: 0, value: this.props.allDates[0], playing: true });
    } else {
      this.props.onChange({ index, value, playing: true });
    }
  };

  stop = () => {
    const { index, value } = this.props.currentDate;
    this.props.onChange({ index, value, playing: false });
  };

  handleChange = (value) => {
    this.props.onChange(
      { index: value, value: this.props.allDates[value] },
    );
  };

  tickFormat = d3.timeFormat('%Y');

  render() {

    const { allDates } = this.props;

    const test = (() => {
      let result = {};
      allDates.forEach(item => {
        result[item.slice(0, 4)] = 0;
      });

      return Object.keys(result);
    })();

    let { width, height } = this.state;
    if (!this.props.isMobile) {
      width -= 70;
    } else {
      width -= 20;
    }

    const margins = { top: 20, right: 2, bottom: 20, left: 0 };

    const xDomain = [moment(allDates[0]), moment(allDates[allDates.length - 1])];
    const xRange = [0, width - margins.left - margins.right];
    const xScale = 'time';

    let style = {};
    if (this.props.sticky) {
      style = {
        position: 'fixed',
        top: 0,
        width: '100%',
        left: 0,
        backgroundColor: '#222222',
        zIndex: 500,
        textAlign: 'center',
        margin: 'auto',
        padding: '1rem 1rem 4rem 1rem'
      };
    }

    let ticks = xDomain[1].year() - xDomain[0].year() + 1;
    if (ticks >= 20 && this.state.width <= 550) {
      ticks = 10;
    }

    return (
      <div className="DateFilter" style={style} ref={element => this.wrapper = element}>
        {
          !this.props.sunburst &&
          <h3 className={'DateFilter__header'}>Funds Raised and Valuations as of&nbsp;
            {
              this.props.currentDate.value ?
                moment(this.props.currentDate.value).format('MMMM Y') : ''
            }
          </h3>
        }

        {
          this.props.sunburst &&
          <div className="filterName">Filing Date</div>
        }

        <div className={'DateFilter__content-wrapper'}>
          <div className="playButtonWrapper">
            {
              !this.props.currentDate.playing &&
              <span className="playButton" onClick={this.play}>
                      <span>PLAY</span>
                      <FontAwesome name="play" className="icon"/>
                    </span>
            }
            {
              this.props.currentDate.playing &&
              <span className="playButton" onClick={this.stop}>
                      <span>STOP</span>
                      <FontAwesome name="stop" className="icon"/>
                    </span>
            }
          </div>

          <div className={'sliderWrapper'} ref={'slider'}>
            <Slider
              min={0}
              max={this.props.allDates.length - 1}
              tooltip={false}
              value={this.props.currentDate.index}
              onChange={this.handleChange}
            />

            <div className="test">
              {
                test.map((item, index) => {
                  return (<div className={'test__item'} key={'item' + index}>
                    <div className="test__line" key={'line' + index}>|</div>
                    <div className="test__content" key={'content' + index}>{item}</div>
                  </div>)
                })
              }
            </div>

          </div>
        </div>

      </div>
    );
  }
}
