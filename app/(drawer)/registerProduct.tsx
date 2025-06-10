import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

const MOCKED_PRODUCT_TEMPLATES = {
  '7891000123456': { id: 'tpl_1', name: 'Leite Integral 1L', brand: 'Marca Famosa' },
};

const fetchProductTemplateByEan = async (ean) => {
  console.log(`Buscando template para o EAN: ${ean}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCKED_PRODUCT_TEMPLATES[ean] || null);
    }, 1000);
  });
};

export default function RegisterProductScreen() {
  const [eanToSearch, setEanToSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [templateFound, setTemplateFound] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    ean: '',
    shelf: '',
    stock: '',
  });
  
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleEanSearch = async (eanValue) => {
    const ean = eanValue || eanToSearch;
    if (!ean) return;

    setLoading(true);
    const template = await fetchProductTemplateByEan(ean);
    
    if (template) {
      setProductData({
        name: template.name,
        brand: template.brand,
        ean: ean,
        shelf: '',
        stock: '',
      });
      setTemplateFound(true);
    } else {

      setProductData({
        name: '',
        brand: '',
        ean: ean,
        shelf: '',
        stock: '',
      });
      setTemplateFound(false);
      alert('Este é um produto novo! Por favor, preencha os detalhes.');
    }
    setLoading(false);
  };

  const openScanner = async () => {
    const { status } = await requestPermission();
    if (status === 'granted') {
      setScannerVisible(true);
    } else {
      alert('A permissão para a câmera é necessária!');
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScannerVisible(false);
    setEanToSearch(data);
    handleEanSearch(data);
  };
  
  const handleSave = () => { /* ... sua função ... */ };

  const updateField = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <View className="flex-1 p-4 bg-background">
      <Stack.Screen options={{ title: 'Cadastrar Produto' }} />
      
      <View className="mb-6">
        <Text className="text-lg font-bold text-foreground mb-2">1. Identifique o Produto</Text>
        <View className="flex-row items-center">
          <TextInput
            placeholder="Digite ou escaneie o EAN"
            value={eanToSearch}
            onChangeText={setEanToSearch}
            keyboardType="numeric"
            className="flex-1 p-3 bg-input border border-border rounded-l-lg text-primary h-14"
          />
          <TouchableOpacity onPress={openScanner} className="p-3 bg-gray-500 justify-center border-y border-gray-600 h-14">
             <FontAwesome name="barcode" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEanSearch()} className="p-3 bg-primary rounded-r-lg justify-center h-14">
            {loading ? <ActivityIndicator color="white" /> : <Text className="text-background font-bold">Buscar</Text>}
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-foreground mb-2">2. Detalhes do Produto</Text>
        <View className="p-4 bg-card rounded-lg border border-border">
          <TextInput 
            placeholder="Nome do Produto" 
            value={productData.name} 
            onChangeText={(v) => updateField('name', v)} 
            editable={!templateFound}
            className={`p-3 border border-border rounded-lg text-foreground mb-4 ${!templateFound ? 'bg-input' : 'bg-muted'}`} 
          />
          <TextInput 
            placeholder="Marca" 
            value={productData.brand} 
            onChangeText={(v) => updateField('brand', v)} 
            editable={!templateFound}
            className={`p-3 border border-border rounded-lg text-foreground mb-4 ${!templateFound ? 'bg-input' : 'bg-muted'}`}
          />
           <TextInput 
            placeholder="EAN" 
            value={productData.ean} 
            onChangeText={(v) => updateField('ean', v)} 
            editable={!templateFound}
            keyboardType="numeric"
            className={`p-3 border border-border rounded-lg text-foreground ${!templateFound ? 'bg-input' : 'bg-muted'}`}
          />
        </View>
      </View>
    
      <View className="mb-6">
        <Text className="text-lg font-bold text-foreground mb-2">3. Detalhes do Estoque</Text>
        <View className="p-4 bg-card rounded-lg border border-border">
          <TextInput 
            placeholder="Prateleira (Ex: A1, B2)" 
            value={productData.shelf} 
            onChangeText={(v) => updateField('shelf', v)} 
            className="p-3 bg-input border border-border rounded-lg text-foreground mb-4" 
          />
          <TextInput 
            placeholder="Estoque Inicial" 
            value={productData.stock} 
            onChangeText={(v) => updateField('stock', v)} 
            keyboardType="numeric" 
            className="p-3 bg-input border border-border rounded-lg text-foreground" 
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleSave} className="mt-auto p-4 bg-primary rounded-lg">
        <Text className="text-background text-center font-bold text-lg">Salvar Produto no Estoque</Text>
      </TouchableOpacity>

      <Modal
        visible={isScannerVisible}
        animationType="slide"
        onRequestClose={() => setScannerVisible(false)}
      >
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8'],
          }}
        />
        <TouchableOpacity
          onPress={() => setScannerVisible(false)}
          className="absolute top-12 left-4 p-2 bg-black/50 rounded-full"
        >
          <FontAwesome name="close" size={24} color="white" />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}