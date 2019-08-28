import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ObserverSections } from 'react-components';
import PlansSection from './PlansSection/PlansSection';
import EmailSection from './EmailSection/EmailSection';
import PaymentDetailsSection from './PaymentDetailsSection/PaymentDetailsSection';
import SelectedPlan from './SelectedPlan/SelectedPlan';
import FreeSignupSection from './FreeSignupSection/FreeSignupSection';
import { PLANS } from 'proton-shared/lib/constants';
import useSignup from '../useSignup';

const PlanStep = ({ onConfirm }) => {
    const [isNudgeSuccessful, setNudgeSuccessful] = useState(false); // If successfully convinced to purchase plus plan
    const {
        model: { email },
        updateModel,
        selectedPlan
    } = useSignup();

    // ! TODO: do not allow payment without a valid email

    const handleChangePlan = (planName) => {
        if (planName === PLANS.FREE && isNudgeSuccessful) {
            setNudgeSuccessful(false);
        }
        updateModel({ planName });
    };

    const handleUpgradeClick = () => {
        updateModel({ planName: PLANS.VPNPLUS });
        setNudgeSuccessful(true);
    };

    const handleContinueClick = () => {
        if (isNudgeSuccessful) {
            location.replace('/signup#payment');
        } else if (email) {
            onConfirm(); // No payment details for free user
        }
        // TODO: focus on email and show error of no email
    };

    return (
        <ObserverSections>
            <PlansSection onSelect={handleChangePlan} id="plan" />
            <div className="flex" id="details">
                <div className="flex-item-fluid">
                    <div className="container-section-sticky-section" id="email">
                        <EmailSection />
                        {(selectedPlan.planName === PLANS.FREE || isNudgeSuccessful) && (
                            <FreeSignupSection
                                onContinue={handleContinueClick}
                                onUpgrade={handleUpgradeClick}
                                isPlusActive={isNudgeSuccessful}
                            />
                        )}
                    </div>
                    {selectedPlan.planName !== PLANS.FREE && (
                        <div className="container-section-sticky-section" id="payment">
                            <PaymentDetailsSection onPaymentDone={onConfirm} />
                        </div>
                    )}
                </div>
                <SelectedPlan />
            </div>
        </ObserverSections>
    );
};

PlanStep.propTypes = {
    onConfirm: PropTypes.func.isRequired
};

export default PlanStep;
