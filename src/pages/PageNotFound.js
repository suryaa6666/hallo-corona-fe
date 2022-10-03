import { Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  document.title = `Page Not Found | Hallo Corona`;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100wh"
      h="100vh"
      bg="white"
    >
      <Image src="/assets/pagenotfound.svg" w="300px" />
      <Text color="black" fontSize={20} fontWeight="bold">
        Halaman tidak ditemukan!
      </Text>
      <Link to={'/'} style={{ color: 'black', textDecoration: 'underline' }}>
        Kembali ke halaman utama
      </Link>
    </Box>
  );
}

export default PageNotFound;
