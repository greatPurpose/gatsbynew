// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar';

import './general.css';

export default class Privacy extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <TopNavbar user={this.props.user}/>
        <div className="container Privacy">
          <div className="row">
            <div className="col-lg-12">
              <h2>Privacy Policy</h2>

              <p>
                Your privacy is critically important to us. At Varro Analytics™ we have a few fundamental principles:
                <ul>
                  <li>We don’t ask you for personal information other than your email address and zip code. (We can’t stand sites that ask you for things like your gender or income level for no apparent reason.)</li>
                  <li>We don’t share your personal information with anyone except to comply with the law and keep our systems secure. We only have your email address so there isn't much to share.</li>
                  <li>We don’t store personal information on our servers.</li>
                </ul>
              </p>
              <p>If you have questions about deleting or correcting your personal data please contact <b>info@VarroAnalytics.com</b></p>

              <h3>Website Visitors</h3>
              <p>Like most website operators, Varro Analytics™ collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Varro’s purpose in collecting non-personally identifying information is to better understand how Varro Analytics’ visitors use its websites. From time to time, Varro may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
              <p>Varro Analytics™ also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on Varro blogs. Varro Analytics only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below, except that blog commenter IP addresses are visible and disclosed to the administrators of the blog where the comment was left.</p>

              <h3>Gathering of Personally-Identifying Information</h3>
              <p>Certain visitors to Varro Analytics websites choose to interact with Varro Analytic in ways that require Varro Analytic to gather personally-identifying information. The amount and type of information that Varro Analytics gathers depends on the nature of the interaction. Those who engage in transactions with Varro Analytics™ — are asked to provide additional information, including as necessary the personal and financial information required to process those transactions. In each case, Varro Analytics™ collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor's interaction with Varro Analytics™. Varro Analytics does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.</p>

              <h3>Aggregated Statistics</h3>
              <p>Varro Analytics™ may collect statistics about the behavior of visitors to its websites. Varro Analytics may display this information publicly or provide it to others. However, Varro Analytics does not disclose personally-identifying information other than as described below.</p>

              <h3>Protection of Certain Personally-Identifying Information</h3>
              <p>Varro Analytics™ discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Varro Analytics' behalf or to provide services available at Varro Analytics' websites, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using Varro Analytics' websites, you consent to the transfer of such information to them. Varro Analytics will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, Varro Analytics™ discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when Varro Analytics believes in good faith that disclosure is reasonably necessary to protect the property or rights of Varro Analytics™, third parties or the public at large. If you are a registered user of an Varro Analytics™ website and have supplied your email address, Varro Analytics™ may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what's going on with Varro and our products. We primarily use our various product blogs to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. Varro takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.</p>

              <h3>Cookies</h3>
              <p>A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. Varro Analytics™ uses cookies to help Varro Analytics identify and track visitors, their usage of Varro Analytics™ website, and their website access preferences. Varro Analytics™ visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Varro Analytics' websites, with the drawback that certain features of Varro Analytics websites may not function properly without the aid of cookies.</p>

              <h3>Business Transfers</h3>
              <p>If Varro Analytics™, or substantially all of its assets, were acquired, or in the unlikely event that Varro Analytics goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of Varro Analytics™ may continue to use your personal information as set forth in this policy.</p>

              <h3>Ads</h3>
              <p>Ads appearing on any of our websites may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by Varro Analytics and does not cover the use of cookies by any advertisers.</p>

              <h3>Privacy Policy Changes</h3>
              <p>Although most changes are likely to be minor, Varro Analytics™ may change its Privacy Policy from time to time, and in Varro Analytics' sole discretion. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.</p>

            </div>
          </div>
        </div>
      </div>
    )
  }
}