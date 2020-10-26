import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import { Video } from 'expo-av';
import SocialWebviewModal from '../../components/Auth/SocialWebviewModal';

const { height } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background: ${props => props.theme.palette.mainBackground};
`;
const Wrapper = styled.View`
  width: 70%;
  margin-bottom: ${height / 10}px;
`;

const LoginButton = styled.TouchableOpacity`
  border-radius: 3px;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);
`;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
  align-items: flex-start;
`;

const AuthIntro: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [source, setSource] = useState<{ uri: string }>({ uri: '' });

  const signupWithSocial = async (social: string) => {
    setShowModal(!showModal);
    setSource({ uri: `http://localhost:3000/auth/${social}` });
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Container>
      {source.uri !== undefined ? (
        <SocialWebviewModal
          visible={showModal}
          source={source}
          closeModal={closeModal}
        />
      ) : null}
      <Video
        source={require('../../../assets/video/bluesky.mp4')}
        rate={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -100,
        }}
      />
      <Wrapper>
        <LoginButton onPress={() => signupWithSocial('google')}>
          <Image
            source={require('../../../assets/icon/google.png')}
            style={{ width: 30, height: 30 }}
          />
          <StyledText>Google로 시작하기</StyledText>
        </LoginButton>
        <LoginButton onPress={() => signupWithSocial('naver')}>
          <Image
            source={require('../../../assets/icon/naver.png')}
            style={{ width: 30, height: 30 }}
          />
          <StyledText>Naver로 시작하기</StyledText>
        </LoginButton>
        <LoginButton onPress={() => signupWithSocial('kakao')}>
          <Image
            source={require('../../../assets/icon/kakao.png')}
            style={{ width: 30, height: 30 }}
          />
          <StyledText>Kakao로 시작하기</StyledText>
        </LoginButton>
      </Wrapper>
    </Container>
  );
};

export default AuthIntro;