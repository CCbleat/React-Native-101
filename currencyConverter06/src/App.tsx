import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';

// Self-defined Constants
import {currencyByRupee} from './constants';
// Self-defined components
import CurrencyButton from './components/CurrencyButton';

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [resultValue, setResultValue] = React.useState<string>('');
  const [targetCurrency, setTargetCurrency] = React.useState<string>('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      Snackbar.show({
        text: 'Please enter a value',
        backgroundColor: '#EA7773',
        textColor: '#000000',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode="always" // iOS only
              onChangeText={setInputValue}
              placeholder="Enter amount in Rupees"
            />
          </View>
          {resultValue && <Text style={styles.resultText}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                onPress={() => buttonPressed(item)}
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  topContainer: {
    marginBottom: 20,
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rupee: {
    fontSize: 24,
    marginRight: 10,
  },
  resultText: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#27ae60',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '30%',
    aspectRatio: 1,
    marginVertical: 10,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#2980b9',
  },
});

export default App;
