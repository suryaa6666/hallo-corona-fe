import { Box, HStack, Text } from '@chakra-ui/react';
import Jumbotron from '../components/Jumbotron';
import CardArticle from '../components/CardArticle';
import NavbarComponent from '../components/NavbarComponent';

function Home() {
  return (
    <>
      <NavbarComponent />
      <Box
        w={'100wh'}
        display={'flex'}
        flexDirection="column"
        pt={'80px'}
        alignItems="center"
      >
        <Jumbotron />
        <Text fontWeight="bold" fontSize={'30px'} color="#FF6185" mt={10}>
          Artikel Hari ini
        </Text>
        <Box w={'100%'} p={10}>
          {/* Card List */}
          <HStack
            wrap={'wrap'}
            display="flex"
            justifyContent={'center'}
            alignItems="center"
          >
            <CardArticle />
            <CardArticle />
            <CardArticle />
            <CardArticle />
            <CardArticle />
            <CardArticle />
          </HStack>
        </Box>
      </Box>
    </>
  );
}

export default Home;
