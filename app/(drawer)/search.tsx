import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Input } from "~/components/ui/input";
import { CameraView, useCameraPermissions } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";

const MOCKED_PRODUCTS = [
  { id: "101", name: "Produto A", ean: "7891234567890", shelf: "A1" },
  { id: "2", name: "Produto B", ean: "7890987654321", shelf: "B2" },
  { id: "3", name: "Produto C", ean: "7899876543210", shelf: "C3" },
];

export default function SearchScreen() {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = MOCKED_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScannerVisible(false);
    setSearchQuery(data);
    const foundProduct = MOCKED_PRODUCTS.find(
      (product) => product.ean === data
    );
    setFilteredProducts(foundProduct ? [foundProduct] : []);
  };

  const openScanner = async () => {
    const { status } = await requestPermission();
    if (status === "granted") {
      setScannerVisible(true);
    } else {
      alert("A permissão para acessar a câmera é necessária!");
    }
  };

  return (
    <View className="flex-1 p-4 bg-background">
      <View className="flex-row items-center mb-4">
        <Input
          placeholder="Pesquisar por nome ou EAN"
          value={searchQuery}
          onChangeText={handleSearch}
          className="flex-1 mr-2"
        />
        <TouchableOpacity
          onPress={openScanner}
          className="p-3 bg-primary rounded-md"
        >
          <FontAwesome
            name="barcode"
            size={24}
            color={isDarkColorScheme ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/products/${item.id}`)}>
            <View className="p-4 mb-2 bg-card rounded-lg border border-border active:bg-muted">
              <Text className="text-lg font-bold text-card-foreground">
                {item.name}
              </Text>
              <Text className="text-sm text-muted-foreground">
                Prateleira: {item.shelf}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center mt-10">
            <Text className="text-muted-foreground">
              Digite para buscar ou use o scanner.
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Modal
        visible={isScannerVisible}
        animationType="slide"
        onRequestClose={() => setScannerVisible(false)}
      >
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8"],
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
