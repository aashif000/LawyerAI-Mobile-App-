import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { PaperProvider, DefaultTheme, Button, Card } from 'react-native-paper';
import { ApiKeyContextProvider } from './context/ApiKeyContext';
import AppNavigation from './src/navigation/AppNavigation'; // Ensure path is correct
import * as Animatable from 'react-native-animatable';

// Custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    accent: '#FFC107',
    background: '#F1F1F1',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#F44336',
    disabled: '#BDBDBD',
    placeholder: '#757575',
  },
};

const { width, height } = Dimensions.get('window');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds for splash screen simulation
  }, []);

  return (
    <ApiKeyContextProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {isLoading ? (
            <View style={styles.splashContainer}>
              <Animatable.View animation="fadeIn" duration={1500} style={styles.animContainer}>
                <Image
                  source={require('./assets/logo.png')} // Replace with your logo path
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.splashText}>Welcome to DrugAI</Text>
                <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />
              </Animatable.View>
            </View>
          ) : (
            <AppNavigation />
          )}
        </NavigationContainer>
      </PaperProvider>
    </ApiKeyContextProvider>
  );
}

function SampleScreen() {
  return (
    <View style={styles.screenContainer}>
      <Card style={styles.card}>
        <Text style={styles.cardText}>Welcome to the App!</Text>
      </Card>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log('Pressed')}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  animContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: theme.colors.accent,
  },
  splashText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  button: {
    marginVertical: 15,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
