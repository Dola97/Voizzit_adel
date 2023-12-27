import {ScreenWidth, Text, Input, Button} from '@rneui/base';
import {useTheme} from '@rneui/themed';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Modal, StyleSheet, View} from 'react-native';
import {fonts, theme} from '../../constants/theme';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {todoSchema} from '../schemas/todo-list';
import {useTodoList} from '../../hooks/useTodoList';

interface TodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
}
interface Props {
  isVisible: boolean;
  onBackdropPress: () => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  item: TodoItem | undefined;
}
type FormData = yup.InferType<typeof todoSchema>;
export const AddEditModal: React.FC<Props> = ({
  isVisible,
  onBackdropPress,
  setTodos,
  item,
}) => {
  const {
    theme: {colors},
  } = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(todoSchema),
  });
  const {getTodos, updateStorage} = useTodoList();

  const _handleAddEdit = (formData: FormData) => {
    const {title} = formData;
    if (item) {
      const updatedTodos = getTodos().map(todo =>
        todo.id === item.id ? {...todo, title: title} : todo,
      );
      setTodos(updatedTodos);
      updateStorage(updatedTodos);
      onBackdropPress();
      reset();
    } else {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        title,
        isCompleted: false,
      };
      const updatedTodos = [...getTodos(), newTodo];
      setTodos(updatedTodos);
      updateStorage(updatedTodos);
      onBackdropPress();
      reset();
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onBackdropPress}>
      <View style={styles.centeredView}>
        <View style={{...styles.modalView, backgroundColor: colors.background}}>
          <Text style={styles.modalText}>{item ? 'Edit' : ' Add'}</Text>
          <Controller
            control={control}
            defaultValue={item?.title || ''}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                placeholderTextColor="#000"
                inputContainerStyle={{borderBottomWidth: 0}}
                style={{
                  ...styles.input,
                  backgroundColor: colors.grey0,
                  paddingHorizontal: theme.spacing?.xl,
                  paddingVertical: theme.spacing?.sm,
                  textDecorationLine: 'none',
                  color: colors.secondary,
                  fontSize: theme.spacing?.lg,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
          />

          {errors.title && (
            <Text style={{color: colors.error}}>{errors.title.message}</Text>
          )}
          <View
            style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>
            <Button
              color={colors.primary}
              radius={6}
              onPress={handleSubmit(_handleAddEdit)}>
              {item ? 'Edit' : 'Add'}
            </Button>
            <Button
              radius={6}
              color={colors.error}
              onPress={() => {
                reset();
                onBackdropPress();
              }}>
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 10,
    padding: 24,

    width: ScreenWidth - 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderRadius: 4,

    fontFamily: fonts.regular,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
