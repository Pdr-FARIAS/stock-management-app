import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ProductCard } from '~/components/ui/product-card';

const mockProducts = [
    { id: 1, name: 'Caixa de Leite Integral UHT', type: 'PRESERVE', quantity: 50, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b28b216?w=500' },
    { id: 2, name: 'Saco de Arroz Agulhinha Tipo 1 - 5kg', type: 'GENERAL', quantity: 30, imageUrl: 'https://images.unsplash.com/photo-1586201375822-52c6a74d2e7e?w=500' },
    { id: 3, name: 'Detergente Líquido Limão 500ml', type: 'CLEANING', quantity: 120, imageUrl: 'https://images.unsplash.com/photo-1624371422794-25a85f401d43?w=500' },
];

export default function ProductListScreen() {
    return (
        <View className='flex-1 items-center p-4 bg-background'>
            <Text className='text-2xl font-bold text-foreground mb-6 text-center'>
                Seus Produtos
            </Text>

            <FlatList
                className='w-full max-w-md bg-background'
                data={mockProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                    />
                )}
                ItemSeparatorComponent={() => <View className='h-4' />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}