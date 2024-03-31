import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {ActionCard, ContactList, ElevatedCards, FancyCard, FlatCards} from './components';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <FlatCards />
        <ElevatedCards />
        <FancyCard />
        <ActionCard />
        <ContactList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
