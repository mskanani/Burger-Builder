import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [ // Array of controls. Only for convinience
    { label: 'Meat',     type: 'meat' },
    { label: 'Cheese',   type: 'cheese' },
    { label: 'Salad',    type: 'salad' },
    { label: 'Mushroom', type: 'mushroom' },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    abel={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)} />
            ))}
        </div>
    );
}

export default buildControls