// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import * as d3 from 'd3';

import SunburstToolTip from './SunburstToolTip';
import './SunburstChart.css';

export default class SunburstChart extends Component {
  state = {
    width: 0,
    height: 0,
    radius: 0 / 2,

    hoveredCategory: null,
    hoveredPath: [],
    activeCategory: null,
    activePath: [],
    toolTip: false,
    topToolTip: 0,
    leftToolTip: 0,

    root: null,
    categories: {}
  };

  componentWillMount() {
    const { radius } = this.state;

    this.partition = d3.partition()
      .size([2 * Math.PI, radius * radius]);

    this.arc = d3.arc()
      .startAngle((d) => { return d.x0; })
      .endAngle((d) => { return d.x1; })
      .innerRadius((d) => { return Math.sqrt(d.y0); })
      .outerRadius((d) => { return Math.sqrt(d.y1); });

    if (this.props.categories) {
      this.updateHierarchy(this.props.categories);
    }

    document.addEventListener('click', this.handleClickOutside);

    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("orientationchange", this.resizeHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("orientationchange", this.resizeHandler);
  }

  componentDidMount() {
    this.updateWidth(this.wrapper.offsetWidth);
  }

  resizeHandler = () => {
    this.updateWidth(this.wrapper.offsetWidth);
  };

  updateWidth(width) {
    const height = width + 40;
    const radius = width / 2;

    this.partition = d3.partition()
      .size([2 * Math.PI, radius * radius]);

    console.log({ width, height, radius });

    if (this.props.categories) {
      this.updateHierarchy(this.props.categories);
    }

    this.setState({ width, height, radius });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      this.updateHierarchy(nextProps.categories);
    }
  }

  updateHierarchy = (categories) => {
    const root = d3.hierarchy(categories);

    root.sum(d => d.count);
    root.sort((a, b) => b.value - a.value);

    this.partition(root);

    this.setState({ root });
  };

  handleClickOutside = () => {
    this.setState(state => {
      if (state.activeCategory) {
        return { ...state, activeCategory: null, activePath: [], toolTip: false };
      }
      return state;
    });

    this.props.hideGraph();
  };

  getPath = node => {
    if (!node) {
      return [];
    }

    const path = [node.data.name];
    while (node.parent) {
      node = node.parent;
      path.push(node.data.name);
    }

    return path;
  };

  updateToolTipPosition = (event) => {
    if (this.state.activeCategory) {
      return;
    }

    this.setState({
      toolTipTop: event.clientY,
      toolTipLeft: event.clientX
    });
  };

  onMouseEnter = (hoveredCategory) => {
    if (!this.state.activeCategory) {
      this.setState({
        hoveredCategory,
        hoveredPath: this.getPath(hoveredCategory),
        activeCategory: null,
        activePath: [],
        toolTip: true
      });
    }
  };

  onMouseLeave = () => {
    if (!this.state.activeCategory) {
      this.setState({
        hoveredCategory: null,
        hoveredPath: [],
        toolTip: false
      });
    }
  };

  onClick = (event, activeCategory) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (this.state.activeCategory &&
        activeCategory.data.name === this.state.activeCategory.data.name) {
      activeCategory = null;
    }

    const path = this.getPath(activeCategory);

    this.setState({
      hoveredCategory: null,
      hoveredPath: [],
      activeCategory,
      toolTip: !!activeCategory,
      activePath: path,

      toolTipTop: event.clientY,
      toolTipLeft: event.clientX
    });

    if (!!activeCategory) {
      this.props.onClick(path, activeCategory);
    }

  };

  getAngle = (d) => {
    // Offset the angle by 90 deg since the '0' degree axis for arc is Y axis, while
    // for text it is the X axis.
    var thetaDeg = (180 / Math.PI * (this.arc.startAngle()(d) + this.arc.endAngle()(d)) / 2 - 90);
    // If we are rotating the text by more than 90 deg, then "flip" it.
    // This is why "text-anchor", "middle" is important, otherwise, this "flip" would
    // a little harder.
    return (thetaDeg > 90) ? thetaDeg - 180 : thetaDeg;
  };

  render() {
    let { width, height, root } = this.state;

    if (!this.props.categories) {
      return <div ref={elem => this.wrapper = elem} style={{height: this.state.height}}></div>;
    }

    const descendants = root.descendants().slice(1);
    const activeNode = this.state.hoveredCategory || this.state.activeCategory;

    return (
      <div className={"circle-chart"} ref={elem => this.wrapper = elem}>
        {
          this.state.toolTip &&
          <SunburstToolTip top={this.state.toolTipTop}
                           left={this.state.toolTipLeft}
                           path={this.state.hoveredCategory ? this.state.hoveredPath : this.state.activePath}
          />
        }
        <svg width={width} height={height} className="SunburstChart">
          <g transform={"translate(" + width / 2 + "," + height * .52 + ")"}>
            {
              descendants.map((descendant, index) => {
                let style = {
                  fill: descendant.data.color || descendant.parent.data.childrenColor,
                  stroke: 'white',
                  opacity: 0.65
                };

                if (this.state.hoveredCategory) {
                  style.opacity = 0.2;
                  if (this.state.hoveredPath.indexOf(descendant.data.name) >= 0) {
                    style.opacity = 0.65;
                  }
                } else if (this.state.activeCategory) {
                  style.opacity = 0.2;
                  if (this.state.activePath.indexOf(descendant.data.name) >= 0) {
                    style.opacity = 0.65;
                  }
                }

                const d = this.arc(descendant);
                return <path className="arc"
                             d={d}
                             style={style}
                             key={index}
                             onMouseEnter={() => this.onMouseEnter(descendant)}
                             onMouseLeave={() => this.onMouseLeave(descendant)}
                             onMouseMove={this.updateToolTipPosition}
                             onClick={event => this.onClick(event, descendant)}
                />;
              })
            }

            {
              descendants.map((descendant, index) => {
                const centroid = this.arc.centroid(descendant);
                return (
                  <text transform={`translate(${centroid[0]}, ${centroid[1]})
                                    rotate(${this.getAngle(descendant)})`}
                        key={index}>
                    {descendant.data.name}
                  </text>
                );
              })
            }

            <text className="description">
              { activeNode ? activeNode.value : root.value } documents
            </text>
          </g>
        </svg>
      </div>
    )
  }
}
