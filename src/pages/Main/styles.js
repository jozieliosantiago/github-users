import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 25px 20px 0px;
  background: #fff;
`;

export const Form = styled.View`
  flex-direction: row;
  height: 60px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#d0d0d0',
})`
  flex: 1;
  height: 40px;
  background: ${(props) => (props.requestError ? '#ff000008' : '#f5f5f5')};
  border-radius: 4px;
  padding: 0 15px;
  border: solid 1px ${(props) => (props.requestError ? '#ff000050' : '#f5f5f5')};
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

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
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #7159c1;
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

export const GroupButton = styled.View`
  flex-direction: row;
  height: 60px;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

export const DeleteButton = styled(RectButton)`
  align-items: center;
`;

export const CancelButton = styled(RectButton)`
  align-items: center;
`;

export const TextButton = styled.Text`
  padding: 8px 30px;
  border: solid 1px ${(props) => (props.disabled ? '#7159c160' : '#7159c1')};
  border-radius: 4px;
  color: ${(props) => (props.disabled ? '#7159c160' : '#7159c1')};
`;
