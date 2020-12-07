import styled from 'styled-components/native';

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


export const Link = styled.TouchableOpacity`
    margin-top: 5px;
    margin-bottom: 9px;
`;

export const LinkText = styled.Text`
    margin-top: 15px;
    color: #ff7213;
`;