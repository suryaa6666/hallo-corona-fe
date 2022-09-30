import { Box, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Jumbotron() {
  return (
    <Box w={'100%'} display={'flex'} flexDirection="column" position="relative">
      <Image
        src="/assets/images/jumbotron.png"
        w={'100%'}
        h={'350px'}
        style={{ pointerEvents: 'none' }}
      />
      <Link to="/reservasi">
        <Button
          bg={'#FFF'}
          px={10}
          py={10}
          color={'#FF6185'}
          fontWeight={'bold'}
          borderWidth={2}
          borderColor={'#FF6185'}
          position="absolute"
          bottom="35px"
          left="100px"
          mx={2}
          fontSize="20px"
          _hover={{ backgroundColor: '#e6e6e6' }}
        >
          <Image
            src="/assets/images/dokter-icon.png"
            w={'50px'}
            h={'50px'}
            mr={'20px'}
            pointerEvents="none"
          />
          Konsultasi Dengan Dokter
        </Button>
      </Link>
    </Box>
  );
}

export default Jumbotron;
