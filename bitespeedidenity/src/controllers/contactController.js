const { Op } = require('sequelize');
const db = require('../models');
const Contact = db.Contact;

exports.identifyContact = async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    const existingContacts = await Contact.findAll({
      where: {
        [Op.or]: [
          { email },
          { phoneNumber }
        ]
      }
    });

    if (existingContacts.length === 0) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: 'primary'
      });
      return res.status(201).json({ contact: formatResponse(newContact, []) });
    }

    let primaryContact = existingContacts.find(contact => contact.linkPrecedence === 'primary');

    if (!primaryContact) {
      primaryContact = existingContacts[0];
      primaryContact.linkPrecedence = 'primary';
      await primaryContact.save();
    }

    const secondaryContacts = existingContacts.filter(contact => contact.id !== primaryContact.id);

    if (secondaryContacts.length === 0) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary'
      });
      secondaryContacts.push(newContact);
    }

    return res.status(200).json({ contact: formatResponse(primaryContact, secondaryContacts) });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const formatResponse = (primaryContact, secondaryContacts) => {
  const temp = [primaryContact.email, ...secondaryContacts.map(contact => contact.email)].filter(Boolean);
  const emails = [...new Set(temp)];
  const temp2 = [primaryContact.phoneNumber, ...secondaryContacts.map(contact => contact.phoneNumber)].filter(Boolean);
  const phoneNumbers =  [...new Set(temp2)];
  const secondaryContactIds = secondaryContacts.map(contact => contact.id);

  return {
    primaryContactId: primaryContact.id,
    emails,
    phoneNumbers,
    secondaryContactIds
  };
};
