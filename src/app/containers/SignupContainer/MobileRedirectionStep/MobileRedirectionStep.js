import React from 'react';
import PropTypes from 'prop-types';
import { c } from 'ttag';
import { SubTitle, Href, Icon, Paragraph } from 'react-components';

const MobileRedirectionStep = ({ model }) => {
    return (
        <div className="pt2 mb2 text-center">
            <SubTitle>{c('Title').t`Account created`}</SubTitle>
            <Icon name="on" className="mb2 color-global-success" size={100} />
            <Paragraph className="mb2">{c('Info')
                .t`Your account has been successfully created. Please press the "Close" button to be taken back to the app.`}</Paragraph>
            <Href
                className="button button--primary button--large text-bold"
                url={`protonvpn://registered?username=${model.username}`}
                target="_top"
            >{c('Link').t`Close`}</Href>
        </div>
    );
};

MobileRedirectionStep.propTypes = {
    model: PropTypes.object.isRequired,
};

export default MobileRedirectionStep;
