import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('where') || lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('office')) {
      return "Lifewood is a global company with headquarters in Hong Kong. We have major operations and offices in the Philippines, Malaysia, and Indonesia to support our global clients.";
    }
    
    if (lowerInput.includes('what is lifewood') || lowerInput.includes('about lifewood') || lowerInput.includes('who are you') || lowerInput.includes('company')) {
      return "Lifewood is a leading provider of AI-powered data solutions. We specialize in data collection, annotation, and machine learning enablement, empowering AI with human intelligence across various industries.";
    }

    if (lowerInput.includes('service') || lowerInput.includes('offer') || lowerInput.includes('do you do') || lowerInput.includes('product')) {
      return "We offer comprehensive AI data services including:\n• AI Data Extraction\n• Machine Learning Enablement\n• Autonomous Driving Data Annotation\n• AI Customer Service\n• NLP & Speech Data Collection\n• Computer Vision\n• Genealogy Data Services";
    }

    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('reach')) {
      return "You can get in touch with us through the 'Contact Us' button on our homepage. You can also follow and message us on our social media channels: LinkedIn, Facebook, and Instagram.";
    }

    if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('hiring') || lowerInput.includes('work')) {
      return "We are frequently hiring for various roles across our global offices. Please check the 'Careers' section on our website or visit our LinkedIn page for the latest job openings.";
    }

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! How can I assist you with Lifewood today?";
    }

    return "I'm not sure I understand. I can answer questions about Lifewood's location, services, careers, or general company information. How can I help?";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-8 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-[#133020]/10 overflow-hidden flex flex-col max-h-[500px]"
        >
          {/* Header */}
          <div className="bg-[#133020] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFB347] flex items-center justify-center text-[#133020]">
                <MessageSquare size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Lifewood Support</h3>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#F9F7F7] min-h-[300px]">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                      ${msg.sender === 'user' 
                        ? 'bg-[#133020] text-white rounded-tr-none' 
                        : 'bg-white text-[#133020] border border-[#133020]/5 rounded-tl-none shadow-sm'
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#133020]/10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#F9F7F7] border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#133020]/20 outline-none text-[#133020]"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-[#133020] text-white rounded-full hover:bg-[#046241] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
