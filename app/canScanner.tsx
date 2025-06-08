import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from '~/components/ui/button'; // Supondo que você tenha um componente de botão

export default function CanScannerScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);

    // 1. Pedir permissão da câmera ao carregar a tela
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    // 2. Função chamada quando um código é lido com sucesso
    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        setScannedData(data);
        console.log(`Código de barras do tipo ${type} com o dado ${data} foi escaneado!`);
    };

    // 3. Renderização condicional baseada no status da permissão
    if (hasPermission === null) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <Text className="text-lg text-foreground">Solicitando permissão da câmera...</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View className="flex-1 justify-center items-center bg-background p-6">
                <Text className="text-lg text-destructive text-center mb-4">Acesso à câmera negado</Text>
                <Text className="text-base text-muted-foreground text-center mb-6">
                    Você precisa conceder permissão para usar a câmera e escanear códigos de barras.
                </Text>
                {/* Um botão para tentar pedir permissão de novo pode ser adicionado aqui */}
            </View>
        );
    }

    // 4. Se a permissão foi concedida, exibe a câmera
    return (
        <View className="flex-1 flex-col justify-center items-center bg-black">
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject} // Faz a câmera preencher toda a tela
            />

            {/* Overlay com um "alvo" para guiar o usuário */}
            <View className="absolute inset-0 justify-center items-center">
                <View className="w-64 h-64 border-2 border-white/50 rounded-2xl" />
                <Text className="text-white text-lg mt-4 bg-black/50 p-2 rounded-md">
                    Aponte para o código de barras
                </Text>
            </View>

            {/* Overlay que aparece após o escaneamento */}
            {scanned && (
                <View className="absolute bottom-0 w-full bg-card p-6 rounded-t-2xl items-center">
                    <Text className="text-lg text-muted-foreground mb-2">Código escaneado:</Text>
                    <Text className="text-xl font-bold text-foreground mb-6">{scannedData}</Text>
                    <Button size="lg" onPress={() => setScanned(false)}>
                        <Text className="text-primary-foreground text-base">Escanear Novamente</Text>
                    </Button>
                </View>
            )}
        </View>
    );
}