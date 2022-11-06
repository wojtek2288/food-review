import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider } from 'react-native-ui-kitten'
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import * as eva from '@eva-design/eva';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Navigation />
          <StatusBar style='dark' />
        </ApplicationProvider>
      </SafeAreaProvider>
    );
  }
}
