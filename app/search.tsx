import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function Screen() {
    const [progress, setProgress] = React.useState(78);

    function updateProgressValue() {
        setProgress(Math.floor(Math.random() * 100));
    }
    return (
        <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
            <div className='flex-1 justify-center w-100 shadow-2xl' >
                <h1>Search test</h1>
            </div>
        </View>
    );
}