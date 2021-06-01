import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function LoadingComponent({inverted = true, content = 'Се вчитува...'}) {
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content={content} />
        </Dimmer>
    )
}