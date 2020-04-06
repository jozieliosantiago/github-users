import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native';

export const User = styled.View`
  align-items: center;
  margin: 0 0px 30px;
  border-radius: 4px;
  padding: 10px 15px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
  opacity: ${(props) => (props.marked ? 0.5 : 1)};
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
  opacity: ${(props) => (props.marked ? 0.5 : 1)};
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
  opacity: ${(props) => (props.marked ? 0.5 : 1)};
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? '#7159c170' : '#7159c1')};
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const Check = styled(CheckBox)`
  position: absolute;
  z-index: 1;
  right: 0;
`;
