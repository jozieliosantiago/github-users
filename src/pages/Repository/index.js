import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Loader } from './styles';

export default class Repository extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.shape(),
      }).isRequired,
    }),
  };

  state = {
    repository: {},
    loading: true,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { repository } = route.params;

    this.setState({
      repository,
    });
  }

  render() {
    const { repository, loading } = this.state;
    return (
      <>
        <WebView
          source={{ uri: repository.html_url }}
          onLoad={() => this.setState({ loading: false })}
        />
        {loading && (
          <Loader>
            <ActivityIndicator size="large" color="#7159c1" />
          </Loader>
        )}
      </>
    );
  }
}
