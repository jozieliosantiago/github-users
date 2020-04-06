import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LongPressGestureHandler,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import {
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  Check,
} from './styles';

export default class UserCard extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      bio: PropTypes.string,
      login: PropTypes.string,
    }).isRequired,
    addRemoveInDeleteList: PropTypes.func,
    longPress: PropTypes.func,
    remove: PropTypes.bool,
    handleNavigate: PropTypes.func,
    disabled: PropTypes.bool,
  };

  state = {
    check: false,
  };

  checkUncheck = (userLogin, value) => {
    const { addRemoveInDeleteList } = this.props;
    addRemoveInDeleteList(userLogin, value);
    this.setState({ check: value });
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { check } = this.state;
    const { user, longPress, remove, handleNavigate, disabled } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => (remove ? this.checkUncheck(user.login, !check) : false)}
      >
        <LongPressGestureHandler
          onHandlerStateChange={({ nativeEvent }) => longPress(nativeEvent)}
          minDurationMs={800}
        >
          <User>
            {remove && <Check value={check} />}

            <Avatar source={{ uri: user.avatar }} marked={remove && check} />
            <Name marked={remove && check}>{user.name}</Name>
            <Bio marked={remove && check}>{user.bio}</Bio>

            <ProfileButton
              disabled={disabled}
              onPress={() => (disabled ? false : handleNavigate(user))}
            >
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        </LongPressGestureHandler>
      </TouchableWithoutFeedback>
    );
  }
}
