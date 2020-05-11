import React from 'react';
import Header from './Header';
import Nav from './Nav';
import sidenavItems from '../../content/sidenav';

export default function SideBar() {
  return (
    <div className={'header'}>
      <Header/>
      <Nav sections={sidenavItems} />
    </div>
  );
}
