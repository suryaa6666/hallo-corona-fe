import { Box, Button, Image, Text, Avatar } from '@chakra-ui/react';
import { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';

function Konsultasi() {
  const [isAnswered, setIsAnswered] = useState(true);

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
          <Text fontWeight="bold" fontSize={'30px'} color="#FF6185">
            Konsultasi
          </Text>
          <Box
            w={'100%'}
            display="flex"
            flexDirection={'column'}
            justifyContent="center"
            p={5}
            my={10}
            style={{ boxShadow: '1px 1px 30px 1px gainsboro' }}
            borderRadius={10}
          >
            <Box
              w={'100%'}
              display="flex"
              flexDirection="row"
              justifyContent={'center'}
              alignItems="center"
            >
              <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  size={'md'}
                  mr={2}
                  w={'75px'}
                  h={'75px'}
                  border="3px solid #FF6185"
                  src={
                    'https://i.pinimg.com/736x/b5/90/b5/b590b514aaa50668125f87a200e8854a.jpg'
                  }
                />
              </Box>
              <Box display="flex" flexDirection="column" flex={5}>
                <Text fontWeight="bold" fontSize="25px" color="black">
                  Sakit kepala berlebih
                </Text>
                <Text fontSize="15px" color="black">
                  28 September 2022
                </Text>
                <Text fontSize="15px" color="black">
                  Keluhan : dok, kenapa saya tampan dan banyak yang mau, hhe.
                </Text>
              </Box>
              <Box flex={1} h="75px">
                <Text fontWeight="bold" fontSize="15px" color="black">
                  29 September 2022
                </Text>
              </Box>
            </Box>
            <hr
              style={{
                width: '100%',
                height: '2px',
                color: 'gainsboro',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={3}
            >
              {isAnswered ? (
                <>
                  <Box
                    w={'100%'}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      flex={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Avatar
                        size={'md'}
                        mr={2}
                        w={'75px'}
                        h={'75px'}
                        border="3px solid #FF6185"
                        src={
                          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deezer.com%2Fid%2Fartist%2F147036902&psig=AOvVaw3lyIPeEwDlTX7z8d7Jo3Hm&ust=1664452580173000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOiuwJm3t_oCFQAAAAAdAAAAABAD'
                        }
                      />
                    </Box>
                    <Box display="flex" flexDirection="column" flex={5}>
                      <Text fontSize="15px" color="black">
                        Hi, Surya Gans hari ini adalah jadwal konsultasi kamu,
                        silahkan klik tombol berikut untuk melakukan konsultasi
                        langsung dengan saya :
                      </Text>
                      <Button
                        bg="#FFF"
                        mt={3}
                        w="200px"
                        borderWidth={2}
                        borderColor={'#FF6185'}
                        h="50px"
                        fontSize="20px"
                        fontWeight="bold"
                        _hover={{ backgroundColor: '#e6e6e6' }}
                        color="#FF6185"
                      >
                        <Image
                          src="/assets/images/gmeet-icon.png"
                          w="50px"
                          h="50px"
                          objectFit="contain"
                        />
                        Google Meet
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <Text fontWeight="bold" fontSize="20px" color="#6C6C6C">
                  Waiting For Reply
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Konsultasi;
