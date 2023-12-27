import React, {useCallback, useRef, useState} from 'react';
import {Button, ScreenWidth, Text} from '@rneui/base';
import {useTheme} from '@rneui/themed';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useTodoList} from '../../hooks/useTodoList';
import {AddEditModal} from './add-edit-modal';
import {LottieComponent} from '../../components/lottie';
import {fonts} from '../../constants/theme';
import EditIcon from '../../assets/svgs/edit.svg';
import DeleteIcon from '../../assets/svgs/delete.svg';
import Done from '../../assets/svgs/checked.svg';
import UnDone from '../../assets/svgs/unCheked.svg';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
const FLOATING_ACTION_BUTTON_SIZE = 70;

interface TodoItemProps {
  item: TodoItem;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: TodoItem) => void;
}

interface TodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onToggleCompletion,
  onDelete,
  onEdit,
}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.todoItem, {backgroundColor: theme.colors.background}]}>
      <TouchableOpacity onPress={() => onToggleCompletion(item.id)}>
        {item.isCompleted ? (
          <Done fill={theme.colors.primary} />
        ) : (
          <UnDone fill={theme.colors.primary} />
        )}
      </TouchableOpacity>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.todoText,
          {textDecorationLine: item.isCompleted ? 'line-through' : 'none'},
        ]}>
        {item.title}
      </Text>
      <Button
        size="sm"
        radius={6}
        type="clear"
        color={theme.colors.error}
        icon={<DeleteIcon fill={theme.colors.error} />}
        raised
        onPress={() => onDelete(item.id)}
      />

      <Button
        size="sm"
        type="clear"
        radius={6}
        color={theme.colors.grey1}
        icon={<EditIcon fill={theme.colors.primary} />}
        onPress={() => onEdit(item)}
      />
    </View>
  );
};
const TodoItemAnimated: React.FC<TodoItemProps> = props => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TodoItem {...props} />
    </Animated.View>
  );
};

export const ListScreen: React.FC = () => {
  const [modal, setModal] = useState<{
    visible: boolean;
    item: TodoItem | undefined;
  }>({visible: false, item: undefined});
  const {getTodos, updateStorage} = useTodoList();
  const [todos, setTodos] = useState<TodoItem[]>(getTodos());
  const {theme} = useTheme();
  const buttonRef = useRef<LottieView>(null);

  const handleAdd = useCallback(() => {
    buttonRef.current?.reset();
    buttonRef.current?.play(0, 75);
    setModal({visible: true, item: undefined});
  }, []);

  const toggleTodoCompletion = useCallback(
    (id: string) => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      );
      setTodos(updatedTodos);
      updateStorage(updatedTodos);
    },
    [todos, updateStorage],
  );

  const handleDelete = useCallback(
    (id: string) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      updateStorage(updatedTodos);
    },
    [todos, updateStorage],
  );

  const handleEdit = useCallback((item: TodoItem) => {
    setModal({visible: true, item});
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <TodoItemAnimated
            item={item}
            onToggleCompletion={toggleTodoCompletion}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      />
      <AddEditModal
        isVisible={modal.visible}
        onBackdropPress={() => setModal({visible: false, item: undefined})}
        setTodos={setTodos}
        item={modal.item}
      />
      <TouchableOpacity
        onPress={handleAdd}
        style={[
          styles.floatingButton,
          {backgroundColor: theme.colors.secondary},
        ]}>
        <LottieView
          ref={buttonRef}
          source={require('../../assets/svgs/add.json')}
          loop={false}
          autoPlay={false}
          style={{flex: 1}}
          speed={3}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const EmptyList: React.FC = () => (
  <View style={styles.emptyList}>
    <LottieComponent
      source={require('../../assets/svgs/empty.json')}
      style={{width: ScreenWidth, aspectRatio: 1}}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: ScreenWidth - 40,
    marginVertical: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  todoText: {
    fontFamily: fonts.semibold,
    flex: 1,
    fontSize: 16,
  },
  floatingButton: {
    height: FLOATING_ACTION_BUTTON_SIZE,
    width: FLOATING_ACTION_BUTTON_SIZE,
    borderRadius: FLOATING_ACTION_BUTTON_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    position: 'absolute',
    bottom: 64,
    right: 32,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
