import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fontsource/open-sans/400.css';
import { UserContextProvider } from './context/userContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          bg: 'white',
          borderColor: '#B5B5B5',
        },
      },
    },
  },
});

const client = new QueryClient();

root.render(
  <StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </StrictMode>
);
