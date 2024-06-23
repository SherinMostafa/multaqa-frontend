import React, { useState, useEffect } from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';
import axios from 'axios';
import { FcSimCardChip } from 'react-icons/fc';

const Finance = () => {
  const [companyType, setCompanyType] = useState([]);
  const [country, setCountry] = useState('Egypt');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [birthDayDate, setBirthDayDate] = useState('');
  const [website_url, setWebsite_url] = useState('');
  const [bio, setBio] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expireDate: '',
    cvv: '',
  }); // State to manage form data
  const [card, setCard] = useState(null); // State to hold the user's card
  const [userId, setUserId] = useState(null); // State to store the user's ID

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserId(storedUser._id);
      fetchOrganizerData(storedUser._id);
      if (storedUser.bankAccount) {
        fetchCard(storedUser.bankAccount);
      }
    }
  }, []);
  
  const fetchOrganizerData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/organizer/${id}`);
      const data = response.data;
      
      // Update state with fetched data
      console.log('Fetched Organizer Data:', data);
  
      setCompanyType(data.companyType || []);
      setFirstName(data.fname || '');
      setLastName(data.lname || '');
      
      // Convert birthDayDate to 'yyyy-MM-dd' format
      if (data.birthDayDate) {
        const date = new Date(data.birthDayDate);
        const formattedDate = date.toISOString().split('T')[0]; // 'yyyy-MM-dd'
        setBirthDayDate(formattedDate);
      } else {
        setBirthDayDate('');
      }
  
      setWebsite_url(data.website_url || '');
      setAccountNumber(data.accountNumber || '');
      setBio(data.bio || '');
    } catch (error) {
      console.error('Error fetching organizer data:', error.message);
    }
  };  
  
  const fetchCard = async (bankAccount) => {
    try {
      const response = await axios.get(`http://localhost:5000/bankAccount/${bankAccount}`);
      setCard(response.data); // Assuming the response.data is the card object
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };  

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
  
    // For checkboxes (companyType)
    if (type === 'checkbox') {
      const updatedCompanyTypes = [...companyType];
      if (checked) {
        updatedCompanyTypes.push(value);
      } else {
        const index = updatedCompanyTypes.indexOf(value);
        if (index !== -1) {
          updatedCompanyTypes.splice(index, 1);
        }
      }
      setCompanyType(updatedCompanyTypes);
    } else if (id === 'bio') {
      // Directly update bio state
      setBio(value);
    } else {
      // For other inputs (fname, lname, birthDayDate, etc.)
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value,
        }));
      }
  };  

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent form submission

    const organizerData = {
        companyType: companyType,
        fname: fname,
        lname: lname,
        birthDayDate: birthDayDate,
        website_url: website_url,
        bio: bio,
        accountNumber: accountNumber,
    };

    const bankAccountData = {
        cardHolderName: formData.cardHolderName,
        cardNumber: formData.cardNumber,
        expireDate: formData.expireDate,
        cvv: formData.cvv,
        userId: userId,
    };

    try {
        console.log('Organizer Data:', organizerData);
        console.log('User ID:', userId);
        
        // Update organizer data
        const response = await axios.patch(`http://localhost:5000/organizer/${userId}`, organizerData);
        console.log('Updated Organizer Data:', response.data);

        // Add or update bank account data
        if (card) {
            await axios.patch(`http://localhost:5000/bankAccount/${card._id}`, bankAccountData);
            console.log('Updated Bank Account Data:', bankAccountData);
        } else {
            const response = await axios.post('http://localhost:5000/bankAccount', bankAccountData);
            const updatedBankAccountId = response.data._id;
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const updatedUserInfoResponse = await axios.get(`http://localhost:5000/users/email/${storedUser.email}`);
            const updatedUserInfo = updatedUserInfoResponse.data;
            updatedUserInfo.bankAccount = updatedBankAccountId;
            localStorage.setItem('user', JSON.stringify(updatedUserInfo));
            setCard(bankAccountData);
            console.log('Added New Bank Account:', bankAccountData);
        }

        alert('Information Saved');
    } catch (error) {
        console.error('Error updating data:', error.message);
        alert('Error saving information. Please try again later.');
    }
};

  const renderCardDetails = () => {
    if (!card) {
      return <p>You currently don't have any debit or credit cards saved.</p>;
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Card Front */}
          <div className="px-8 py-6 bg-gradient-to-br from-gray-600 to-gray-900 text-white">
            <div className="flex justify-between mb-6">
              <div className="text-xl font-bold">Credit Card</div>
              <FcSimCardChip size={40} className="text-white" />
            </div>
            <div className="text-lg text-gray-200 mb-4 text-center">
              {card.cardNumber}
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="text-sm text-gray-300">Card Holder</div>
                <div className="text-lg font-semibold">{card.cardHolderName}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-300">Expires</div>
                <div className="text-lg font-semibold">{card.expireDate}</div>
              </div>
            </div>
          </div>
          
          {/* Card Back (CVV) */}
          <div className="px-8 py-6 bg-gray-600 text-white">
            <div className="flex justify-end">
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-300">CVV</div>
                <div className="text-lg font-semibold">{card.cvv}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 pl-2 pt-4 lg:p-10 min-h-96">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#6F1A07]">Finance</h1>
        <hr className='my-4 w-full' />

        {/* Select Type Section */}
        <section className="my-8">
          <Input
            id="options"
            label="Select Type"
            type="checkbox"
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            checkboxOptions={[
              { value: 'individual', label: 'Individual' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'non-profit', label: 'Nonprofit' },
            ]}
          />
        </section>

        {/* Form Inputs */}
        <form onSubmit={handleSave}>
          <section className='mb-8'>
            <Input
              id="country"
              label="Country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              selectOptions={[{ value: 'Egypt', label: 'Egypt' }]}
            />
            <Input
              id="fname"
              label="First Name"
              type="text"
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}
              customStyle={'w-full'}
              required={true}
            />
            <Input
              id="lname"
              label="Last Name"
              type="text"
              value={lname}
              onChange={(e) => setLastName(e.target.value)}
              customStyle={'w-full'}
              required={true}
            />
            <Input
              id="birthDayDate"
              label="Birthday"
              type="date"
              value={birthDayDate}
              onChange={(e) => setBirthDayDate(e.target.value)}
              required={true}
            />
            <Input
              id="website_url"
              label="Website"
              type="url"
              value={website_url}
              onChange={(e) => setWebsite_url(e.target.value)}
              required={true}
            />
            <Input
              id="bio"
              textArea={true}
              label="Bio"
              name="bio"
              value={bio} // Corrected to use the bio state
              onChange={handleInputChange}
            />
          </section>

          {/* Bank Account Information Section */}
          <section className="mt-8">
            <h1 className="text-2xl md:text-4xl font-bold pt-6 mb-6 text-[#6F1A07]">Bank Account Information</h1>
            <hr className='my-4 w-full' />

            {/* Render the card details if the user has a card */}
            {card && renderCardDetails()}

            {/* Render the form for adding a new card if no card exists */}
            {!card && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Add New Card</h2>
                <Input
                  id="cardHolderName"
                  type="text"
                  label="Card Holder Name"
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleInputChange}
                  required={true}
                />
                <Input
                  id="accountNumber"
                  type="text"
                  label="Account Number"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required={true}
                />
                <Input
                  id="cardNumber"
                  type="text"
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required={true}
                />
                <Input
                  id="expireDate"
                  type="text"
                  label="Expire Date (MM/YY)"
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleInputChange}
                  required={true}
                />
                <Input
                  id="cvv"
                  type="text"
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
            )}
          </section>

          {/* Save Button */}
          <Button
            form={true}
            type="submit"
            label="Save"
            customStyle="px-8 py-4 text-[18px] font-bold flex justify-center mt-8"
          />
        </form>
      </div>
    </>
  );
};

export default Finance;
