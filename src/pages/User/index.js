import React, { Component } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react-native';

import EmptyBox from '../../assets/animations/empty-box.json';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loader,
  NoData,
  NoDataText,
} from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape(),
      }).isRequired,
    }),
  };

  state = {
    stars: [],
    user: {},
    page: 1,
    loadingData: true,
    loading: false,
    refreshing: false,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({
      stars: response.data,
      loadingData: false,
      user,
    });
  }

  loadMore = async () => {
    const { page, user, stars } = this.state;
    if (stars.length >= 30) {
      this.setState({ loading: true });
      const nextPage = page + 1;
      const response = await api.get(
        `/users/${user.login}/starred?page=${nextPage}`
      );
      this.setState({
        stars: [...stars, ...response.data],
        page: nextPage,
        loading: false,
      });
    }
  };

  refreshList = async () => {
    const { user } = this.state;

    const response = await api.get(`/users/${user.login}/starred?page=1`);

    this.setState({
      stars: response.data,
      page: 1,
    });
  };

  render() {
    const { stars, user, loading, refreshing, loadingData } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loadingData ? (
          <Loader>
            <ActivityIndicator size="large" color="#7159c1" />
          </Loader>
        ) : (
          <>
            {stars.length === 0 ? (
              <NoData>
                <Lottie source={EmptyBox} autoPlay loop />
                <NoDataText>Sem repositórios favoritos</NoDataText>
              </NoData>
            ) : (
              <Stars
                data={stars}
                keyExtractor={(star) => star.node_id}
                ListFooterComponent={() =>
                  loading && <ActivityIndicator size="large" color="#7159c1" />
                }
                onRefresh={this.refreshList}
                refreshing={refreshing}
                onEndReached={this.loadMore}
                renderItem={({ item }) => (
                  <Starred>
                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                )}
              />
            )}
          </>
        )}
      </Container>
    );
  }
}

User.options = {
  title: 'GitHub User',
};
