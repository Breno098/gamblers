import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
    margin-bottom: 40px;
    width: 90%;
    height: 60px;
`;

export const ButtonMenu = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const DivisorContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const MessageArea = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: transparent;
    width: 90%;
    height: 40px;
    border: 1px solid transparent;
    text-align: center;
`;

export const MessageText = styled.Text`
    font-size: 15px;
    color: #FFF;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin: auto;
`;