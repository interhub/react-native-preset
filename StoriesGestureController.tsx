import {
    LongPressGestureHandler,
    State,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import React, {useRef} from 'react';
import {Animated} from 'react-native';
import SIZE from '../../../../config/SIZE';

interface StoriesGestureControllerProps {
    children: React.ReactNode;
    storiesControl: StoriesControlType;
}

export interface StoriesControlType {
    /**
     set prev stories callback
     */
    nextStory: () => void;
    /**
     set next stories callback
     */
    prevStory: () => void;
    /**
     on press in event for pause stories watch callback
     */
    onPressIn: () => void;
    /**
     on press out event for break long press and play stories callback
     */
    onPressOut: () => void;
}

/**
 time for check different between Pause stories and set next stories (long press time gesture)
 */
const PAUSE_TIME = 250;

const StoriesGestureController = ({
                                      storiesControl,
                                      children,
                                  }: StoriesGestureControllerProps) => {
    const {nextStory, prevStory, onPressIn, onPressOut} = storiesControl;

    const onHandlerStateChangeTap = ({
                                         nativeEvent: {state, absoluteX},
                                     }: TapGestureHandlerStateChangeEvent) => {
        // console.log(State, 'event', state, 'onHandlerStateChangeTap');
        switch (state) {
            case State.BEGAN:
                onPressIn();
                break;
            case State.END:
                const isNext = absoluteX > SIZE.width / 2;
                isNext ? nextStory() : prevStory();
                onPressOut();
                break;
        }
    };

    const onHandlerStateChangeLong = ({
                                          nativeEvent: {state},
                                      }: TapGestureHandlerStateChangeEvent) => {
        // console.log(State, 'event', state, 'onHandlerStateChangeLong');
        switch (state) {
            case State.ACTIVE:
                onPressIn();
                break;
            case State.END:
                onPressOut();
                break;
        }
    };

    const longRef = useRef<LongPressGestureHandler>(null);

    return (
        <TapGestureHandler
            waitFor={longRef}
            onHandlerStateChange={onHandlerStateChangeTap}>
            <LongPressGestureHandler
                minDurationMs={PAUSE_TIME}
                ref={longRef}
                onHandlerStateChange={onHandlerStateChangeLong}>
                <Animated.View style={{flex: 1}}>{children}</Animated.View>
            </LongPressGestureHandler>
        </TapGestureHandler>
    );
};

export default StoriesGestureController;
