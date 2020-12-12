import React, { Children } from 'react';
import { View } from 'react-native';

export default function Row({children, height, top, bottom, center , cols }) {

    const heightValue        = height ? height : 45;
    const marginTop          = top ? top : 10;
    const marginBottom       = bottom ? bottom : 5;
    const viewJustifyContent = center ? 'center' : 'flex-start';
    const alignItems         = center ? 'center' : 'flex-start';

    return (
        <View style={{ 
            width: '100%', 
            height: heightValue,
            marginTop: marginTop,
            marginBottom: marginBottom, 
            justifyContent: viewJustifyContent, 
            alignItems: alignItems,
            flexDirection: 'row',
         }}>
             { Children.map(children, (child, i) => {

                let col = cols[i] ? cols[i] : 8;
                let width = col === 1 ? 12.25 : 
                            col === 2 ? 24.50 : 
                            col === 3 ? 36.75 : 
                            col === 4 ? 49.00 : 
                            col === 5 ? 61.25 : 
                            col === 6 ? 73.50 : 
                            col === 7 ? 85.75 : 
                            col >= 8  ? 100 : 0;
                let marginLeft = i === 0 ? 0 : 2;

                return(
                <View style={{ marginLeft: `${marginLeft}%`, width: `${width}%`}}>
                    { child }
                </View>
                );
             })
             }
        </View>
    );
}