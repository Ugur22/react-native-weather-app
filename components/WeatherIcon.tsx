import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface WeatherIconProps {
    condition: string;
}

const WeatherIcon = ({ condition }: WeatherIconProps) => {
    const renderIcon = () => {
        switch (condition) {
            case 'rain':
                return <Ionicons name="rainy" size={80} color="blue" />;
            case 'Clouds':
                return <Ionicons name="cloudy" size={80} color="#658DE4" />;
            case 'Clear':
                return <Ionicons name="sunny" size={80} color="orange" />;
        }
    };

    return renderIcon();
};

export default WeatherIcon;