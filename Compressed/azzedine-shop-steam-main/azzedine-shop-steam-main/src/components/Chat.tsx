
import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Chat() {
  const { isOpen, activeChat, messages, closeChat, sendMessage } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when they change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 shadow-xl">
      <Card className="border-2 border-azzedine-primary/20">
        <CardHeader className="p-3 bg-gradient-to-r from-azzedine-primary to-azzedine-secondary flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-white/20 text-white border-white/10">
              Chat Support
            </Badge>
            <CardTitle className="text-sm font-medium text-white">
              {activeChat?.productName || 'Support Chat'}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeChat}
            className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <ScrollArea className="h-80">
          <CardContent className="p-3 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.sender === 'support' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/support-avatar.png" alt="Support" />
                      <AvatarFallback className="bg-azzedine-primary text-white">AZ</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.sender === 'user'
                        ? 'bg-azzedine-primary text-white'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                    <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>
        
        <CardFooter className="p-3">
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
