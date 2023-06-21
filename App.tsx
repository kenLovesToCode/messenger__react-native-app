import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import Screen from './src/screen';
import { AuthProvider } from './src/shared/auth/context/auth.context';

export default function App(): JSX.Element {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                <SafeAreaProvider style={{ flex: 1 }}>
                    <SafeAreaView style={styles.container}>
                        <PaperProvider>
                            <Screen />
                        </PaperProvider>
                    </SafeAreaView>
                </SafeAreaProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
});
