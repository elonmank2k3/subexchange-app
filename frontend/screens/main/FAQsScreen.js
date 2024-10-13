import { View, Text, FlatList } from 'react-native'
import React from 'react'

const FAQsScreen = () => {
  const FAQs = [
    { 
      id: 1, 
      question: 'Subscribe, view, like and comment are real?', 
      answer: 'Yes, absolutely real. People from all countries, they are like as you, using app to promote their channel by exchanging subscribe, view, like and comments.' 
    },
    { 
      id: 2, 
      question: 'Can I cash out my coins?', 
      answer: 'No, no way to cash out or convert coins into real money.' 
    },
    { 
      id: 3, 
      question: 'Why did my YouTube Subscribers disappear after few days?', 
      answer: `If your YouTube Subscribers disappear in large numbers this is not because of unsubscribers. The public count may go down but the users are still subscribed to you and will receive notifications when you post new content. What occasionally happens is that if you gain Subscribers too quickly then YouTube's automatic system may flag them as spam.` 
    },
    { 
      id: 4, 
      question: 'An example, I create a video to get 100 subscribers but my channel only increases 80 subscribers. Why?', 
      answer: 'There are 2 main reasons. Firstly, read the answer of above question. Secondly, this is sometimes people subscribed your channel but then they unsubscribed. This problem is common and I am trying to fix these problems.' 
    },
    { 
      id: 5, 
      question: 'Some questions are not in here. Can I ask more question?', 
      answer: 'Yes, feel free to contact us through email subexchange@gmail.com' 
    },
  ]

  return (
    <View className="w-full px-primary items-center flex-1">
      <FlatList 
        data={FAQs}
        keyExtractor={item => item.id.toString()}  
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="flex-row justify-between bg-primary w-full py-[15] mt-[10] rounded-lg px-primary flex-wrap">
            <Text style={{fontSize: 18}} className="font-bold text-white">{item.id}. {item.question}</Text>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 15, textAlign: 'justify', color: 'white'}}>{item.answer}</Text>
            </View>
          </View>
        )}
      />
    </View>
    
  )
}

export default FAQsScreen