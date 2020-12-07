import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #131313;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    margin-bottom: 15px;
    height: 150px;
    width: 150px;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    width: 90%;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255,255,255,0.50)'
})`
    background: rgba(0,0,0,0.20);
    width: 100%;
    font-size: 17px;
    color: #FFF;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 7px;
    border: 1px solid #ff7213;
`;

export const AreaInputPass = styled.View`
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
`;

export const InputPass = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255,255,255,0.50)'
})`
    background: rgba(0,0,0,0.20);
    width: 85%;
    font-size: 17px;
    color: #FFF;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 7px;
    border: 1px solid #ff7213;
`;

export const IconPass = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 5px;
`;

export const MessageArea = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: transparent;
    width: 90%;
    height: 45px;
    border-radius: 7px;
    margin: 10px 0;
    border: 1px solid transparent;
`;

export const MessageText = styled.Text`
    font-size: 15px;
    color: #FFF;
    font-weight: bold;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff7213;
    width: 90%;
    height: 45px;
    border-radius: 7px;
    margin-top: 10px;
`;

export const SubmitText = styled.Text`
    font-size: 25px;
    color: #FFF;
    font-weight: bold;
`;

export const Link = styled.TouchableOpacity`
    margin-top: 5px;
    margin-bottom: 9px;
`;

export const LinkText = styled.Text`
    margin-top: 15px;
    color: #ff7213;
`;