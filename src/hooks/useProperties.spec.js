import { renderHook, waitFor } from '@testing-library/react';
import { useProperties } from './useProperties';

describe('useProperties', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('fetches properties successfully', async () => {
        const mockData = [{ id: 1, name: 'Test Property' }];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const { result } = renderHook(() => useProperties());

        await waitFor(() => {
            expect(result.current.properties).toEqual(mockData);
        });

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('handles fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result } = renderHook(() => useProperties());

        await waitFor(() => {
            expect(result.current.error).toBeTruthy();
        });
    });

    it('handles non-OK response', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        const { result } = renderHook(() => useProperties());

        await waitFor(() => {
            expect(result.current.error).toBeTruthy();
        });
    });
});
