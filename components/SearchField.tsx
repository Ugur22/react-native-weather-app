import React from 'react'
import { Button, Icon, SearchBar } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSelectedLocation } from '../redux/slices/location/LocationSlice';

export default function SearchField() {

    const currentLocation = useSelector((state: RootState) => state.location.selectedLocation);

    const dispatch = useDispatch();

    const updateLocation = (text: string) => {
        dispatch(setSelectedLocation(text));
    };

    return (
        <>
            <SearchBar
                placeholder="try another city"
                onChangeText={updateLocation}
                value={currentLocation}
            />
        </>
    )
}
