import React from 'react';

import {
  Content,
  Description,
  SafeArea,
  Title,
} from './styles';

function WatchlistScreen() {
  return (
    <SafeArea>
      <Content>
        <Title>Watch list</Title>
        <Description>This section is ready for your saved movies.</Description>
      </Content>
    </SafeArea>
  );
}

export { WatchlistScreen };
