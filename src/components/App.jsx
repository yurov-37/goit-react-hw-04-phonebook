import { useState } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorage from '../hooks/useLocalStorage';
import GlobalStyles from './GlobalStyles';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import {
  Phonebook,
  MainTitle,
  ContactTitle,
  TotalContactText,
} from './App.styled';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('Contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const contactFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Phonebook>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={addContact} />
      <ContactTitle>Contacts</ContactTitle>
      {contacts.length > 0 && (
        <>
          <TotalContactText>Total contacts: {contacts.length}</TotalContactText>
          <Filter value={filter} onChange={contactFilter} />
          <ContactList
            contacts={getFilteredContacts()}
            onDeleteContact={deleteContact}
          />
        </>
      )}
      <GlobalStyles />
    </Phonebook>
  );
}
