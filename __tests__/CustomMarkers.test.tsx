// CustomMarker.test.js
import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import CustomMarker from '../src/components/Map/CustomMarkers';

// Mock dependencies
jest.mock('react-native-geocoding', () => ({
  from: jest.fn(() =>
    Promise.resolve({
      results: [
        {
          formatted_address:
            '19 Abudu Odusanya St, Olowora, Lagos 105102, Lagos, Nigeria',
        },
      ],
    }),
  ),
}));

describe('CustomMarker', () => {
  it('displays the correct address after geocoding', async () => {
    await waitFor(() =>
      render(
        <CustomMarker
          coordinates={{
            latitude: 6.63034117316177,
            longitude: 3.385923247484037,
          }}
          onPress={() => {}}
        />,
      ),
    );
  });

  // Add more tests as needed for other functionalities
});
