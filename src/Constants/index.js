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
import Interests from "../Pages/Interests";
import Settings from "../Pages/Settings";
import Information from "../Sections/Information";
import Email from "../Sections/Email";
import Password from "../Sections/Password";
import Delete from "../Sections/Delete";
import Account from "../Pages/Account";
import Ticket from "../Pages/Ticket";
import Checkout from "../Pages/Checkout";
import Likes from "../Pages/Likes";
import Preview from "../Pages/Preview";
import Bank from "../Sections/Bank";

export const navLinks = [
  { href: "/", label: "Home", page: <Home /> },
  { href: "/Events", label: "Browse events", page: <Events /> },
  { href: "/Create", label: "Create an event", page: <Create /> },
  { href: "/Likes", label: "Likes", page: <Likes /> },
  { href: "/Help", label: "Help center", page: <Help /> },
  { href: "/Contact", label: "Contact us", page: <Contact /> },
  { href: "/Register", label: "Register", page: <Register /> },
  { href: "/Login", label: "Login", page: <Login /> },
  { href: "/Event", label: "Create an event", page: <Event /> },
  { href: "/About", label: "About us", page: <About /> },
  { href: "/Welcome", label: "Welcome", page: <Welcome /> },
  { href: "/Interests", label: "Interests", page: <Interests /> },
  { href: "/Account", label: "Account", page: <Account /> },
  { href: "/Information", label: "/Information", page: <Information /> },
  { href: "/Email", label: "Email", page: <Email /> },
  { href: "/Password", label: "Password", page: <Password /> },
  { href: "/Delete", label: "Close Account", page: <Delete /> },
  { href: "/Settings", label: "Settings", page: <Settings /> },
  { href: "/Ticket", label: "Ticket", page: <Ticket /> },
  { href: "/Checkout", label: "Checkout", page: <Checkout /> },
  { href: "/Preview", label: "Preview", page: <Preview /> },
  { href: "/Bank-Cards", label: "Bank", page: <Bank /> },
];

// export const eventSettings = [
//   { id: 1, href: '/Create', label: 'Create an event', content: <Create /> },
//   // { id: 2, href: '/Email', label: 'Change Email', content: <Email /> },
//   // { id: 3, href: '/Password', label: 'Change Password', content: <Password /> },
//   // { id: 4, href: '/Delete', label: 'Close Account', content: <Delete /> },
//   // { id: 4, label: 'Credit/Debit Cards', content: <CreditCards />, href: '/credit-cards' },
// ];

export const accountSettings = [
  { id: 1, href: '/Information', label: 'Account Information', content: <Information /> },
  { id: 2, href: '/Email', label: 'Change Email', content: <Email /> },
  { id: 3, href: '/Bank-Cards', label: 'Credit/Debit Cards', content: <Bank />, },
  { id: 4, href: '/Password', label: 'Change Password', content: <Password /> },
  { id: 5, href: '/Delete', label: 'Close Account', content: <Delete /> },
];

export const landingImages = [
  '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
  '/Images/charlesdeluvio-wn7dOzUh3Rs-unsplash.jpg',
];