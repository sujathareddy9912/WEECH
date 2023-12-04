import React from 'react'
import { StatusBar } from 'react-native'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DummyPage= () => {
    return (
        <SafeAreaView style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                />
            <Text>Under making...!</Text>
        </SafeAreaView>
    )
}

export default DummyPage
