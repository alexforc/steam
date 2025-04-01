
import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminMessagesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { allChats, messages, activeChat, openChat, receiveMessage, getMessagesForProduct } = useChatStore();
  const [replyContent, setReplyContent] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Protect this route - only admin ID 1 can access
  useEffect(() => {
    if (!user || user.id !== '1') {
      toast.error('Access denied. Only administrators can view this page.');
      navigate('/');
    }
  }, [user, navigate]);
  
  // Scroll to bottom of messages when they change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSelectChat = (productId: string, productName: string) => {
    setSelectedChatId(productId);
    openChat(productId, productName);
  };
  
  const handleSendReply = () => {
    if (replyContent.trim() && activeChat) {
      receiveMessage(replyContent, true);
      setReplyContent('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };
  
  const displayMessages = selectedChatId ? getMessagesForProduct(selectedChatId) : [];
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Message Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Customer Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {allChats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No active conversations
                </div>
              ) : (
                <div className="space-y-2">
                  {allChats
                    .sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime())
                    .map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-md cursor-pointer border transition-colors ${
                          selectedChatId === chat.productId
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-muted border-transparent'
                        }`}
                        onClick={() => handleSelectChat(chat.productId, chat.productName)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{chat.productName}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(chat.lastMessageTime).toLocaleString()}
                            </div>
                          </div>
                          {chat.unreadCount > 0 && (
                            <Badge variant="destructive">{chat.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Chat Messages */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>
              {activeChat ? `Conversation about ${activeChat.productName}` : 'Select a conversation'}
            </CardTitle>
          </CardHeader>
          
          <ScrollArea className="h-[400px]">
            <CardContent className="p-4 space-y-4">
              {!selectedChatId ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a conversation from the list to view messages
                </div>
              ) : displayMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No messages in this conversation
                </div>
              ) : (
                displayMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                      {message.sender === 'user' ? (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted">U</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/support-avatar.png" alt="Support" />
                          <AvatarFallback className="bg-azzedine-primary text-white">A</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-3 py-2 text-sm ${
                          message.sender === 'support'
                            ? 'bg-azzedine-primary text-white'
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                        <div className={`text-xs mt-1 ${message.sender === 'support' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </CardContent>
          </ScrollArea>
          
          <CardFooter className="p-4">
            <div className="flex w-full items-start space-x-2">
              <Textarea
                placeholder={selectedChatId ? "Type your reply..." : "Select a conversation to reply"}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 min-h-[80px]"
                disabled={!selectedChatId}
              />
              <Button 
                size="icon" 
                onClick={handleSendReply} 
                disabled={!replyContent.trim() || !selectedChatId}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
