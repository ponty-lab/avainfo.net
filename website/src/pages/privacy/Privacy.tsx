import styled from "styled-components";
import Legal from "../../components/legal";
import { contactEmail } from "../../utils/constants";
import { ScrollView, Wrapper } from "../../styles/pages.style";
import { StyledLI, StyledUL } from "../../styles/typography.style";
import { Link } from "react-router-dom";

const Privacy = () => {
  const mailto = `mailto:${contactEmail}`;
  return (
    <div>
      <ScrollView>
        <Banner>
          <Wrapper>
            <h1 style={{ color: "white", fontSize: 42, fontWeight: 500 }}>
              LEGAL
            </h1>
          </Wrapper>
        </Banner>
        <Wrapper>
          <h1>AvaInfo's Privacy Notice</h1>

          <div style={{ marginBottom: 36 }}>
            <p>Last updated 10 March 2023</p>
            <p>
              Thank you for choosing to be part of our community at AvaInfo (
              <b>"AvaInfo"</b>, <b>"we"</b>, <b>"us"</b>, <b>"our"</b>). We are
              committed to protecting your personal information and your right
              to privacy. If you have any questions or concerns about this
              privacy notice, or our practices with regards to your personal
              information, please contact us at {contactEmail}.
            </p>
            <p>
              When you visit our website{" "}
              <a href="http://www.avainfo.net">http://www.avainfo.net</a> (the
              <b>"Website"</b>
              ), use our mobile application, as the case may be (the{" "}
              <b>"App"</b>) and more generally, use any of our services (the{" "}
              <b>"Services"</b>, which include the Website and App), we
              appreciate that you are trusting us with your personal
              information. We take your privacy very seriously. In this privacy
              notice, we seek to explain to you in the clearest way possible
              what information we collect, how we use it and what rights you
              have in relation to it. We hope you take some time to read through
              it carefully, as it is important. If there are any terms in this
              privacy notice that you do not agree with, please discontinue use
              of our Services immediately. This privacy notice applies to all
              information collected through our Services (which, as described
              above, includes our Website and App), as well as, any related
              services, sales, marketing or events.
            </p>
            <p>
              <b>
                Please read this privacy notice carefully as it will help you
                understand what we do with the information that we collect.
              </b>
            </p>

            <h2 id="collect">1 | What Infomation Do We Collect?</h2>
            <h3>Personal information you disclose to us</h3>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>We collect personal information that you provide to us.</i>
              </p>
            </Highlight>
            <p>
              We collect personal information that you voluntarily provide to us
              when you register on the Services, express an interest in
              obtaining information about us or our products and Services or
              otherwise contact us.
            </p>
            <p>
              The personal information that we collect depends on the context of
              your interactions with us and the Services, the choices you make
              and the products and features you use. The personal information we
              collect may include the following:
            </p>

            <StyledUL>
              <StyledLI>
                <b>Personal Information Provided by You.</b> We collect names;
                email addresses; usernames; passwords; and other similar
                information.
              </StyledLI>
            </StyledUL>

            <p>
              All personal information that you provide to us must be true,
              complete and accurate, and you must notify us of any changes to
              such personal information.
            </p>
            <h3>Information automatically collected </h3>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  Some information — such as your Internet Protocol (IP) address
                  and/or browser and device characteristics — is collected
                  automatically when you visit our Services.
                </i>
              </p>
            </Highlight>
            <p>
              We automatically collect certain information when you visit, use
              or navigate the Services. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Services and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our
              internal analytics and reporting purposes.
            </p>
            <p>The information we collect includes:</p>
            <StyledUL>
              <StyledLI>
                <i>Log and Usage Data.</i>
                {"  "}Log and usage data is service-related, diagnostic, usage
                and performance information our servers automatically collect
                when you access or use our Services and which we record in log
                files. Depending on how you interact with us, this log data may
                include your IP address, device information, browser type and
                settings and information about your activity in the Services
                (such as the date/time stamps associated with your usage, pages
                and files viewed, searches and other actions you take such as
                which features you use), device event information (such as
                system activity, error reports (sometimes called 'crash dumps')
                and hardware settings).
              </StyledLI>
              <StyledLI>
                <i>Device Data.</i>
                {"  "}We collect device data such as information about your
                computer, phone, tablet or other device you use to access the
                Services. Depending on the device used, this device data may
                include information such as your IP address (or proxy server),
                device and application identification numbers, location, browser
                type, hardware model Internet service provider and/or mobile
                carrier, operating system and system configuration information.
              </StyledLI>
              <StyledLI>
                <i>Location Data.</i>
                {"  "}We collect location data such as information about your
                device's location, which can be either precise or imprecise. How
                much information we collect depends on the type and settings of
                the device you use to access the Services. For example, we may
                use GPS and other technologies to collect geolocation data that
                tells us your current location (based on your IP address). You
                can opt out of allowing us to collect this information either by
                refusing access to the information or by disabling your Location
                setting on your device. Note however, if you choose to opt out,
                you may not be able to use certain aspects of the Services.
              </StyledLI>
            </StyledUL>
            <h3>Information collected through our App</h3>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  We collect information regarding your geo-location, mobile
                  device, push notifications, when you use ou r App.
                </i>
              </p>
            </Highlight>
            <p>
              If you use our App, we also collect the following information:
            </p>
            <StyledUL>
              <StyledLI>
                <i>Geo-Location Information.</i>
                {"  "}We may request access or permission to and track
                location-based information from your mobile device, either
                continuously or while you are using our App, to provide certain
                location-based services. If you wish to change our access or
                permissions, you may do so in your device's settings. Mobile
                Device Access. We may request access or permission to certain
                features from your mobile device, including your mobile device's
                camera, storage, bluetooth, microphone, sensors, and other
                features. If you wish to change our access or permissions, you
                may do so in your device's settings.
              </StyledLI>
              <StyledLI>
                <i>Mobile Device Data.</i>
                {"  "}We automatically collect device information (such as your
                mobile device ID, model and manufacturer), operating system,
                version information and system configuration information, device
                and application identification numbers, browser type and
                version, hardware model Internet service provider and/or mobile
                carrier, and Internet Protocol (IP) address (or proxy server).
                If you are using our App, we may also collect information about
                the phone network associated with your mobile device, your
                mobile device's operating system or platform, the type of mobile
                device you use, your mobile device's unique device ID and
                information about the features of our App you accessed.
              </StyledLI>
              <StyledLI>
                <i>Push Notifications.</i>
                {"  "} We may request to send you push notifications regarding
                your account or certain features of the App. If you wish to
                opt-out from receiving these types of communications, you may
                turn them off in your device's settings. This information is
                primarily needed to maintain the security and operation of our
                App, for troubleshooting and for our internal analytics and
                reporting purposes.
              </StyledLI>
            </StyledUL>

            <p>
              This information is primarily needed to maintain the security and
              operation of our App, for troubleshooting and for our internal
              analytics and reporting purposes.
            </p>

            <h2 id="useinfo">2 | How Do We Use Your Information?</h2>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  We process your information for purposes based on legitimate
                  business interests, the fulfillment of our contract with you,
                  compliance with our legal obligations, and/or your consent.
                </i>
              </p>
            </Highlight>
            <p>
              We use personal information collected via our Services for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations. We indicate the specific processing grounds
              we rely on next to each purpose listed below.
            </p>
            <p>We use the information we collect or receive:</p>
            <StyledUL>
              <StyledLI>
                <b>To facilitate account creation and logon process.</b>
                {"  "}
                If you choose to link your account with us to a third-party
                account (such as your Google or Facebook account), we use the
                information you allowed us to collect from those third parties
                to facilitate account creation and logon process for the
                performance of the contract. See the section below headed{" "}
                <a href="social">"How Do We Handle Your Social Logins"</a> for
                further information.
              </StyledLI>
              <StyledLI>
                <b>To post testimonials.</b>
                {"  "}
                We post testimonials on our Services that may contain personal
                information. Prior to posting a testimonial, we will obtain your
                consent to use your name and the content of the testimonial. If
                you wish to update, or delete your testimonial, please contact
                us at <a href={mailto}> {contactEmail} </a> and be sure to
                include your name, testimonial location, and contact
                information.
              </StyledLI>
              <StyledLI>
                <b>Request feedback.</b>
                {"  "}
                We may use your information to request feedback and to contact
                you about your use of our Services.
              </StyledLI>
              <StyledLI>
                <b>To enable user-to-user communications.</b>
                {"  "}
                We may use your information in order to enable user-to-user
                communications with each user's consent.
              </StyledLI>
              <StyledLI>
                <b>To manage user accounts.</b>
                {"  "}
                We may use your information for the purposes of managing our
                account and keeping it in working order.
              </StyledLI>
              <StyledLI>
                <b>To send administrative information to you.</b>
                {"  "}
                We may use your personal information to send you product,
                service and new feature information and/or information about
                changes to our terms, conditions, and policies.
              </StyledLI>
              <StyledLI>
                <b>To protect our Services.</b>
                {"  "}
                We may use your information as part of our efforts to keep our
                Services safe and secure (for example, for fraud monitoring and
                prevention).
              </StyledLI>
              <StyledLI>
                <b>
                  To enforce our terms, conditions and policies for business
                  purposes, to comply with legal and regulatory requirements or
                  in connection with our contract.
                </b>
              </StyledLI>
              <StyledLI>
                <b>To respond to legal requests and prevent harm.</b> If we
                receive a subpoena or other legal request, we may need to
                inspect the data we hold to determine how to respond.
              </StyledLI>
              <StyledLI>
                <b>Fulfill and manage your orders.</b> We may use your
                information to fulfill and manage your orders, payments,
                returns, and exchanges made through the Services.
              </StyledLI>
              <StyledLI>
                <b>Administer prize draws and competitions.</b> We may use your
                information to administer prize draws and competitions when you
                elect to participate in our competitions.
              </StyledLI>
              <StyledLI>
                <b>
                  To deliver and facilitate delivery of services to the user.
                </b>{" "}
                We may use your information to provide you with the requested
                service.
              </StyledLI>
              <StyledLI>
                <b>To respond to user inquiries/offer support to users.</b> We
                may use your information to respond to your inquiries and solve
                any potential issues you might have with the use of our
                Services.
              </StyledLI>
              <StyledLI>
                <b>For other Business Purposes.</b> We may use your information
                for other Business Purposes, such as data analysis, identifying
                usage trends, determining the effectiveness of our promotional
                campaigns and to evaluate and improve our Services, products,
                marketing and your experience. We may use and store this
                information in aggregated and anonymized form so that it is not
                associated with individual end users and does not include
                personal information. We will not use identifiable personal
                information without your consent.
              </StyledLI>
            </StyledUL>
            <h2 id="share">3 | Will Your Information Be Shared With Anyone?</h2>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  We only share information with your consent, to comply with
                  laws, to provide you with services, to protect your rights, or
                  to fulfill business obligations.
                </i>
              </p>
            </Highlight>
            <p>
              We may process or share data based on the following legal basis:
            </p>
            <StyledUL>
              <StyledLI>
                <b>Consent:</b>
                {"  "}
                We may process your data if you have given us specific consent
                to use your personal information in a specific purpose.
              </StyledLI>
              <StyledLI>
                <b>Legitimate Interests:</b>
                {"  "}
                We may process your data when it is reasonably necessary to
                achieve our legitimate business interests.
              </StyledLI>
              <StyledLI>
                <b>Performance of a Contract:</b>
                {"  "}
                Where we have entered into a contract with you, we may process
                your personal information to fulfill the terms of our contract.
              </StyledLI>
              <StyledLI>
                <b>Legal Obligations:</b>
                {"  "}
                We may disclose your information where we are legally required
                to do so in order to comply with applicable law, governmental
                requests, a judicial proceeding, court order, or legal process,
                such as in response to a court order or a subpoena (including in
                response to public authorities to meet national security or law
                enforcement requirements).
              </StyledLI>
              <StyledLI>
                <b>Vital Interests:</b>
                {"  "}
                We may disclose your information where we believe it is
                necessary to investigate, prevent, or take action regarding
                potential violations of our policies, suspected fraud,
                situations involving potential threats to the safety of any
                person and illegal activities, or as evidence in litigation in
                which we are involved.
              </StyledLI>
            </StyledUL>
            <p>
              More specifically, we may need to process your data or share your
              personal information in the following situations:
            </p>
            <StyledUL>
              <StyledLI>
                <b>Business Transfers.</b>
                {"  "}
                We may share or transfer your information in connection with, or
                during negotiations of, any merger, sale of company assets,
                financing, or acquisition of all or a portion of our business to
                another company.
              </StyledLI>
              <StyledLI>
                <b>
                  Vendors, Consultants and Other Third-Party Service Providers.
                </b>
                {"  "}
                We may share your data with third-party vendors, service
                providers, contractors or agents who perform services for us or
                on our behalf and require access to such information to do that
                work. Examples include: payment processing, data analysis, email
                delivery, hosting services, customer service and marketing
                efforts. We may allow selected third parties to use tracking
                technology on the Services, which will enable them to collect
                data on our behalf about how you interact with our Services over
                time. This information may be used to, among other things,
                analyze and track data, determine the popularity of certain
                content, pages or features, and better understand online
                activity. Unless described in this notice, we do not share,
                sell, rent or trade any of your information with third parties
                for their promotional purposes. We have contracts in place with
                our data processors, which are designed to help safeguard your
                personal information. This means that they cannot do anything
                with your personal information unless we have instructed them to
                do it. They will also not share your personal information with
                any organization apart from us. They also commit to protect the
                data they hold on our behalf and to retain it for the period we
                instruct.
              </StyledLI>
            </StyledUL>

            <h2 id="thirdparty">
              4 | Who Will Your Information Be Shared With?
            </h2>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  We only share information with the following third parties.
                </i>
              </p>
            </Highlight>
            <p>
              We only share and disclose your information with the following
              third parties. We have categorized each party so that you may be
              easily understand the purpose of our data collection and
              processing practices. If we have processed your data based on your
              consent and you wish to revoke your consent, please contact us
              using the contact details provided in the section below titled{" "}
              <a href="contact">"How Can You Contact Us About This Notice?"</a>.
            </p>
            <StyledUL>
              <StyledLI>
                Allow users to Connect To Third-Party Accounts
              </StyledLI>
              <StyledLI>Functionality and Infrastructure Optimization</StyledLI>
              <StyledLI>User Account Registration and Authentication</StyledLI>
              <StyledLI>Website Hosting and Testing</StyledLI>
            </StyledUL>

            <h2 id="social">5 | How Do We Handle Your Social Logins?</h2>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  If you choose to register or log in to our services using a
                  social media account, we may have access to certain
                  information about you.
                </i>
              </p>
            </Highlight>
            <p>
              Our Services offer you the ability to register and login using
              your third-party social media account details (like your Facebook
              or Twi tter logins). Where you choose to do this, we will receive
              certain profile information about you from your social media
              provider. The profile Information we receive may vary depending on
              the social media provider concerned, but will often include your
              name, e-mail address, friends list, profile picture as well as
              other information you choose to make public on such social media
              platform.
            </p>
            <p>
              We will use the information we receive only for the purposes that
              are described in this privacy notice or that are otherwise made
              clear to you on the relevant Services. Please note that we do not
              control, and are not responsible for, other uses of your personal
              information by your third-party social media provider. We
              recommend that you review their privacy notice to understand how
              they collect, use and share your personal information, and how you
              can set your privacy preferences on their sites and apps.
            </p>

            <h2 id="duration">6 | How Long Do We Keep Your Information?</h2>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                We keep your information for as long as necessary to fulfill the
                purposes outlined in this privacy notice unless otherwise
                required by law.
              </p>
            </Highlight>
            <p>
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting or other legal requirements). No purpose in this
              notice will require us keeping your personal information for
              longer than the period of time in which users have an account with
              us.
            </p>
            <p>
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize it, or,
              if this is not possible (for example, because your personal
              information has been stored in backup archives), then we will
              securely store your personal information and isolate it from any
              further processing until deletion is possible.
            </p>

            <h2 id="store">7 | How Do We Keep Your Information Safe?</h2>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  We aim to protect your personal information through a system
                  of organizational and technical security measures.
                </i>
              </p>
            </Highlight>
            <p>
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure, so we cannot promise or guarantee
              that hackers, cybercriminals, or other unauthorized third parties
              will not be able to defeat our security, and improperly collect,
              access, steal, or modify your information. Although we will do our
              best to protect your personal information, transmission of
              personal information to and from our Services is at your own risk.
              You should only access the Services within a secure environment.
            </p>

            <h2 id="rights">8 | What Are Your Privacy Rights?</h2>
            <Highlight>
              <p>
                <b>In Short:</b>
                {"  "}
                <i>
                  In some regions, such as the European Economic Area, you have
                  rights that allow you greater access to and control over your
                  personal information. You may review, change, or terminate
                  your account at any time.
                </i>
              </p>
            </Highlight>
            <p>
              In some regions (like the European Economic Area), you have
              certain rights under applicable data protection laws. These may
              include the right (i) to request access and obtain a copy of your
              personal information, (ii) to request rectification or erasure;
              (iii) to restrict the processing of your personal information; and
              (iv) if applicable, to data portability. In certain circumstances,
              you may also have the right to object to the processing of your
              personal information. To make such a request, please use the
              contact details provided below. We will consider and act upon any
              request in accordance with applicable data protection laws.
            </p>
            <p>
              If we are relying on your consent to process your personal
              information, you have the right to withdraw your consent at any
              time. Please note however that this will not affect the lawfulness
              of the processing before its withdrawal, nor will it affect the
              processing of your personal information conducted in reliance on
              lawful processing grounds other than consent.
            </p>
            <p>
              If you are a resident in the European Economic Area and you
              believe we are unlawfully processing your personal information,
              you also have the right to complain to your local data protection
              supervisory authority. You can find their contact details{" "}
              <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.">
                here
              </a>
              .
            </p>
            <p>
              If you are a resident in Switzerland, the contact details for the
              data protection authorities are available{" "}
              <a href="https://www.edoeb.admin.ch/edoeb/en/home.html">here</a>.
            </p>
            <p>
              If you have questions or comments about your privacy rights, you
              may email us at <a href={mailto}>{contactEmail}</a>
            </p>

            <h3>Account Information</h3>
            <p>
              If you would at any time like to review or change the information
              in your account or terminate your account, you can:
            </p>
            <StyledUL>
              <StyledLI>
                Contact us using the contact information provided.
              </StyledLI>
              <StyledLI>
                Log in to your account settings and update your user account.
              </StyledLI>
            </StyledUL>
            <p>
              Upon your request to terminate your account, we will deactivate or
              delete your account and information from our active databases.
              However, we may retain some information in our files to prevent
              fraud, troubleshoot problems, assist with any investigations,
              enforce our Terms of Use and/or comply with applicable legal
              requirements.
            </p>
            <p>
              <span style={{ textDecoration: "underline" }}>
                <b>Opting out of email marketing:</b>
              </span>{" "}
              You can unsubscribe from our marketing email list at any time by
              clicking on the unsubscribe link in the emails that we send or by
              contacting us using the details provided below. You will then be
              removed from the marketing email list — however, we will still
              need to send you service-related emails that are necessary for the
              administration and use of your account. To otherwise opt-out, you
              may:
            </p>
            <StyledUL>
              <StyledLI>
                Contact us using the contact information provided.
              </StyledLI>
              <StyledLI>
                Use the unsubscribe link at the bottom of any marketing emails,
                newsletters, or other non-essential communications.
              </StyledLI>
            </StyledUL>

            <h2 id="donottrack">9 | Controls For Do-Not-Track Features</h2>
            <p>
              Most web browsers and some mobile operating systems and mobile
              applications include a Do-Not-Track (“DNT”) feature or setting you
              can activate to signal your privacy preference not to have data
              about your online browsing activities monitored and collected. No
              uniform technology standard for recognizing and implementing DNT
              signals has been finalized. As such, we do not currently respond
              to DNT browser signals or any other mechanism that automatically
              communicates your choice not to be tracked online. If a standard
              for online tracking is adopted that we must follow in the future,
              we will inform you about that practice in a revised version of
              this privacy notice.
            </p>

            <h2 id="california">
              10 | Do California Residents Have Specific Privacy Rights?
            </h2>
            <Highlight>
              <p>
                <b>In Short:</b>{" "}
                <i>
                  Yes, if you are a resident of California, you are granted
                  specific rights regarding access to your personal information.
                </i>
              </p>
            </Highlight>
            <p>
              California Civil Code Section 1798.83, also known as the “Shine
              The Light” law, permits our users who are California residents to
              request and obtain from us, once a year and free of charge,
              information about categories of personal information (if any) we
              disclosed to third parties for direct marketing purposes and the
              names and addresses of all third parties with which we shared
              personal information in the immediately preceding calendar year.
              If you are a California resident and would like to make such a
              request, please submit your request in writing to us using the
              contact information provided below.
            </p>
            <p>
              If you are under 18 years of age, reside in California, and have a
              registered account with the Services, you have the right to
              request removal of unwanted data that you publicly post on the
              Services. To request removal of such data, please contact us using
              the contact information provided below, and include the email
              address associated with your account and a statement that you
              reside in California. We will make sure the data is not publicly
              displayed on the Services, but please be aware that the data may
              not be completely or comprehensively removed from our systems.
            </p>

            <h2 id="updates">11 | Do We Make Updates To This Notice?</h2>
            <Highlight>
              <p>
                <b>In Short:</b>{" "}
                <i>
                  Yes, we will update this notice as necessary to stay compliant
                  with relevant laws.
                </i>
              </p>
            </Highlight>
            <p>
              We may update this privacy notice from time to time. The updated
              version will be indicated by an updated “Revised” date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy notice, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy notice frequently to be informed of how we are
              protecting your information.
            </p>

            <h2 id="contact">12 | How Can You Contact Us About This Notice?</h2>
            <p>
              If you have questions or comments about this notice, you may email
              us at <a href={mailto}>{contactEmail}</a>
            </p>

            <h2 id="policy">
              13 | How Can You Review, Update, Or Delete The Data We Collect
              From You?
            </h2>
            <p>
              Based on the applicable laws of your country, you may have the
              right to request access to the personal information we collect
              from you, change that information, or delete it in some
              circumstances. To request to review, update, or delete your
              personal information, please you email us at{" "}
              <a href={mailto}>{contactEmail}</a>. We will respond to your
              request within 30 days.
            </p>
          </div>
        </Wrapper>
        <Legal>
          <>
            This privacy policy was created using{" "}
            <a href="https://termly.io/products/privacy-policy-generator/?ftseo">
              {" "}
              Termly's Privacy Policy Generator |{" "}
              <PrivacyLink to="/terms">Terms of Use</PrivacyLink>
            </a>
          </>
        </Legal>
      </ScrollView>
    </div>
  );
};

const Banner = styled.div`
  display: block;
  background: ${({ theme }) => theme.colors.primary};
  padding-top: 36px;
  padding-bottom: 12px;
`;

const Highlight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: rgba(14, 33, 39, 0.05);
  white-space: pre-wrap;
  border-radius: 3px;
  padding: 12px 12px 0px;
  margin-bottom: 12px;
`;

export const PrivacyLink = styled(Link)`
  color: white;
`;

export default Privacy;
