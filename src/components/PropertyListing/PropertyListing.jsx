import React from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';
import { useProperties } from '../../hooks/useProperties';

const PropertyListing = () => {
    const { properties, loading, error } = useProperties();

    if (loading) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Failed to load properties!</>;
    }

    if (properties.length === 0) {
        return <>No properties found!</>;
    }

    return (
        <ul className="PropertyListing">
            {properties.map((property, index) => (
                <li key={index}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
