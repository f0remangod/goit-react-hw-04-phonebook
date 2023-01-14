import React from 'react';
import initialValues from '../json/initialValues';
import { Filter } from 'components/PhonebookComponents/Filter/Filter';
import { ContactsList } from 'components/PhonebookComponents/ContactsList/ContactsList';
import { PhonebookForm } from 'components/PhonebookComponents/PhonebookForm/PhonebookForm';
import { Section } from 'components/Section/Section';

export class App extends React.Component {
  state = {
    contacts: initialValues,
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  handleFilterChange = event => {
    const { value } = event.currentTarget;
    this.setState({
      filter: value,
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  clearFilterField = () => {
    this.setState({ filter: '' });
  };

  addContact = contact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <Section title="Add new contact">
          <PhonebookForm
            contacts={contacts}
            addContact={this.addContact}
          ></PhonebookForm>
        </Section>

        {contacts.length > 0 && (
          <>
            <Section title="Filter contacts">
              <Filter
                onChange={this.handleFilterChange}
                value={filter}
                onClick={this.clearFilterField}
              ></Filter>
            </Section>

            <Section title="Saved contacts">
              <ContactsList
                filteredContacts={this.getFilteredContacts()}
                onDelete={this.deleteContact}
              ></ContactsList>
            </Section>
          </>
        )}
      </>
    );
  }
}
