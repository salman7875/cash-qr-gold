import { Component} from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage{
  privacy: any = [
    {
      title: `Introduction to Privacy Policy`,
      description: [
        `This privacy policy (the "PRIVACY POLICY") applies to your use of the website of Alt-Pi hosted at alt-pi.com, the Services (as defined under the Alt-Pi "Terms of Use") and Alt-Pi applications on mobile platforms (Android, Windows Phone, iOS etc.) (collectively ("Alt-Pi" or "WEBSITE")), but does not apply to any third-party websites that may be linked to them, or any relationships you may have with the businesses listed on Alt-Pi . The terms "WE", "OUR" and "US" refer to Alt-Pi and the terms "YOU", "YOUR" and "USER" refer to you, as a user of Alt-Pi. The term "PERSONAL INFORMATION" means information that you provide to us that personally identifies you to be contacted or identified, such as your name, phone number, email address, and any other data that is tied to such information. Our practices and procedures in relation to the collection and use of Personal Information have been set-out below in order to ensure safe usage of the Website for you.`,
        `We have implemented reasonable security practices and procedures that are commensurate with the information assets being protected and with the nature of our business. While we try our best to provide security that is better than the industry standards, because of the inherent vulnerabilities of the internet, we cannot ensure or warrant complete security of all information that is being transmitted to us by you. By visiting this Website, you agree and acknowledge to be bound by this Privacy Policy and you hereby consent that we will collect, use, process and share your Personal Information in the manner set out herein below. If you do not agree with these terms, do not use the Website.`,
        `It is clarified that the terms and conditions that are provided separately, form an integral part of your use of this Website and should be read in conjunction with this Privacy Policy.`,
      ],
    },
    {
      title: `Information we collect and how we use it`,
      description: [
        `We collect, receive and store your Personal Information. If you provide your third-party account credentials ("THIRD PARTY ACCOUNT INFORMATION") to us, you understand that some content and information in those accounts may be transmitted to your account with us if you authorise such transmissions and that Third Party Account Information transmitted to us shall be covered by this Privacy Policy. You may opt to not provide us with certain information, however that will restrict you from registering with us or availing of some of our features and services.`,
        `We use commercially reasonable efforts to ensure that the collection of Personal Information is limited to that which is necessary to fulfill the purposes identified below. If we use or plan to use your information in a manner different from the purpose for which it is collected, then we will ask you for your consent prior to such use.
        `,
        `The Personal Information collected will be used only for the purpose of enabling you to use the services provided by us, to help promote a safe service, calibrate consumer interest in our products and services, inform you about online offers and updates, troubleshoot problems, customize User experience, detect and protect us against error, fraud and other criminal activity, collect money, enforce our terms and conditions, and as otherwise described to you at the time of collection of such information.
        `,
      ],
    },
    {
      title: `Account information`,
      description: [
        `If you create an account to take advantage of the full range of services offered on Alt-Pi, we ask for and record Personal Information such as your name, email address and mobile number. We may collect and store your Sensitive Personal Data or Information (such as any financial information including inter alia credit card, debit card details, bank account and know your customer ("KYC") documents as per RBI regulations and any other information as may be applicable) that the User may opt to save in the User account created with Alt-Pi]. We use your email address to send you updates, news, and newsletters (if you willingly subscribe to the newsletter during signup, or anytime after signup) and contact you on behalf of other Users (such other Users who send you friend requests, personal messages, or other social collaboration based events). [If you do not want to receive communications from us that are not relevant to you or your use of our services, please click on the unsubscribe link provided at the bottom of such emails sent to you by us. We use your mobile numbers to send you transaction alerts and SMS alerts based on your preferences. If you do not wish to receive such SMSs from us, please notify us at contact@alt-pi.com to stop receiving SMSs from us. Alt-Pi assures that your Personal Information will not be made public or sold to any third party.
          `,
        `We also store customer information of customers making payments through Alt-Pi. However, only when customer chooses to share the information on the businesses powered with Alt-Pi applications we share the information to respective businesses. However, Alt-Pi is not liable in any way for any misuse of this information by the business or people related to the businesses to whom the information is shared by the customer.`,
      ],
    },
    {
      title: `Right to Delete Account`,
      description: [
        `The User shall have an option to erase any information provided by the User including Personal Information. If a User opts for the said option of erasure, Alt-Pi shall delete all stored information of the User from its servers.`,
        `You may request the deletion or removal of Your User Account, Personal Information, Transactional Information or Other Information which is specifically collected/stored/processed by the Company for the purpose of facilitating various services on the Platform. We will comply with Your request as aforesaid where there’s no compelling reason for Us to keep the aforementioned information. Such right of erasure can be exercised by writing to Us at contact@alt-pi.com. This is not a general right to erasure; there are exceptions, such as when the law requires Alt-Pi to retain certain Personal Information about You or where such retention is required for providing Platform Services to You, etc. If You intend for Alt-Pi to not retain Your information for provision of Platform Services, You may exercise Your right to erasure as provided herein and delete Your Account with Alt-Pi immediately, post which the Company shall not be liable to provide You any Platform Services from the date of such erasure.`,
      ],
    },
    {
      title: `Feedback`,
      description: [
        `If you contact us to provide feedback, register a complaint, or ask a question, we will record any Personal Information and other content that you provide in your communication so that we can effectively respond to your communication.
        `,
      ],
    },
    {
      title: `Activity`,
      description: [
        `We record information relating to your use of Alt-Pi, such as the searches you undertake, the pages you view, your browser type, IP address, location, requested URL, referring URL, and timestamp information. We use this type of information to administer Alt-Pi and provide the highest possible level of security and service to you. We also use this information in the aggregate to perform statistical analyses of User behavior and characteristics in order to measure interest in and use of the various areas of Alt-Pi. However, you cannot be identified from this aggregate information.
        `,
        `We own all the intellectual property rights associated with the Website and its contents. No right, title or interest in any downloaded material is transferred to you as a result of any such downloading or copying. The Website is protected by copyright as a collective work and/ or compilation (meaning the collection, arrangement, and assembly) of all the content on this Website, pursuant to applicable law.`,
        `Our logos, product and service marks and/ or names, trademarks, copyrights and other intellectual property, whether registered or not ("OUR IP") are exclusively owned by us. Without our prior written permission, you agree to not display and/ or use Our IP in any manner. Nothing contained in this Website or the content, should be construed as granting, in any way to the User, any license or right or interest whatsoever, in and/ or to Our IP, without our express written permission.`,
      ],
    },
    {
      title: `Cookies`,
      description: [
        `We send cookies to your computer in order to uniquely identify your browser and improve the quality of our service. The term "cookies" refers to small pieces of information that a website sends to your computer's hard drive while you are viewing the site. We may use both session cookies (which expire once you close your browser) and persistent cookies (which stay on your computer until you delete them). Persistent cookies can be removed by following your browser help file directions. If you choose to disable cookies, some areas of Alt-Pi may not work properly or at all. Alt-Pi uses third party tools, who may collect anonymous information about your visits to Alt-Pi using cookies, and interaction with Alt-Pi products and services. Such third parties may also use information about your visits to Alt-Pi products and services and other web sites to target advertisements for Alt-Pi's products and services. No Personal Information is collected or used in this process. These third parties do not know or have access to the name, phone number, address, email address, or any Personal Information about Alt-Pi's Users. Alt-Pi Users can opt-out of sharing this information with third parties by deactivating cookies, the process of which varies from browser to browser. Please refer to the help file of your browser to understand the process of deactivating cookies on your browser.`,
      ],
    },
    {
      title: `Enforcement`,
      description: [
        `We may use the information we collect in connection with your use of Alt-Pi (including your Personal Information) in order to investigate, enforce, and apply our terms and conditions and Privacy Policy.`,
      ],
    },
    {
      title: `Transfer of information`,
      description: [
        `We do not share your Personal Information with any third party apart from financial institutions such as banks, RBI or other regulatory agencies (as may be required) and to provide you with services that we offer through Alt-Pi, conduct quality assurance testing, facilitate creation of accounts, provide technical and customer support, or provide specific services, such as synchronization of your contacts with other software applications, in accordance with your instructions. These third parties are required not to use your Personal Information other than to provide the services requested by you.`,
        `We may share your Personal Information with our parent company, subsidiaries, joint ventures, or other companies under a common control (collectively, the "AFFILIATES") that we may have now or in the future, in which case we will require them to honor this Privacy Policy. If another company acquires our company or our assets, that company will possess your Personal Information, and will assume the rights and obligations with respect to that information as described in this Privacy Policy. We may disclose your Personal Information to third parties in a good faith belief that such disclosure is reasonably necessary to (a) take action regarding suspected illegal activities; (b) enforce or apply our terms and conditions and Privacy Policy; (c) comply with legal process, such as a search warrant, subpoena, statute, or court order; or (d) protect our rights, reputation, and property, or that of our Users, Affiliates, or the public. Please note that we are not required to question or contest the validity of any search warrant, subpoena or other similar governmental requests that we receive.`,
        `We may disclose information in the aggregate to third parties relating to User behavior in connection with actual or prospective business relationship with those third parties, such as advertisers and content distributors. For example, we may disclose the number of Users that have been exposed to, or clicked on, advertising banners.`,
      ],
    },
    {
      title: `Links`,
      description: [
        `References on this Website to any names, marks, products or services of third parties or hyperlinks to third party websites or information are provided solely for your convenience and do not in any way constitute or imply our endorsement, sponsorship or recommendation of the third party, information, product or service. Except as set forth herein, we do not share your Personal Information with those third parties, and are not responsible for their privacy practices. We suggest you read the privacy policies on all such third party websites.`,
      ],
    },
    {
      title: `User access of Personal Information`,
      description: [
        `As a registered Alt-Pi User, you can modify some of your Personal Information and your privacy preferences by accessing the "Account" section of this Website.`,
      ],
    },
    {
      title: `Security`,
      description: [
        `Your account is password protected. We use industry-standard measures to protect the Personal Information that is stored in our database. We limit the access to your Personal Information to those employees and contractors who need access to perform their job functions, such as our customer service personnel. If you have any questions about the security on Alt-Pi, please contact us at contact@alt-pi.com`,
        `You hereby acknowledge that Alt-Pi is not responsible for any intercepted information sent via the internet, and you hereby release us from any and all claims arising out of or related to the use of intercepted information in any unauthorized manner.`,
      ],
    },
    {
      title: `Terms and modifications to this Privacy Policy`,
      description: [
        `Our Privacy Policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically. These changes will be effective immediately on the Users of Alt-Pi. Please note that at all times you are responsible for updating your Personal Information, including providing us with your most current email address.`,
        `If you do not wish to permit changes in our use of your Personal Information, you must notify us promptly that you wish to deactivate your account with us. Continued use of Alt-Pi after any change/ amendment to this Privacy Policy shall indicate your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes.`,
      ],
    },
    {
      title: `Applicable law`,
      description: [
        `Your use of this Website will be governed by and construed in accordance with the laws of India. The Users agree that any legal action or proceedings arising out of your use may be brought exclusively in the competent courts/ tribunals having jurisdiction in Mumbai in India and irrevocably submit themselves to the jurisdiction of such courts/ tribunals.`,
      ],
    },
    {
      title: `Complaints and Grievance Redressal`,
      description: [
        `Any complaints or concerns in relation to your Personal Information or content of this Website or any dispute or breach of confidentiality or any proprietary rights of User during use of the Website or any intellectual property of any User should be immediately informed to the Grievance cum Nodal Officer at the co-ordinates mentioned below in writing or by way of raising a grievance ticket through the email mentioned below: contact@alt-pi.com`,
      ],
    },
  ];
  constructor() { }



}
