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
  padding-top: ${spacing.xl}px;
  padding-bottom: ${spacing.lg}px;
  padding-horizontal: 28px;
`;

const BackButton = styled.Pressable`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: flex-start;
`;

const HeaderAction = styled.Pressable`
  width: 40px;
  height: 40px;
  align-items: flex-end;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  color: ${colors.text};
  font-size: 19px;
  font-weight: 800;
`;

const Hero = styled.View`
  padding-bottom: 8px;
`;

const OverlapStage = styled.View`
  position: relative;
  padding-bottom: 8px;
`;

const Backdrop = styled.View<{ $hasImage: boolean }>`
  height: 300px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 34px;
  border-bottom-right-radius: 34px;
  background-color: ${({ $hasImage }) =>
    $hasImage ? colors.surface : colors.surfaceMuted};
`;

const BackdropImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

const PlayButton = styled.View`
  position: absolute;
  width: 88px;
  height: 88px;
  border-radius: 44px;
  background-color: rgba(243, 245, 247, 0.22);
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
  margin-left: 7px;
`;

const DetailCard = styled.View`
  padding-top: 20px;
  padding-bottom: 16px;
  margin-left: 30px;
  background-color: ${colors.background};
`;

const PosterThumb = styled.View<{ $hasImage: boolean }>`
  position: absolute;
  top: 224px;
  left: 16px;
  z-index: 3;
  width: 108px;
  height: 148px;
  border-radius: 22px;
  overflow: hidden;
  background-color: ${({ $hasImage }) =>
    $hasImage ? colors.surface : colors.surfaceMuted};
`;

const PosterThumbImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-left: 118px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
  text-align: left;
  max-width: 220px;
`;

const RatingBadge = styled.View`
  position: absolute;
  right: 18px;
  bottom: 16px;
  z-index: 2;
  min-width: 76px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-horizontal: 12px;
  padding-vertical: 7px;
  border-radius: 18px;
  background-color: rgba(17, 19, 25, 0.82);
`;

const RatingText = styled.Text`
  color: #ff8700;
  font-size: 16px;
  font-weight: 800;
`;

const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 30px;
  column-gap: 10px;
  align-self: center;
`;

const MetaIconWrap = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const MetaSeparator = styled.View`
  width: 1px;
  height: 16px;
  background-color: rgba(160, 167, 180, 0.35);
`;

const MetaItemText = styled.Text`
  color: ${colors.textMuted};
  font-size: 14px;
`;

const LoadingWrap = styled.View`
  margin-top: 12px;
  align-items: flex-start;
  padding-left: 118px;
`;

const Body = styled.View`
  margin-top: 14px;
  margin-horizontal: 20px;
`;

const Summary = styled.Text`
  color: ${colors.text};
  font-size: 14px;
  line-height: 20px;
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
  MetaIconWrap,
  MetaItemText,
  MetaRow,
  MetaSeparator,
  OverlapStage,
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
