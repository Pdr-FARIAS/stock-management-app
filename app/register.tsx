import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useState } from 'react';

export default function Screen() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View className="flex-1 justify-center bg-background items-center">
            <View className="w-11/12 md:w-1/2 max-w-md min-h-[550px] bg-card rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center">       <Text className="text-3xl font-bold mb-10 text-foreground">
                Cadastro
            </Text>

                <View className="w-full mb-4">
                    <Label nativeID="nameLabel" className="text-base text-foreground mb-1 self-start">
                        Nome
                    </Label>
                    <Input
                        placeholder="Nome de Usuário"
                        aria-labelledby="nameLabel"
                        value={name}
                        onChangeText={setName}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        className="text-foreground placeholder:text-muted-foreground"
                    />
                </View>

                <View className="w-full mb-4">
                    <Label nativeID="emailLabel" className="text-base text-foreground mb-1 self-start">
                        Email
                    </Label>
                    <Input
                        placeholder="seuemail@example.com"
                        aria-labelledby="emailLabel"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        className="text-foreground placeholder:text-muted-foreground"
                    />
                </View>

                <View className="w-full mb-8">
                    <Label nativeID="passwordLabel" className="text-base text-foreground mb-1 self-start">
                        Senha
                    </Label>
                    <Input
                        placeholder="********"
                        aria-labelledby="passwordLabel"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="text-foreground placeholder:text-muted-foreground"
                    />
                </View>

                <Button className="w-full" variant="default" size="lg">
                    <Text className="text-primary-foreground text-base font-medium">Cadastrar</Text>
                </Button>
            </View>
        </View>
    );
}