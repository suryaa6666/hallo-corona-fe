import { Box, HStack, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import CardArticle from '../components/CardArticle';
import Jumbotron from '../components/Jumbotron';
import LoadingComponent from '../components/LoadingComponent';
import NavbarComponent from '../components/NavbarComponent';
import { API } from '../config/api';

function Home() {
  document.title = `Hallo Corona - Artikel dan Konsultasi Corona Terbaik`;

  const { data: dataArticles, isLoading } = useQuery(
    'articlesCache',
    async () => {
      const response = await API.get('/articles');
      console.log(response);
      return response.data.data;
    }
  );

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
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
                {dataArticles?.map((item, i) => (
                  <CardArticle
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    description={item.description}
                    category={item.category}
                    key={i}
                  />
                ))}
              </HStack>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Home;
