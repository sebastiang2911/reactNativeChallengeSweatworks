import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.xl}px;
`;

const BackButton = styled.Pressable`
  width: 36px;
  height: 36px;
  justify-content: center;
`;

const HeaderAction = styled.View`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  color: ${colors.text};
  font-size: 20px;
  font-weight: 800;
`;

const Hero = styled.View`
  padding-horizontal: ${spacing.xl}px;
`;

const Backdrop = styled.View`
  height: 240px;
  border-radius: 30px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const BackdropImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

const PlayButton = styled.View`
  position: absolute;
  width: 84px;
  height: 84px;
  border-radius: 42px;
  background-color: rgba(31, 35, 43, 0.28);
  align-items: center;
  justify-content: center;
`;

const PlayTriangle = styled.View`
  width: 0;
  height: 0;
  border-top-width: 14px;
  border-bottom-width: 14px;
  border-left-width: 24px;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: ${colors.text};
  margin-left: 6px;
`;

const DetailCard = styled.View`
  margin-top: -54px;
  margin-horizontal: ${spacing.xl}px;
  padding: ${spacing.xl}px;
  border-radius: 30px;
  background-color: ${colors.background};
`;

const PosterThumb = styled.View`
  width: 120px;
  height: 160px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: ${spacing.lg}px;
`;

const PosterThumbImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${spacing.md}px;
`;

const Title = styled.Text`
  flex: 1;
  color: ${colors.text};
  font-size: 22px;
  line-height: 34px;
  font-weight: 800;
`;

const RatingBadge = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 10px;
  border-radius: 18px;
  background-color: rgba(255, 179, 71, 0.14);
`;

const RatingText = styled.Text`
  color: ${colors.warning};
  font-size: 20px;
  font-weight: 800;
`;

const MetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.md}px;
  margin-top: ${spacing.lg}px;
`;

const MetaItem = styled.Text`
  color: ${colors.textMuted};
  font-size: 16px;
`;

const LoadingWrap = styled.View`
  margin-top: ${spacing.lg}px;
  align-items: flex-start;
`;

const Body = styled.View`
  margin-top: ${spacing.xl}px;
`;

const Summary = styled.Text`
  color: ${colors.text};
  font-size: 16px;
  line-height: 30px;
`;

export {
  BackButton,
  Backdrop,
  BackdropImage,
  Body,
  DetailCard,
  Header,
  HeaderAction,
  HeaderTitle,
  Hero,
  LoadingWrap,
  MetaItem,
  MetaRow,
  PlayButton,
  PlayTriangle,
  PosterThumb,
  PosterThumbImage,
  RatingBadge,
  RatingText,
  SafeArea,
  Scroll,
  Summary,
  Title,
  TitleRow,
};
