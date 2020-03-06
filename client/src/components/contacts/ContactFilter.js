import React, { useContext, useEffect, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');

  const {filterContacts, clearFilter, filtered} = contactContext;

  // test
  // one more test
  useEffect(() => {
    if(filtered === null)
      text.current.value = '';
  })
  
  const onChange = (e) => {
    if(text.current.value !== '')
      filterContacts(e.target.value);
    else  
      clearFilter();
  }

  return (
    <form>
      <input 
        ref={text} 
        type='text' 
        placeholder='Filter Contacts.. ' 
        onChange={onchange} 
      />
    </form>

  )
}

export default ContactFilter;