import ReactLoading from 'react-loading';
import { Box } from '@chakra-ui/react';

export default function LoadingComponent() {
  return (
    <Box
      bg="white"
      display="flex"
      w="100wh"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <ReactLoading
        type={'spinningBubbles'}
        color={'#FF6185'}
        height={100}
        width={100}
      />
    </Box>
  );
}
