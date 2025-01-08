import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Service', value: 'item1' },
        { label: 'Food', value: 'item2' },
        { label: 'Beer', value: 'item3' },
        { label: 'Flower', value: 'item4' },
        { label: 'Super Market', value: 'item5' },
    ]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    );
};

export default DropDown;
