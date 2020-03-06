import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null)
      setContact(current);
    else {
      setContact({
        name: '',
        phone: '',
        email: '',
        type: 'personal'
      })
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'personal'
  });

  const { name, phone, email, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if(current === null)
      addContact(contact);
    else{
      updateContact(contact);
    }
    clearAll();
  }

  const clearAll = () => {
    clearCurrent();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>{current ? 'Edit contact' : 'Add contact'}</h2>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />
        <h5>Contact type</h5>
        <input
          type='radio'
          name='type'
          value='personal'
          onChange={onChange}
          checked={type === 'personal'}
        /> Personal{' '}
        <input
          type='radio'
          name='type'
          value='professional'
          onChange={onChange}
          checked={type === 'professional'}
        /> Professional
        <div>
          <input
            type='submit'
            value={current ? 'Update contact' : 'Add contact'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button
              className='btn btn-light btn-block ' onClick={clearAll}>Clear
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default ContactForm;