import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_APP_URL;

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    SplashScreen.hideAsync();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (showSplash) {
      return (
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
          <StatusBar style="light" translucent={false} />
          <Image source={require('./assets/splash-icon.png')} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      );
    }

    if (showLogin) {
      return (
        <SafeAreaView style={styles.webviewContainer} edges={['top', 'bottom']}>
          <StatusBar style="dark" translucent={true} />
          <WebView
            source={{ uri: WEB_APP_URL }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            bounces={false}
            scrollEnabled={true}
            backgroundColor="#FFFFF5"
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView HTTP error: ', nativeEvent);
            }}
          />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.webviewContainer} edges={['bottom']}>
        <StatusBar style="dark" translucent={true} />
        <WebView
          source={{ uri: `${WEB_APP_URL}/home` }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          bounces={false}
          scrollEnabled={true}
          backgroundColor="#FFFFF5"
          contentInsetAdjustmentBehavior="automatic"
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView HTTP error: ', nativeEvent);
          }}
        />
      </SafeAreaView>
    );
  };

  return <SafeAreaProvider>{renderContent()}</SafeAreaProvider>;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#FFFFF5',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
