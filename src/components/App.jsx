import React from 'react';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import css from './ContactForm/ContactForm.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contactList'));
    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('contactList', JSON.stringify(this.state.contacts));
  }

  handleRemoveContact = evt => {
    this.setState(prevSt => ({
      contacts: prevSt.contacts.filter(contact => evt.target.id !== contact.id),
    }));
  };

  handleInputChange = evt => {
    const { name } = evt.target;
    this.setState({ [name]: evt.target.value });
  };

  handleAddContact = (name, number) => {
    this.setState(prevSt => {
      if (prevSt.contacts.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts`);
        return;
      } else {
        return {
          contacts: [...prevSt.contacts, { name, number, id: nanoid() }],
        };
      }
    });
  };
  render() {
    return (
      <div className={css.container}>
        <h1 className={css.mainTitle}>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <Filter
          filter={this.state.filter}
          onInputChange={this.handleInputChange}
        />
        <h2>Contacts</h2>
        <ContactList onRemove={this.handleRemoveContact} state={this.state} />
      </div>
    );
  }
}
