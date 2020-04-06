import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { State } from 'react-native-gesture-handler';

import UserCard from '../../components/UserCard';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  GroupButton,
  DeleteButton,
  TextButton,
  CancelButton,
} from './styles';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    requestError: false,
    remove: false,
    removeList: [],
    disabled: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    this.setState({ loading: true });

    const { users, newUser } = this.state;

    const existUser = users.find((user) => user.login === newUser);

    if (!existUser && newUser) {
      try {
        const response = await api.get(`/users/${newUser}`);

        if (response.lenght) throw new Error('User not found');

        const data = {
          name: response.data.name ? response.data.name : 'unnamed',
          bio: response.data.bio ? response.data.bio : 'without bio',
          login: response.data.login,
          avatar: response.data.avatar_url,
        };

        this.setState({
          users: [data, ...users],
        });
      } catch (error) {
        this.handleError();
      }
    } else {
      this.handleError();
    }

    this.setState({
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleError = () => {
    this.setState({ requestError: true });

    setTimeout(() => {
      this.setState({ requestError: false });
    }, 2000);
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  longPress = (nativeEvent) => {
    if (nativeEvent.state === State.ACTIVE)
      this.setState({ remove: true, disabled: true });
  };

  addRemoveInDeleteList = async (userLogin, add) => {
    const { removeList } = this.state;

    if (add) await this.setState({ removeList: [...removeList, userLogin] });
    else
      await this.setState({
        removeList: removeList.filter((user) => user !== userLogin),
      });

    return add;
  };

  deleteUsers = () => {
    this.setState({ remove: false, disabled: false });
    const { users, removeList } = this.state;

    const newList = users.filter((user) => !removeList.includes(user.login));

    this.setState({
      users: newList,
      removeList: [],
    });
  };

  render() {
    const {
      users,
      newUser,
      loading,
      requestError,
      remove,
      disabled,
      removeList,
    } = this.state;

    return (
      <Container>
        {remove ? (
          <GroupButton>
            <CancelButton
              onPress={() => this.setState({ remove: false, disabled: false })}
            >
              <TextButton>Cancelar</TextButton>
            </CancelButton>
            <DeleteButton
              onPress={() => (!removeList.length ? false : this.deleteUsers())}
            >
              <TextButton disabled={!removeList.length}>Remover</TextButton>
            </DeleteButton>
          </GroupButton>
        ) : (
          <Form>
            <Input
              autoCorrect={false}
              autoCaptalize="none"
              placeholder="Adcionar usuário"
              value={newUser}
              onChangeText={(text) => this.setState({ newUser: text.trim() })}
              returnKeyType="send"
              onSubmitEditing={this.handleAddUser}
              requestError={requestError}
            />
            <SubmitButton loading={loading} onPress={this.handleAddUser}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Icon name="add" size={20} color="#fff" />
              )}
            </SubmitButton>
          </Form>
        )}

        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({ item }) => (
            <UserCard
              longPress={this.longPress}
              remove={remove}
              user={item}
              addRemoveInDeleteList={this.addRemoveInDeleteList}
              handleNavigate={this.handleNavigate}
              disabled={disabled}
            />
          )}
        />
      </Container>
    );
  }
}

Main.options = {
  title: 'Usuários',
};
