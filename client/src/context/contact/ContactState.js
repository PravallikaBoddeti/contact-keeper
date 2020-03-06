import React, { useReducer } from 'react';
import * as uuid from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER } from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Prav',
        phone: '1234567890',
        email: 'prav@gmail.com',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Pravi',
        phone: '0123456789',
        email: 'pravi@gmail.com',
        type: 'professional'
      },
      {
        id: 3,
        name: 'Prava',
        phone: '1023456789',
        email: 'prava@gmail.com',
        type: 'personal'
      }
    ],
    current: null,
    filtered: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  }

  // delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  }

  // set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  }

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  }

  // update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  }
  // filter contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  }

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER});
  }

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,

        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </contactContext.Provider>
  )

}

export default ContactState;