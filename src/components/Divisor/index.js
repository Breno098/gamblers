import React, { Children }from 'react';
import { View } from 'react-native';

export default function Divisor({children, row, top, bottom, center, cols }) {

    const height = row ? (row * 10) : 100;
    const marginTop = top ?? 0;
    const marginBottom = bottom ?? 0;
    const viewJustifyContent = center ? 'center' : cols ? 'space-between' : 'flex-start';
    const alignItems = center || cols ? 'center' :  'flex-start';
    const colsWidth = cols ? ((100 - 2)/cols) : 100;
    const flexDivision = cols ? 'row' : 'column';

    return (
        <View style={{ 
            width: '100%', 
            marginTop: marginTop,
            marginBottom: marginBottom, 
            justifyContent: viewJustifyContent, 
            alignItems: alignItems,
            flexDirection: flexDivision,
         }}>
            { Children.map(children, (child, i) => (
                <View style={{ width: colsWidth + '%',  height: height }}>
                    { child }
                </View>
            ))

            }
        </View>
    );
}