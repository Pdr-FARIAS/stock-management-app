import * as React from 'react';
import { ScrollView, View, Text, Image, SafeAreaView } from 'react-native';

const Separator = () => (
    <View className="w-full h-px bg-border my-4" />
);

const Badge = ({ children }: { children: React.ReactNode }) => (
    <View className="px-2.5 py-0.5 rounded-full border border-border bg-muted/50">
        <Text className="text-sm font-medium text-muted-foreground">{children}</Text>
    </View>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="gap-3">
        <Text className="text-xl font-semibold text-foreground">{title}</Text>
        <View className="gap-1">{children}</View>
    </View>
);

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <View className="flex-row justify-between items-center py-2 border-b border-border/50">
        <Text className="text-base text-muted-foreground">{label}</Text>
        <Text className="text-base font-medium text-foreground">{value}</Text>
    </View>
);

const singleProductMock = {
    id: 101,
    name: 'Café Gourmet Especial - Grãos 250g',
    description: 'Uma seleção de grãos arábica de alta altitude, com torra média, resultando em uma bebida de corpo aveludado, com notas de chocolate e caramelo.',
    imageUrl: 'https://images.unsplash.com/photo-1511920183353-3c9c9b0a1d4c?w=500',
    shelfId: 12,
    Shelf: { destination: 'ALIMENTOS SECOS' },
    type: 'PRESERVE',
    loteType: 'PACKAGE',
    weight: 0.25,
    loteAmount: 1,
    quantity: 85,
    validity: '2026-12-31',
    column: 3,
    row: 2,
    createdDate: new Date('2024-10-20T08:00:00Z'),
    updatedDate: new Date('2025-05-15T11:30:00Z'),
};


export default function ProductSingleScreen() {
    const product = singleProductMock;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="p-4">
                <View className="bg-card rounded-2xl shadow-lg overflow-hidden">

                    <Image
                        source={{ uri: product.imageUrl }}
                        className="w-full h-64"
                    />

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
