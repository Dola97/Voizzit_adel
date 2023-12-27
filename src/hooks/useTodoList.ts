import {MMKV} from 'react-native-mmkv';

interface TodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const storage = new MMKV({
  id: `user-${5}-storage`,
  encryptionKey: 'hunter2',
});

export const useTodoList = () => {
  const getTodos = (): TodoItem[] => {
    const storedTodos = storage.getString('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const updateStorage = (updatedTodos: TodoItem[]) => {
    storage.set('todos', JSON.stringify(updatedTodos));
  };

  return {
    getTodos,
    updateStorage,
  };
};
