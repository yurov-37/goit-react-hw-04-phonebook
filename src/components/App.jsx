import React, { Component } from 'react';
import { nanoid } from 'nanoid';
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

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = localStorage.getItem('Contacts');
    const parsedStorageContacts = JSON.parse(storageContacts);

    if (parsedStorageContacts) {
      this.setState({ contacts: parsedStorageContacts });
    }
  }

  componentDidUpdate(prevProps, ptrevState) {
    console.log('Обновились контакты, записываю их в хранилище!!!');
    if (this.state.contacts !== ptrevState.contacts) {
      console.log('Обновилось поле контакты');
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  contactFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <Phonebook>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onSubmit={this.addContact} />
        <ContactTitle>Contacts</ContactTitle>
        {contacts.length > 0 && (
          <>
            <TotalContactText>
              Total contacts: {contacts.length}
            </TotalContactText>
            <Filter value={filter} onChange={this.contactFilter} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        )}
        <GlobalStyles />
      </Phonebook>
    );
  }
}
