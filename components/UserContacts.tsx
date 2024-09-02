import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

const UserContacts = ({contacts}) => {

  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  if (permission === null) {
    return <Text>Requesting permission...</Text>;
  }

  if (permission === false) {
    return <Text>Permission denied</Text>;
  }

  return <ContactsManager />;
};

const ContactsManager = () => {
  return (
    <View>
      <Text>Contacts Manager</Text>
    </View>
  );
};

export default UserContacts;   