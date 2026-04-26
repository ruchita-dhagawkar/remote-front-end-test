import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';
import { useProperties } from '../../../hooks/useProperties';

jest.mock('../../../hooks/useProperties');

describe('PropertyListing', () => {
    it('should render property cards when data loads', async () => {
        useProperties.mockReturnValue({
            properties: [
                {
                    id: 73864112,
                    bedrooms: 3,
                    summary: 'Property 1 Situated moments from the River Thames...',
                    displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
                    propertyType: 'Flat',
                    price: 1950000,
                    branchName: 'M2 Property, London',
                    propertyUrl: '/property-for-sale/property-73864112.html',
                    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
                    propertyTitle: '3 bedroom flat for sale',
                    mainImage: 'https://example.com/image.jpg',
                },
                {
                    id: 73864113,
                    bedrooms: 4,
                    summary: 'Property 2 Situated moments from the River Thames...',
                    displayAddress: '2 CHEYNE WALK, CHELSEA, SW3',
                    propertyType: 'Flat',
                    price: 2050000,
                    branchName: 'M2 Property, London',
                    propertyUrl: '/property-for-sale/property-73864112.html',
                    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
                    propertyTitle: '4 bedroom flat for sale',
                    mainImage: 'https://example.com/image.jpg',
                },
            ],
            loading: false,
            error: null,
        });
        render(<PropertyListing />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(2);
    });

    it('should show loading state', async () => {
        useProperties.mockReturnValue({
            properties: [],
            loading: true,
            error: null,
        });
        render(<PropertyListing />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should show error state', async () => {
        useProperties.mockReturnValue({
            properties: [],
            loading: false,
            error: new Error('API failed'),
        });
        render(<PropertyListing />);
        expect(screen.getByText('Failed to load properties!')).toBeInTheDocument();
    });

    it('should show empty state', async () => {
        useProperties.mockReturnValue({
            properties: [],
            loading: false,
            error: null,
        });
        render(<PropertyListing />);
        expect(screen.getByText('No properties found!')).toBeInTheDocument();
    });
});
