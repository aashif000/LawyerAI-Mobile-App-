import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Assuming this is the generative AI service
import { useApiKeyContext } from '../../context/ApiKeyContext'; // API Key context

// Enum for message roles
enum Role {
  User = 'user',
  Assistant = 'assistant',
}

// Interface for messages
interface Message {
  content: string;
  role: Role;
}

const ChatBotPage: React.FC = () => {
  const { apiKey } = useApiKeyContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Function to send user input to the chatbot
  const sendToChatBot = async (inputText: string) => {
    if (!apiKey) {
      alert('API key is missing');
      return;
    }

    const newMessage: Message = {
      content: inputText,
      role: Role.User,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const responsePrompt = `
"You are a laws educator and Legal information provider agent. You help user in learning laws and jurisdiction. Answer Questions anything related Law and Jurisdiction in informative ways with points. Only respond to queries related to legal advice, laws, regulations, or legal matters. If the query is about a specific legal issue, case, or regulation, provide a helpful, informative response. If the query is not related to laws, respond with:
I only answer questions related to legal matters, The user's query is: \"${inputText}\""`;

      const response = await model.generateContent(responsePrompt, {
        temperature: 0.5,
      });

      const aiResponse = response?.response?.text ? await response.response.text() : 'An error occurred';

      const aiMessage: Message = {
        content: aiResponse,
        role: Role.Assistant,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      const aiMessage: Message = {
        content: errorMessage,
        role: Role.Assistant,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Chat Messages Section */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.role === Role.User ? styles.userMessage : styles.aiMessage}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* User Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Ask your question"
          placeholderTextColor="#757575"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            if (userInput.trim()) {
              sendToChatBot(userInput);
              setUserInput(''); // Clear input after sending
            }
          }}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '75%',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 16,
    color: '#212121',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingIndicator: {
    marginTop: 10,
  },
});

export default ChatBotPage;
