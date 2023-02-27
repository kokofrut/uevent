import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import './dashboard.scss'
import Header from '../../common/header/Header'
import Settings from '../../modules/dashboard/settings/settings';
import $api from '../../../api';
import UserTickets from '../../modules/dashboard/userTickets/userTickets';
import CompaniesUser from '../../modules/dashboard/companies/companiesUser'



const DashboardPage = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [userTickets, setUserTickets] = useState([])
  const [currentCompany, setCurrentCompany] = useState(null);
  const navigate = useNavigate();
  const [userCompanies, setUserCompanies] = useState([])
  const user = useSelector(state => state.user.user)
  const handleLogout = () => {
    // Log the user out
    axios.post('/api/logout').then(() => {
      setLoggedIn(false);
    });
  };
  // set logged in after fetch in new useEffect to check auth
  const handleNewCompany = () => {
    // Create a new company
    axios.post('$api/api/companies', { name: 'New Company', owner: `${user.id}` }).then((response) => {
      setCurrentCompany(response.data);
    });
  };
  useEffect(() => {
    async function fetchTickets() {
      let url = `/user/${user.id}/tickets`
      try {
        await $api.get(url).then((response) => response.json()).then((data) => setUserTickets(data))
      }
      catch (error) {
        console.error(error)
      }
    }
    // fetchTickets()
    setUserCompanies([
      {
        id: 1,
        name: 'New Company',
        email: 'newcompany@example.com',
        owner: 1,
        location: 'Donetsk, Shevchenko 22'
      },
      {
        id: 2,
        name: 'Big D',
        email: 'newcompany2@example.com',
        owner: 1,
        location: 'Donetsk, prosp.May 22'
      },
      {
        id: 3,
        name: 'Test3',
        email: 'newcompany3@example.com',
        owner: 1,
        location: 'Donetsk, Tolstogo 32'
      },
    ])
    setUserTickets([
      {
          id:1,
          title: "Gathering in our new BIG BUILDING",
          content: "Only for soldiers because they are so 'cool'",
          date: new Date('2015-06-12T13:50:12Z'),
          organizer: "Big D Company",
          location: "Donetsk",
          ticketPrice: 300,
          ticketAmount: 123,
          theme: 'buisness',
          format: 'meeting',
      },
      {
          id:2,
          title: "Celebrate with us",
          content: "Only for soldiers because they are so 'cool'",
          date: new Date('2015-05-12T13:50:12Z'),
          organizer: "Big D Company",
          location: "Donetsk",
          ticketPrice: 200,
          ticketAmount: 23,
          theme: 'politics',
          format: 'meeting',
      },
      {
          id:3,
          title: "Test test programming",
          content: "php is shit'",
          date: new Date(2015, 5, 12),
          organizer: "pHuy",
          location: "Donetsk",
          ticketPrice: 1000,
          ticketAmount: 123,
          theme: 'programming',
          format: 'meeting',
      },
      {
          id:4,
          title: "new ==== vebinar",
          content: "Buisness idea'",
          date: new Date(2015, 5, 12),
          organizer: "Damn",
          location: "Donetsk",
          ticketPrice: 99,
          ticketAmount: 20,
          theme: 'buisness',
          format: 'vebinar',
      },
      {
        id:5,
        title: "just to make sure it's 5th",
        content: "kok",
        date: new Date(2011, 3, 12),
        organizer: "Me",
        location: "Donetsk",
        ticketPrice: 19,
        ticketAmount: 10,
        theme: 'test',
        format: 'online',
      },
      ])
  }, [])

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className='wrapper'>
      {loggedIn ? (
        <>
          <Header />
          <div className='second-wrapper'>
            <h1>Welcome to your dashboard</h1>
            <Settings userData={user} />
            <div className='blank h-100'></div>
            <UserTickets userTickets={userTickets} />
            <div className='blank h-100'></div>
            <CompaniesUser companies={userCompanies} />

            {currentCompany ? (
              <p>Current company: {currentCompany.name}</p>
            ) : (
              <p>No current company selected</p>
            )}
          </div>
        </>
      ) : (
        <p>Please log in to view your dashboard</p>
      )}
    </div>
  );
};

export default DashboardPage;