import Home from "../Pages/Home";
import Create from "../Pages/Create";
import Events from "../Pages/Events";
import Help from "../Pages/Help";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Event from "../Pages/Event";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Welcome from "../Pages/Welcome";
import Settings from "../Pages/Settings";
import Information from "../Sections/Information";
import Email from "../Sections/Email";
import Password from "../Sections/Password";
import Delete from "../Sections/Delete";
import Account from "../Pages/Account";
import Ticket from "../Pages/Ticket";
import Checkout from "../Pages/Checkout";
import Likes from "../Pages/Likes";
import Bank from "../Sections/Bank";
import Confirmation from "../Pages/Confirmation";
import Main from "../Sections/Main";
import Plans from "../Sections/Plans";
import Finance from "../Sections/Finance";
import Organizer from "../Pages/Organizer";
import Dashboard from "../Admin/Dashboard";
import Gateway from "../Admin/Gateway";
import Reports from "../Admin/Sections/Reports";
import Contacts from "../Admin/Sections/Contacts";
import Requests from "../Admin/Sections/Requests";
import Company from "../Admin/Sections/Company";

export const navLinks = [
  { href: "/", label: "Home", page: <Home /> },
  { href: "/Events", label: "Browse events", page: <Events /> },
  { href: "/Create", label: "Create an event", page: <Create /> },
  { href: "/Likes", label: "Likes", page: <Likes /> },
  { href: "/About", label: "About us", page: <About /> },
  { href: "/Help", label: "Help center", page: <Help /> },
  { href: "/Contact", label: "Contact us", page: <Contact /> },
  { href: "/Register", label: "Register", page: <Register /> },
  { href: "/Login", label: "Login", page: <Login /> },
  { href: "/Event", label: "Create an event", page: <Event /> },
  { href: "/Welcome", label: "Welcome", page: <Welcome /> },
  { href: "/Account", label: "Account", page: <Account /> },
  { href: "/Settings", label: "Settings", page: <Settings /> },
  { href: "/Ticket", label: "Ticket", page: <Ticket /> },
  { href: "/Checkout", label: "Checkout", page: <Checkout /> },
  { href: "/Bank", label: "Bank", page: <Bank /> },
  { href: "/Confirmation", label: "Confirmation", page: <Confirmation /> },
  { href: "/Organizer", label: "Organizer", page: <Organizer /> },
  { href: "/Dashboard", label: "Dashboard", page: <Dashboard /> },
  { href: "/Admin", label: "Admin", page: <Gateway /> },
];

export const eventSettings = [
  { id: 1, href: '/Home', label: 'Home', content: <Main /> },
  { id: 2, href: '/Plans', label: 'Plans', content: <Plans /> },
  { id: 3, href: '/Finance', label: 'Finance', content: <Finance /> },
];

export const accountSettings = [
  { id: 1, href: '/Information', label: 'Account Information', content: <Information /> },
  { id: 2, href: '/Email', label: 'Change Email', content: <Email /> },
  { id: 3, href: '/Bank-Cards', label: 'Credit/Debit Cards', content: <Bank />, },
  { id: 4, href: '/Password', label: 'Change Password', content: <Password /> },
  { id: 5, href: '/Delete', label: 'Close Account', content: <Delete /> },
];

export const adminDashboards = [
  { id: 1, href: '/Reports', label: 'Reports', content: <Reports /> },
  { id: 2, href: '/Contacts', label: 'Contacts', content: <Contacts /> },
  { id: 3, href: '/Requests', label: 'Requests', content: <Requests /> },
  { id: 4, href: '/Company', label: 'Company', content: <Company /> },
];

export const landingImages = [
  '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
  '/Images/claudio-schwarz-_wDZkpybAfY-unsplash.jpg',
  '/Images/charlesdeluvio-wn7dOzUh3Rs-unsplash.jpg',
  '/Images/jakob-dalbjorn-cuKJre3nyYc-unsplash.jpg',
];

export const FAQs = [
  { question: 'What is Multaqa?', answer: 'Multaqa is an innovative event management platform that centralizes all types of events in one accessible place. It helps users discover, plan, and attend events tailored to their interests, while providing event organizers with effective tools for seamless management and promotion.' },
  { question: 'How does Multaqa work?', answer: 'Multaqa aggregates event listings from various sources and categorizes them by type, such as science, art, health, entertainment, bazaars, and charity. Users can search for and find events that match their preferences, purchase tickets, and receive updates. Event organizers can create, manage, and promote their events through the platform.' },
  { question: 'What types of events can I find on Multaqa?', answer: 'Multaqa supports a wide range of events, including scientific conferences, art exhibitions, health seminars, entertainment shows, bazaars, charity events, and more.' },
  { question: 'How can I search for events on Multaqa?', answer: 'You can search for events using keywords, categories, locations, or dates through the platform’s intuitive search functionality. Filters and recommendations help refine your search results.' },
  { question: 'How do I purchase tickets for an event?', answer: 'Once you find an event you’re interested in, you can purchase tickets directly through the Multaqa platform using secure payment methods. You will receive a confirmation and your tickets via email.' },
  { question: 'Is there a refund or exchange policy for tickets?', answer: 'Yes, Multaqa offers a flexible refund and exchange policy. Details of the policy are available on the event page and during the ticket purchasing process.' },
  { question: 'How can I stay updated on events I’m interested in?', answer: 'You can subscribe to notifications and updates for specific events or categories. Multaqa will send you reminders and updates via email or through the app.' },
  { question: 'How do I create an event on Multaqa?', answer: 'To create an event, sign up as an organizer on Multaqa, then use the event creation tools to input details such as the event description, date, location, ticket prices, and promotional materials.' },
  { question: 'What tools does Multaqa provide for event management?', answer: 'Multaqa offers a comprehensive suite of tools for event management, including ticket sales tracking, attendee management, promotional features, and analytics to monitor event performance.' },
  { question: 'How can Multaqa help me promote my event?', answer: 'Multaqa helps promote your event through targeted marketing, recommendations to users based on their preferences, social media integration, and email campaigns.' },
  { question: 'How does Multaqa ensure the authenticity of events?', answer: 'Multaqa verifies events through a thorough vetting process for organizers, ensuring that only legitimate and authorized events are listed on the platform.' },
  { question: 'Is my personal information safe with Multaqa?', answer: 'Yes, Multaqa uses advanced security measures to protect your personal information and payment details. We comply with data protection regulations to ensure your privacy.' },
  { question: 'How can I contact Multaqa support?', answer: `You can contact Multaqa support through our website's help center, via email, or through our customer service hotline. We are available to assist you with any questions or issues.` },
  { question: 'What makes Multaqa different from other event management platforms?', answer: `Multaqa stands out due to its comprehensive approach, offering a diverse range of events, flexible ticket policies, inclusive audience targeting, advanced event management tools, and a strong commitment to customer satisfaction.` },
  { question: 'What if I don’t receive my tickets?', answer: `If you do not receive your tickets by three business days prior to an event, call Multaqa Customer Service Department immediately. Be prepared with the order number for your account, or the purchasing credit card.` },
];