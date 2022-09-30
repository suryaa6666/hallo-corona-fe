import { Badge, Box, Image, Text } from '@chakra-ui/react';
import NavbarComponent from '../components/NavbarComponent';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import { useParams } from 'react-router-dom';

function Artikel() {
  const params = useParams();
  const { id } = params;

  const { data: dataArticle } = useQuery('articleCache', async () => {
    const response = await API.get(`/article/${id}`);
    console.log(response);
    return response.data.data;
  });

  function golangDateConvert(datestr) {
    let convertMonth = month => {
      switch (month) {
        case 0:
          return 'Januari';
        case 1:
          return 'Februari';
        case 2:
          return 'Maret';
        case 3:
          return 'April';
        case 4:
          return 'Mei';
        case 5:
          return 'Juni';
        case 6:
          return 'Juli';
        case 7:
          return 'Agustus';
        case 8:
          return 'September';
        case 9:
          return 'Oktober';
        case 10:
          return 'November';
        case 11:
          return 'Desember';
      }
    };

    let datesplit = datestr.split('-');
    let year = datesplit[0];
    let month = convertMonth(parseInt(datesplit[1]) - 1);
    let date = datesplit[2].split('T')[0];

    return `${date} ${month} ${year}`;
  }

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
        <Box w={'80%'} display="flex" flexDirection={'column'} my={10}>
          <Text fontWeight="bold" fontSize={'30px'} color="black" mt="5px">
            {dataArticle?.title}
          </Text>
          <Text fontSize={'15px'} color="#6C6C6C" mt="5px">
            {golangDateConvert(dataArticle?.createdAt)}
          </Text>
          <Box
            display="flex"
            w="100%"
            flexDirection="row"
            alignItems={'center'}
            mt="5px"
          >
            <Text fontSize={'15px'} color="#6C6C6C" mr={2}>
              Author :
            </Text>
            <Text fontSize={'15px'} color="#FF6185">
              {dataArticle?.user?.fullName}
            </Text>
          </Box>
          <Box w={'100%'} boxShadow="md" mt={5} p={10}>
            <Image
              src={
                dataArticle?.image
                  ? dataArticle.image
                  : `/assets/images/image-placeholder.png`
              }
              w="100%"
              h="400px"
              objectFit="cover"
            />
            {/* Category Section */}
            <Box display="flex" flexDirection="row" w="100%" py={10}>
              <Badge
                variant="outline"
                borderRadius={'20px'}
                borderColor="#6C6C6C"
                p={2}
                mr={3}
                mt="5px"
              >
                Category
              </Badge>
            </Box>
            {/* Article Section */}
            <Text>{dataArticle?.description}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Artikel;
