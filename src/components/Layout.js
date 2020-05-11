// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
// import { StaticQuery, graphql } from 'gatsby';
// import SideBar from '../components/Sidebar';
// import PageFooter from '../components/PageFooter';
//
// import '../assets/sass/main.scss';
//
// class Layout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isPreloaded: true,
//     };
//   }
//
//   componentDidMount() {
//     this.timeoutId = setTimeout(() => {
//       this.setState({ isPreloaded: false });
//     }, 100);
//   }
//
//   componentWillUnmount() {
//     if (this.timeoutId) {
//       clearTimeout(this.timeoutId);
//     }
//   }
//
//   render() {
//     const { isPreloaded } = this.state;
//     return (
//       <StaticQuery
//         query={graphql`
//           query SiteTitleQuery {
//             site {
//               siteMetadata {
//                 title
//               }
//             }
//           }
//         `}
//         render={data => (
//           <>
//             <Helmet
//               title={data.site.siteMetadata.title}
//               meta={[
//                 { name: 'description', content: 'Eventually' },
//                 { name: 'keywords', content: 'site, web' },
//               ]}
//             >
//               <html lang="en" />
//             </Helmet>
//             <div className={isPreloaded ? 'main-body is-preload' : 'main-body'}>
//               <SideBar />
//               <div id="main">
//                 {this.props.children}
//               </div>
//
//               <PageFooter />
//             </div>
//           </>
//         )}
//       />
//     );
//   }
// }
//
// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };
//
// export default Layout;
