import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

const Separator = () => ( <View className="w-full h-px bg-border my-4" /> );
const Badge = ({ children }) => ( <View className="px-2.5 py-0.5 rounded-full border border-border bg-muted/50"><Text className="text-sm font-medium text-muted-foreground">{children}</Text></View> );
const Section = ({ title, children }) => ( <View className="gap-3"><Text className="text-xl font-semibold text-foreground">{title}</Text><View className="gap-1">{children}</View></View> );
const DetailRow = ({ label, value }) => ( <View className="flex-row justify-between items-center py-2 border-b border-border/50"><Text className="text-base text-muted-foreground">{label}</Text><Text className="text-base font-medium text-foreground">{value}</Text></View> );

const MOCKED_INVENTORY_PRODUCTS = [
  {
    id: 101, name: 'Café Gourmet Especial - Grãos 250g', description: 'Uma seleção de grãos arábica de alta altitude, com torra média...', imageUrl: 'https://i.pinimg.com/736x/ec/31/97/ec3197dcbada25f1f371329cf1c8e1a8.jpg',
    shelfId: 12, Shelf: { destination: 'ALIMENTOS SECOS' }, type: 'PRESERVE', loteType: 'PACKAGE', weight: 0.25, loteAmount: 1, quantity: 85, validity: '2026-12-31',
    column: 3, row: 2, createdDate: new Date('2024-10-20T08:00:00Z'), updatedDate: new Date('2025-05-15T11:30:00Z'),
  },
  {
    id: 102, name: 'Azeite Extra Virgem - 500ml', description: 'Azeite de oliva extra virgem, prensado a frio, ideal para saladas e finalizações.', imageUrl: 'https://i.pinimg.com/736x/3c/9a/c2/3c9ac296545a2d6039546291e1a8.jpg',
    shelfId: 15, Shelf: { destination: 'CONDIMENTOS' }, type: 'LIQUID', loteType: 'BOTTLE', weight: 0.5, loteAmount: 1, quantity: 45, validity: '2027-08-10',
    column: 1, row: 4, createdDate: new Date('2024-11-01T09:00:00Z'), updatedDate: new Date('2025-04-20T15:00:00Z'),
  },
];

export default function DynamicProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const foundProduct = MOCKED_INVENTORY_PRODUCTS.find((p) => p.id.toString() === id);
        setProduct(foundProduct);
        setLoading(false);
    }, [id]); 
    if (loading) {
        return <SafeAreaView className="flex-1 justify-center items-center"><ActivityIndicator size="large" /></SafeAreaView>;
    }

    if (!product) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text className="text-lg text-destructive">Produto não encontrado.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Stack.Screen options={{ title: product.name }} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4">
                <View className="bg-card rounded-2xl shadow-lg overflow-hidden">

                    <View className="items-center p-4">
                      <Image
                          source={{ uri: product.imageUrl }}
                          className="w-full h-96 rounded-lg"
                          resizeMode="contain"
                      />
                    </View>

                    <View className="p-5 gap-4">
                        <View className="gap-2">
                            <Text className="text-3xl font-bold text-foreground">{product.name}</Text>
                            <Text className="text-base text-muted-foreground leading-6">{product.description}</Text>
                        </View>

                        <Separator />
                        <Section title="Localização e Estoque">
                            <DetailRow label="Setor (Shelf)" value={product.Shelf.destination} />
                            <DetailRow label="ID da Prateleira" value={product.shelfId} />
                            <DetailRow label="Posição" value={`Coluna ${product.column}, Linha ${product.row}`} />
                            <DetailRow label="Quantidade Atual" value={`${product.quantity} unidades`} />
                            <DetailRow label="Validade" value={new Date(product.validity).toLocaleDateString('pt-BR')} />
                        </Section>
                         <Separator />
                         <Section title="Detalhes Técnicos">
                             <DetailRow label="ID do Produto" value={product.id} />
                             <View className="flex-row justify-between items-center py-2">
                                 <Text className="text-base text-muted-foreground">Tipo de Produto</Text>
                                 <Badge>{product.type}</Badge>
                             </View>
                             <DetailRow label="Tipo de Lote" value={product.loteType} />
                             <DetailRow label="Peso por Pacote" value={`${product.weight} kg`} />
                             <DetailRow label="Itens por Lote" value={product.loteAmount} />
                         </Section>

                         <Separator />
                         <Section title="Dados de Registro">
                             <DetailRow label="Data de Criação" value={product.createdDate.toLocaleString('pt-BR')} />
                             <DetailRow label="Última Atualização" value={product.updatedDate.toLocaleString('pt-BR')} />
                         </Section>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}