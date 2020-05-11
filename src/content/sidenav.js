// Sidebar navigation menu items

export default [
  { linkTo: '/home', name: 'Home' },
  { linkTo: '/healthcare', name: 'Healthcare Specialist Fund 13F Explorer' },
  { linkTo: '/companies', name: 'Company Analysis', children: [
      { linkTo: '/companies/illumina', name: 'Illumina' },
      { linkTo: '/companies/invitae', name: 'Invitae' },
      { linkTo: '/companies/twist_bioscience', name: 'Twist Bioscience' },
    ]},
  { linkTo: '/archives', name: 'SynBio Archives', children: [
      { linkTo: '/fundraising', name: 'Fundraising Explorer' },
      { linkTo: '/patents', name: 'Patent Explorer' },
    ]},
  { linkTo: '/faq', name: 'FAQ' },
  { linkTo: '/contact', name: 'Contact' },
];
