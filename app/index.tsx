import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
export default function Screen() {
  return (
    <View className="flex-1 justify-center bg-background items-center">

      <View className="text-center rounded-sm">
        <Text className="mb-2 text-4xl text-foreground text-foreground text-center ">
          Bem vindo!
        </Text>
        <Text className="mb-2 text-2xl text-foreground text-center">
          Busque pelo produto:
        </Text>
        <Button className="w-full, bg-primary" variant="default" size="lg">
          <Text className="text-primary-foreground text-base font-medium">Pesquisar</Text>
        </Button>
      </View>

    </View>
  );
};