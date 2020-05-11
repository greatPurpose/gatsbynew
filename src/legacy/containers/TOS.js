// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar';

import './general.css';

export default class TOS extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <TopNavbar user={this.props.user}/>
        <div className="container TOS">
          <div className="row">
            <div className="col-lg-12">
              <h2>Terms of Use</h2>

              <p>Your use of this web site (the "Site") is subject to the following Terms of Use. Please read them carefully, as they may have changed since your last visit. Your use of this Site indicates your acceptance of these terms.</p>
              <p>IF YOU DO NOT ACCEPT THESE TERMS, THEN DO NOT USE THIS SITE.</p>
              <p>This Site and all the information it contains, or may in the future contain, including, but not limited to: data, visualizations, articles, resources, bulletins, reports, press releases, opinions, text, directories, guides, photographs, illustrations, trademarks, trade names, service marks and logos (collectively, the "Content"), are the property of Varro Analytics (hereafter referred to as "Varro").</p>
              <p>The Content of this Site does not convey legal, accounting, tax, career or other professional advice of any kind. Your use of this Site does not create a relationship between you and the Varro other than that defined by the Varro's Subscription Agreement.</p>
              <p>The Content of this Site concerns topics selected by the Varro Analytics for dissemination to the general public, and is offered on a blind basis, without any knowledge as to your industry, identity or specific circumstances. The application and impact of relevant laws will vary from jurisdiction to jurisdiction. There may be delays, omissions, or inaccuracies in information contained on this Site. The Content of this Site should not be relied upon or used as a substitute for consultation with professional financial, intellectual property or patent advisors.</p>
              <p>The Content of this Site should not be relied upon or used as a substitute for consultation with professional financial, intellectual property or patent advisors. Varro Analytics does not offer legal advice. As legal advice depends upon the specific circumstances of each party, the information provided here should not be used as a substitute for advise from a competent professional.</p>
              <p>The information contained in Varro Analytics sites is believed to be correct at the time it is posted. New funding, new patents and patent applications, altered status of patents, and case law may have resulted in changes in the information provided.</p>
              <p>Varro Analytics makes no warranty that data are correct or up to date at this time and accepts no liability for any use of information provided on its websites.</p>
              <p>Links to external websites are provided for the convenience of the users of Varro Analytics websites. Varro Analytics has no control over the content on external websites and it not responsible for that content.</p>
              <p>Notwithstanding anything contained herein to the contrary, we reserve the right to withdraw or amend this Site, and any Service or material we provide on the Site, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Site is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Site, or the entire Site, to users, including registered users.</p>

              <h3>Account Security</h3>
              <p>If you choose, or are provided with, a user name, password or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you and agree not to provide any other person with access to this Site or portions of it using your user name, password or other security information. You agree to notify us immediately of any unauthorized access to or use of your user name or password or any other breach of security. You also agree to ensure that you exit from your account at the end of each session. You should use particular caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information.</p>
              <p>We have the right to disable any user name, password or other identifier, whether chosen by you or provided by us, at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of this Agreement. We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.</p>
              <p>If you feel that your account has been compromised, you agree to contact us immediately at <b>info@varroanalytics.com</b></p>

            </div>
          </div>
        </div>
      </div>
    )
  }
}