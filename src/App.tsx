import { useCallback, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import {v4} from 'uuid';
import clsx from 'clsx';

const loremipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam odio ut sapien mollis hendrerit. Fusce in lectus ex. In hac habitasse platea dictumst. Duis aliquam sed arcu at sagittis. Pellentesque suscipit elit a elit dignissim, ornare mattis libero convallis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque in dictum augue, nec consectetur enim. Pellentesque quis quam ultricies, volutpat nulla sit amet, egestas est. Praesent accumsan ante non dui sollicitudin convallis. Etiam facilisis finibus lectus, euismod gravida ipsum ultricies at.';

const words: string[] = loremipsum.split(' ');

const Input = ({
  children,
  className,
  type,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input type={type} className={clsx(
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      className
    )} {...rest}>
      {children}
    </input>
  );
};

function App() {
  const [bold, setBold] = useState<string>('');
  const [underline, setUnderline] = useState<string>('');
  const [red, setRed] = useState<string>('');

  const handleUnderlineChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUnderline(e.target.value);
  },[setUnderline]);

  const handleBoldChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBold(e.target.value);
  },[setBold]);

  const handleRedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRed(e.target.value);
  },[setRed]);

  return (
    <div className="m-auto p-64 justify-center">
      <h1>Text Changer</h1>
      <div>{words.map((word) => {
        const newWord = word + ' '
        if (bold === word || underline === word || red === word){
          return <span key={v4()} className={clsx(bold === word && 'font-bold' , underline === word && 'underline', red === word && 'text-red-600')}>{newWord}</span>
        }
        
        return newWord
      })}</div>
      <div className="grid grid-cols-1 gap-2 p-16">
        <Input
          placeholder="Enter word to underline"
          onChange={handleUnderlineChange}
          value={underline}
        />
        <Input
          placeholder="Enter word to bold"
          onChange={handleBoldChange}
          value={bold}
        />
        <Input
          placeholder="Enter word to turn red"
          onChange={handleRedChange}
          value={red}
        />
      </div>

    </div>
  );
}

export default App;
