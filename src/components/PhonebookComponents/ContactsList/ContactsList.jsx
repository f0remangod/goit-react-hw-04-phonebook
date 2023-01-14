import PropTypes from 'prop-types';
import { ContactsItem } from 'components/PhonebookComponents/ContactsItem/ContactsItem';
import { List } from './ContactsList.styled';

export const ContactsList = ({ filteredContacts, onDelete }) => {
  return (
    <List>
      {filteredContacts.map(contact => {
        return (
          <ContactsItem
            key={contact.id}
            contact={contact}
            onDelete={onDelete}
          ></ContactsItem>
        );
      })}
    </List>
  );
};

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func,
};
