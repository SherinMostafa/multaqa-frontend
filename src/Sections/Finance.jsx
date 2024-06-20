import React, { useState } from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';

const Finance = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [country, setCountry] = useState('Egypt');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [website, setWebsite] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [password, setPassword] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSave = (event) => {
    event.preventDefault(); // Prevent form submission

    const data = {
      selectedOptions,
      country,
      fname,
      lname,
      birthdate,
      website,
      cardNumber,
      cardHolderName,
      password,
      accountNumber,
      cvv,
    };

    console.log('Saved Data:', data);
    alert('Information Saved');
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
                value={selectedOptions}
                onChange={(e) => setSelectedOptions(e.target.value)}
                checkboxOptions={[
                    { value: 'individual', label: 'Individual' },
                    { value: 'company', label: 'Company' },
                    { value: 'nonprofit', label: 'Nonprofit' },
                ]}
            />
        </section>

          {/* Form Inputs */}
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
                id="birthdate"
                label="Birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required={true}
            />
            <Input
                id="website"
                label="Website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required={true}
            />
        </section>

        {/* Bank Account Information Section */}
        <section className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold pt-6 mb-6 text-[#6F1A07]">Bank Account Information</h1>
        <hr className='my-4 w-full' />

        <Input
            id="cardHolderName"
            label="Card Holder Name"
            type="text"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            required={true}
        />
        <Input
            id="cardNumber"
            label="Card Number"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required={true}
        />
        <Input
            id="accountNumber"
            label="Account Number"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required={true}
        />
        <Input
            id="expireDate"
            label="Expiry Date"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
        />
        <Input
            id="cvv"
            label="CVV"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required={true}
        />
        <Button
            form={true}
            type="submit"
            label="Save"
            customStyle="px-8 py-4 text-[18px] font-bold flex justify-center mt-8"
        />
        </section>
      </div>
    </>
  );
};

export default Finance;
