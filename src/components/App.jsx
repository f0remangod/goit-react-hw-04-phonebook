import React from 'react';
import initialValues from '../json/initialValues';
import { Filter } from 'components/PhonebookComponents/Filter/Filter';
import { ContactsList } from 'components/PhonebookComponents/ContactsList/ContactsList';
import { PhonebookForm } from 'components/PhonebookComponents/PhonebookForm/PhonebookForm';
import { Section } from 'components/Section/Section';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || initialValues;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const clearFilterField = () => {
    setFilter('');
  };

  const addContact = contact => {
    setContacts([...contacts, contact]);
  };

  return (
    <>
      <Section title="Add new contact">
        <PhonebookForm
          contacts={contacts}
          addContact={addContact}
        ></PhonebookForm>
      </Section>

      {contacts.length > 0 && (
        <>
          <Section title="Filter contacts">
            <Filter
              onChange={handleFilterChange}
              value={filter}
              onClick={clearFilterField}
            ></Filter>
          </Section>

          <Section title="Saved contacts">
            <ContactsList
              filteredContacts={getFilteredContacts()}
              onDelete={deleteContact}
            ></ContactsList>
          </Section>
        </>
      )}
    </>
  );
};
