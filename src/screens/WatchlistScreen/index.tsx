import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BoxIcon from '../../../assets/icons/boxIcon.svg';

import { MovieListItem } from '../../components/MovieListItem';
import { useWatchlist } from '../../context/WatchlistContext';
import {
  RootStackParamList,
  RootTabParamList,
} from '../../navigation/AppNavigator';
import {
  Content,
  Description,
  EmptyState,
  IconWrapper,
  Results,
  SafeArea,
  Subtitle,
  Title,
} from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Watch list'>,
  NativeStackScreenProps<RootStackParamList>
>;

function WatchlistScreen({ navigation }: Props) {
  const { watchlist } = useWatchlist();

  return (
    <SafeArea>
      <Content>
        <Title>Watch list</Title>
        {watchlist.length > 0 ? (
          <Results showsVerticalScrollIndicator={false}>
            {watchlist.map(movie => (
              <MovieListItem
                key={movie.id}
                movie={movie}
                onPress={() => navigation.navigate('Detail', { movie })}
              />
            ))}
          </Results>
        ) : (
          <EmptyState>
            <IconWrapper>
              <BoxIcon width={74} height={76} />
            </IconWrapper>
            <Subtitle>There Is No Movie Yet!</Subtitle>
            <Description>
              Find your movie by Type title,{'\n'}
              categories, years, etc
            </Description>
          </EmptyState>
        )}
      </Content>
    </SafeArea>
  );
}

export { WatchlistScreen };
