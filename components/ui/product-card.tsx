import * as React from 'react';
import { View, Text, Image, Pressable, PressableProps } from 'react-native';

// A interface do Produto continua a mesma
interface Product {
    id: number;
    name: string;
    type: string;
    quantity: number;
    imageUrl?: string;
}

// Adicionamos PressableProps para que nosso componente aceite todas as props de um Pressable
interface ProductCardProps extends PressableProps {
    product: Product;
}

export function ProductCard({ product, ...props }: ProductCardProps) {
    return (
        // O Pressable agora não tem flex-row. O layout é vertical por padrão.
        // Removemos a borda e usamos uma sombra mais sutil.
        <Pressable
            {...props} // Passa todas as outras props (como onPress) para o Pressable
            className='
        bg-card rounded-xl shadow-sm overflow-hidden
        active:opacity-80' // Efeito de opacidade ao pressionar
        >
            {/* Imagem no topo do card */}
            <Image
                source={{ uri: product.imageUrl || 'https://via.placeholder.com/300' }}
                className='w-full h-32 bg-muted bg-primary'
            // resizeMode='cover' pode ser uma boa opção aqui
            />

            {/* Container para o texto, com padding interno */}
            <View className='p-4 gap-1'>
                {/* Tipo do produto, como um "tag" ou "badge" sutil */}
                <Text className='text-xs font-semibold uppercase text-primary mb-1'>
                    {product.type}
                </Text>

                {/* Nome do Produto, com mais destaque */}
                <Text className='text-base font-bold text-card-foreground' numberOfLines={2}>
                    {product.name}
                </Text>

                {/* Quantidade, com menos destaque */}
                <Text className='text-sm text-muted-foreground'>
                    {product.quantity} unidades em estoque
                </Text>
            </View>
        </Pressable>
    );
}