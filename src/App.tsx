import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Input } from './components/ui/input';
import {
  Bot,
  BotMessageSquare,
  UserRound,
  ArrowUp,
  Loader2,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

function Message({ user, text }: { user: 'GPT' | 'USER'; text: string }) {
  return (
    <Alert>
      {user === 'GPT' ? (
        <Bot className='h-4 w-4' />
      ) : (
        <UserRound className='h-4 w-4' />
      )}
      <AlertTitle>{user}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
interface IMessage {
  user: 'GPT' | 'USER';
  text: string;
}

function Header() {
  return (
    <div className='fixed left-1/2 top-0 max-w-screen-md w-full mx-auto -translate-x-1/2 z-50'>
      <div className='max-w h-12 border-border border-b flex items-center px-4 bg-white'>
        <BotMessageSquare className='mr-2' />
        <h1 className='font-bold text-lg'>우리의 GPT</h1>
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setInput(input.value);
  };

  const handlePushingMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    // const form = e.target as HTMLFormElement;
    // const input = form.elements.namedItem('query') as HTMLInputElement;
    // const query = input.value;
    setInput('');
    setLoading(true);

    setMessages((messages) => [
      ...messages,
      {
        user: 'USER',
        text: input,
      },
    ]);

    // 대기했다가
    await new Promise((res) => setTimeout(res, 1000));

    // 새로운메시지 추가
    setMessages((messages) => [
      ...messages,
      {
        user: 'GPT',
        text: 'This message will be replaced with API response',
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 99999);
  }, [messages]);

  return (
    <>
      <Header />
      <div className='container max-w-screen-md mx-auto'>
        <div className='flex flex-col gap-y-3 pb-16 pt-16'>
          {messages.map((message, i) => (
            <Message {...message} key={i} />
          ))}
        </div>
      </div>

      <div className='fixed left-1/2 bottom-0 max-w-screen-md w-full mx-auto -translate-x-1/2 bg-white'>
        <form onSubmit={handlePushingMessage}>
          {/* <Textarea
            className='w-full resize-none my-2'
            placeholder='질문 내용을 입력하세요'
          /> */}
          <div className='flex gap-x-2 pb-3'>
            <Input
              placeholder='질문 내용을 입력하세요'
              name='query'
              className='flex-1'
              value={input}
              onChange={handleInputChange}
            />
            <SendButton input={input} loading={loading} />
          </div>
        </form>
      </div>
    </>
  );
}

function SendButton({ input, loading }: { input: string; loading: boolean }) {
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      disabled={input === '' || loading}
    >
      {loading ? <Loader2 className='animate-spin' /> : <ArrowUp />}
    </Button>
  );
}

export default App;
