// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import * as d3 from 'd3';

import GraphToolTip from './GraphToolTip';
import './PatentsGraph.css'


export default class PatentsGraph extends Component {
  state = {
    graph: null,
    loading: true,

    zoomTransform: null,

    hoveredNode: null,
    activeNode: null
  };

  ticks = 0;

  componentWillMount() {
    //document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    //document.removeEventListener('click', this.handleClickOutside);
  }

  componentDidMount() {
    const d3Graph = d3.select(this.graphSvg);

    const width = this.wrapper.offsetWidth;
    const height = width;

    this.zoomHandler = d3.zoom()
      .scaleExtent([0.1, 40])
      .on('zoom', this.zoomActions);

    d3Graph.call(this.zoomHandler);

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) {
        return d.id
      }))
      .force("collide", d3.forceCollide(function (d) {
        return d.r + 8
      }).iterations(16))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));

    const ticked = () => {
      this.ticks += 1;

      if (this.ticks >= 10) {
        this.simulation.stop();
        this.setState({loading: false})
      }
    };

    this.start = new Date();

    const graph = Object.assign({}, this.props.graph);

    this.setState({graph, width, height});

    this.simulation
      .nodes(graph.nodes)
      .on("tick", ticked)
      .on("end", () => {
        this.setState({loading: false})
      });

    this.simulation.force("link")
      .links(graph.links);  }

  zoomActions = () => {
    this.setState({
      zoomTransform: d3.event.transform
    });
  };

  handleClickOutside = (event) => {

    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.setState(state => {
      if (state.clicked) {
        return { ...state, clicked: false, hoveredNode: null };
      }
      return state;
    })
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.loading !== nextState.loading ||
      this.state.zoomTransform !== nextState.zoomTransform ||
      this.state.hoveredNode !== nextState.hoveredNode;
  };

  componentDidUpdate() {
    const d3Graph = d3.select(this.graphSvg);

    d3Graph.call(this.zoomHandler)
  }

  onMouseEnter(hoveredNode, event) {
    const { clientY, clientX } = event;

    this.setState(state => {
      if (!state.clicked) {
        state.hoveredNode = hoveredNode;
        state.toolTipTop = clientY;
        state.toolTipLeft = clientX;
      }

      return state;
    })
  }

  onMouseLeave = () => {
    this.setState(state => {
      if (!state.clicked) {
        state.hoveredNode = null;
      }
      return state;
    });
  };

  onClick = (event, node) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    const { clientY, clientX } = event;

    this.setState(state => {
      if (!state.clicked) {
        state.clicked = true;
        state.hoveredNode = node;
      } else if (state.clicked && state.hoveredNode.id === node.id) {
        state.clicked = false;
        state.hoveredNode = null;
      } else {
        state.hoveredNode = node;
      }

      state.toolTipTop = clientY;
      state.toolTipLeft = clientX;

      return state;
    });
  };

  render() {
    const { width, height, zoomTransform } = this.state;

    return (
      <div className="PatentsGraph" ref={element => this.wrapper = element}>
        {
          this.state.loading &&
          <div>
            Loading...
            <svg width={width} height={height} ref={element => this.graphSvg = element}>
              <text>LOADING...</text>
            </svg>
          </div>
        }

        {
          this.state.hoveredNode &&
          <GraphToolTip patent={this.state.hoveredNode}
                        top={this.state.toolTipTop}
                        left={this.state.toolTipLeft}
          />
        }

        {
          !this.state.loading &&
          <svg width={width} height={height}
               style={{cursor: 'move', border: '1px solid #dedede'}}
               onClick={this.handleClickOutside}
               ref={element => this.graphSvg = element}>
            <g
              transform={zoomTransform ? `translate(${zoomTransform.x}, ${zoomTransform.y}) scale(${zoomTransform.k})` : ''}>
              {
                this.state.graph.links.map((link, index) => {
                  let stroke = 'white';
                  if (this.state.hoveredNode && link.source.id === this.state.hoveredNode.id) {
                    stroke = 'red';
                  }

                  return <line key={index}
                               x1={link.source.x} y1={link.source.y}
                               x2={link.target.x} y2={link.target.y}
                               stroke={stroke}
                  />
                })
              }

              {
                this.state.graph.nodes.map(node => {
                  let color = this.props.color || "blue";
                  if (this.state.hoveredNode && this.state.hoveredNode.id === node.id) {
                    color = 'orange';
                  }

                  return <circle key={node.id}
                                 fill={color}
                                 onMouseEnter={event => this.onMouseEnter(node, event)}
                                 onMouseLeave={this.onMouseLeave}
                                 onClick={event => this.onClick(event, node)}
                                 cx={node.x} cy={node.y} r={node.size} />
                })
              }
            </g>
          </svg>
        }

      </div>
    )
  }
}