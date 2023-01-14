import PropTypes from 'prop-types';
import { Name, Item, Btn } from './ContactsItem.styled';

export const ContactsItem = ({ contact, onDelete }) => {
  const { id, name, number } = contact;
  return (
    <>
      <Item>
        <Name>{name}</Name>
        <span>{number}</span>
        <Btn type="button" onClick={() => onDelete(id)}>
          X
        </Btn>
      </Item>
    </>
  );
};

ContactsItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func,
};
