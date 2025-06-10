import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';

// Mock atualizado com os enums em português
const MOCKED_PRODUCT_TEMPLATES = {
  '7891000123456': { 
    id: 'tpl_1', 
    name: 'Leite Integral 1L', 
    description: 'Leite UHT integral, fonte de cálcio.',
    type: 'CONSERVA',
    loteType: 'UNIDADE',
    weight: 1.0,
    loteAmount: 1,
    imageUrl: 'https://i.pinimg.com/736x/ec/31/97/ec3197dcbada25f1f371329cf1c8e1a8.jpg' 
  },
};

// Função de busca simulada
const fetchProductTemplateByEan = async (ean) => {
  console.log(`Buscando template para o EAN: ${ean}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCKED_PRODUCT_TEMPLATES[ean] || null);
    }, 500);
  });
};

// Estado inicial completo para o formulário
const INITIAL_PRODUCT_STATE = {
    name: '',
    description: '',
    ean: '',
    imageUrl: '',
    type: '',
    loteType: '',
    weight: '',
    loteAmount: '',
    shelfId: '',
    column: '',
    row: '',
    quantity: '',
    validity: '',
};

export default function RegisterProductScreen() {
  const [eanToSearch, setEanToSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [templateFound, setTemplateFound] = useState(false);
  const [productData, setProductData] = useState(INITIAL_PRODUCT_STATE);
  
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleEanSearch = async (eanValue) => {
    const ean = eanValue || eanToSearch;
    if (!ean) return;

    setLoading(true);
    const template = await fetchProductTemplateByEan(ean);
    
    if (template) {
      setProductData({
        ...INITIAL_PRODUCT_STATE,
        name: template.name,
        description: template.description,
        imageUrl: template.imageUrl,
        ean: ean,
        type: template.type,
        loteType: template.loteType,
        weight: template.weight.toString(),
        loteAmount: template.loteAmount.toString(),
      });
      setTemplateFound(true);
    } else {
      setProductData({ ...INITIAL_PRODUCT_STATE, ean: ean });
      setTemplateFound(false);
      alert('Este é um produto novo! Por favor, preencha os detalhes.');
    }
    setLoading(false);
  };

  const openScanner = async () => {
    const { status } = await requestPermission();
    if (status === 'granted') setScannerVisible(true);
    else alert('A permissão para a câmera é necessária!');
  };

  const handleBarCodeScanned = ({ data }) => {
    setScannerVisible(false);
    setEanToSearch(data);
    handleEanSearch(data);
  };
  
  const handleSave = () => {
    console.log("Dados prontos para salvar:", productData);
    alert('Produto salvo! (Verifique o console)');
  };

  const updateField = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <ScrollView className="flex-1 p-4 bg-background" contentContainerClassName="pb-10">
      <Stack.Screen options={{ title: 'Cadastrar Produto' }} />
      
      <View className="mb-6">
        <Text className="text-lg font-bold text-foreground mb-2">1. Identifique o Produto</Text>
        <View className="flex-row items-center">
          <TextInput placeholder="Digite ou escaneie o EAN" value={eanToSearch} onChangeText={setEanToSearch} keyboardType="numeric" className="flex-1 p-3 bg-input border border-border rounded-l-lg text-primary h-14" />
          <TouchableOpacity onPress={openScanner} className="p-3 bg-gray-500 justify-center border-y border-gray-600 h-14"><FontAwesome name="barcode" size={24} color="white" /></TouchableOpacity>
          <TouchableOpacity onPress={() => handleEanSearch()} className="p-3 bg-primary rounded-r-lg justify-center h-14">{loading ? <ActivityIndicator color="white" /> : <Text className="text-background font-bold">Buscar</Text>}</TouchableOpacity>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-foreground mb-2">2. Detalhes do Produto</Text>
        <View className="p-4 bg-card rounded-lg border border-border gap-y-4">
          <InputRow label="Nome do Produto" placeholder="Ex: Café Gourmet" value={productData.name} onChangeText={(v) => updateField('name', v)} editable={!templateFound} />
          <InputRow label="Descrição" placeholder="Ex: Grãos arábica, torra média..." value={productData.description} onChangeText={(v) => updateField('description', v)} editable={!templateFound} multiline />
          <InputRow label="Tipo de Produto" placeholder="Ex: CONSERVA, LIMPEZA" value={productData.type} onChangeText={(v) => updateField('type', v)} editable={!templateFound} />
          <InputRow label="Tipo de Lote" placeholder="Ex: PACOTE, UNIDADE" value={productData.loteType} onChangeText={(v) => updateField('loteType', v)} editable={!templateFound} />
          <InputRow label="Peso (kg)" placeholder="Ex: 0.25" value={productData.weight} onChangeText={(v) => updateField('weight', v)} editable={!templateFound} keyboardType="numeric" />
          <InputRow label="Itens por Lote" placeholder="Ex: 1" value={productData.loteAmount} onChangeText={(v) => updateField('loteAmount', v)} editable={!templateFound} keyboardType="numeric" />
        </View>
      </View>
    
      <View className="mb-6">
        <Text className="text-lg font-bold text-foreground mb-2">3. Localização e Estoque</Text>
        <View className="p-4 bg-card rounded-lg border border-border gap-y-4">
          <InputRow label="ID da Prateleira" placeholder="Ex: 12" value={productData.shelfId} onChangeText={(v) => updateField('shelfId', v)} keyboardType="numeric" />
          <InputRow label="Coluna" placeholder="Ex: 3" value={productData.column} onChangeText={(v) => updateField('column', v)} keyboardType="numeric" />
          <InputRow label="Linha" placeholder="Ex: 2" value={productData.row} onChangeText={(v) => updateField('row', v)} keyboardType="numeric" />
          <InputRow label="Quantidade Inicial" placeholder="Ex: 85" value={productData.quantity} onChangeText={(v) => updateField('quantity', v)} keyboardType="numeric" />
          
          <View>
              <Text className="text-base text-muted-foreground mb-1">Validade</Text>
              <MaskInput
                  value={productData.validity}
                  onChangeText={(masked) => {
                      updateField('validity', masked);
                  }}
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  placeholder="DD/MM/YYYY"
                  keyboardType="numeric"
                  className="p-3 bg-input border border-border rounded-lg text-foreground"
              />
          </View>

        </View>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-foreground mb-2">4. Mídia</Text>
        <View className="p-4 bg-card rounded-lg border border-border">
          <InputRow label="URL da Imagem" placeholder="https://..." value={productData.imageUrl} onChangeText={(v) => updateField('imageUrl', v)} editable={!templateFound} />
        </View>
      </View>

      <TouchableOpacity onPress={handleSave} className="p-4 bg-primary rounded-lg">
        <Text className="text-background text-center font-bold text-lg">Salvar Produto no Estoque</Text>
      </TouchableOpacity>

      <Modal visible={isScannerVisible} animationType="slide" onRequestClose={() => setScannerVisible(false)}>
        <CameraView style={StyleSheet.absoluteFillObject} onBarcodeScanned={handleBarCodeScanned} barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8'] }} />
        <TouchableOpacity onPress={() => setScannerVisible(false)} className="absolute top-12 left-4 p-2 bg-black/50 rounded-full"><FontAwesome name="close" size={24} color="white" /></TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

// Componente auxiliar para evitar repetição de código no formulário
const InputRow = ({ label, value, onChangeText, placeholder, editable = true, keyboardType = 'default', multiline = false }) => (
  <View>
    <Text className="text-base text-muted-foreground mb-1">{label}</Text>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      keyboardType={keyboardType}
      multiline={multiline}
      className={`p-3 border border-border rounded-lg text-foreground ${editable ? 'bg-input' : 'bg-muted'}`}
    />
  </View>
);