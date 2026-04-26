import { useEffect, useState } from 'react';

export const useProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/properties');

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();
            setProperties(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    return { properties, loading, error };
};
