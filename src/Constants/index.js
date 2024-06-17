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

import { FaMusic, FaPaintRoller, FaSpa } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import Settings from "../Pages/Settings";
import Information from "../Sections/Information";
import Email from "../Sections/Email";
import Password from "../Sections/Password";
import Delete from "../Sections/Delete";
import Account from "../Pages/Account";
import Ticket from "../Pages/Ticket";
import Checkout from "../Pages/Checkout";

export const navLinks = [
  { href: "/", label: "Home", page: <Home /> },
  { href: "/Events", label: "Browse events", page: <Events /> },
  { href: "/Create", label: "Create an event", page: <Create /> },
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
  { id: 3, href: '/Password', label: 'Change Password', content: <Password /> },
  { id: 4, href: '/Delete', label: 'Close Account', content: <Delete /> },
  // { id: 4, label: 'Credit/Debit Cards', content: <CreditCards />, href: '/credit-cards' },
];

export const landingImages = [
  '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
  '/Images/charlesdeluvio-wn7dOzUh3Rs-unsplash.jpg',
];

export const events = [
  {
    id: 1,
    title: 'Event 1',
    description: 'Description of Event 1',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 4,
    save: false,
    category: 'Music',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description of Event 2',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 2,
    save: false,
    category: 'Music',
  },
  {
    id: 3,
    title: 'Event 3',
    description: 'Description of Event 3',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 5,
    save: false,
    category: 'Celebration',
  },
  {
    id: 4,
    title: 'Event 4',
    description: 'Description of Event 4',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 4,
    save: false,
    category: 'Celebration',
  },
  {
    id: 5,
    title: 'Event 5',
    description: 'Description of Event 5',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 1,
    save: false,
    category: 'Music',
  },
  {
    id: 6,
    title: 'Event 6',
    description: 'Description of Event 6',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 1,
    save: false,
    category: 'Paint',
  },
  {
    id: 7,
    title: 'Event 7',
    description: 'Description of Event 7',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 1,
    save: false,
    category: 'Music',
  },
  {
    id: 8,
    title: 'Event 8',
    description: 'Description of Event 8',
    imageURL: '/Images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg',
    date: '25 oct, 2021',
    price: 'EGP 200.00',
    rating: 1,
    save: false,
    category: 'Spa',
  },
  // Add more events as needed
  ];

  export const categories = [
    { label: 'All Categories', value: '' },
    { label: 'Music', value: 'Music', icon: <FaMusic /> },
    { label: 'Paint', value: 'Paint', icon: <FaPaintRoller /> },
    { label: 'Spa', value: 'Spa', icon: <FaSpa /> },
    { label: 'Celebration', value: 'Celebration', icon: <MdCelebration /> },
  ];