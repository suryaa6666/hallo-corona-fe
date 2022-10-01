import { Avatar, Box, Button, Image, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import NavbarComponent from '../components/NavbarComponent';
import { API } from '../config/api';
import { golangDateConvert, milisToDate } from '../helpers/converter';

function Konsultasi() {
  const { data: dataConsultation, isLoading } = useQuery(
    'consultationsCache',
    async () => {
      const response = await API.get('/consultations');
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
            <Box w={'80%'} display="flex" flexDirection={'column'} my={10}>
              <Text fontWeight="bold" fontSize={'30px'} color="#FF6185">
                Konsultasi
              </Text>
              {dataConsultation ? (
                <>
                  {dataConsultation
                    .slice()
                    .reverse()
                    .map((item, i) => {
                      return (
                        <Box
                          w={'100%'}
                          display="flex"
                          flexDirection={'column'}
                          justifyContent="center"
                          p={5}
                          my={5}
                          style={{ boxShadow: '1px 1px 30px 1px gainsboro' }}
                          borderRadius={10}
                          key={i}
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
                                  item.user.image
                                    ? item.user.image
                                    : item.user.gender.toLowerCase() === 'male'
                                    ? `/assets/images/male-userimage-placeholder.jpg`
                                    : `/assets/images/female-userimage-placeholder.jpg`
                                }
                              />
                            </Box>
                            <Box display="flex" flexDirection="column" flex={5}>
                              <Text
                                fontWeight="bold"
                                fontSize="25px"
                                color="black"
                              >
                                {item.subject}
                              </Text>
                              <Text fontSize="15px" color="black">
                                {milisToDate(item.liveConsultation)}
                              </Text>
                              <Text fontSize="15px" color="black">
                                Keluhan : {item.description}
                              </Text>
                            </Box>
                            <Box flex={1} h="75px">
                              <Text
                                fontWeight="bold"
                                fontSize="15px"
                                color="black"
                              >
                                {golangDateConvert(item.createdAt)}
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
                            {item.reply.id !== 0 ? (
                              item.status.toLowerCase() === 'cancel' ? (
                                <Text
                                  fontWeight="bold"
                                  fontSize="20px"
                                  color="#6C6C6C"
                                >
                                  Permintaan anda tidak disetujui ❌
                                </Text>
                              ) : (
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
                                          item.reply.user.image
                                            ? item.reply.user.image
                                            : item.reply.user.gender.toLowerCase() ===
                                              'male'
                                            ? `/assets/images/male-userimage-placeholder.jpg`
                                            : `/assets/images/female-userimage-placeholder.jpg`
                                        }
                                      />
                                    </Box>
                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      flex={5}
                                    >
                                      <Text fontSize="15px" color="black">
                                        {item.reply.response}
                                      </Text>
                                      {item.reply.meetType === 'Google Meet' ? (
                                        <Button
                                          bg="#FFF"
                                          mt={3}
                                          w="200px"
                                          borderWidth={2}
                                          borderColor={'#FF6185'}
                                          h="50px"
                                          fontSize="20px"
                                          fontWeight="bold"
                                          _hover={{
                                            backgroundColor: '#e6e6e6',
                                          }}
                                          color="#FF6185"
                                          onClick={() => {
                                            window.open(
                                              item.reply.meetLink.includes(
                                                'http://'
                                              )
                                                ? `${item.reply.meetLink}`
                                                : item.reply.meetLink.includes(
                                                    'https://'
                                                  )
                                                ? `${item.reply.meetLink}`
                                                : `https://${item.reply.meetLink}`,
                                              '_blank'
                                            );
                                          }}
                                        >
                                          <Image
                                            src="/assets/images/gmeet-icon.png"
                                            w="50px"
                                            h="50px"
                                            objectFit="contain"
                                          />
                                          Google Meet
                                        </Button>
                                      ) : item.reply.meetType === 'Zoom' ? (
                                        <Button
                                          bg="#FFF"
                                          mt={3}
                                          w="200px"
                                          borderWidth={2}
                                          borderColor={'#FF6185'}
                                          h="50px"
                                          fontSize="20px"
                                          fontWeight="bold"
                                          _hover={{
                                            backgroundColor: '#e6e6e6',
                                          }}
                                          color="#FF6185"
                                          onClick={() => {
                                            window.open(
                                              item.reply.meetLink.includes(
                                                'http://'
                                              )
                                                ? `${item.reply.meetLink}`
                                                : item.reply.meetLink.includes(
                                                    'https://'
                                                  )
                                                ? `${item.reply.meetLink}`
                                                : `https://${item.reply.meetLink}`,
                                              '_blank'
                                            );
                                          }}
                                        >
                                          <Image
                                            src="/assets/images/zoom-icon.png"
                                            w="35px"
                                            h="35px"
                                            mr={2}
                                            objectFit="contain"
                                          />
                                          Zoom
                                        </Button>
                                      ) : (
                                        <Button
                                          bg="#FFF"
                                          mt={3}
                                          w="200px"
                                          borderWidth={2}
                                          borderColor={'#FF6185'}
                                          h="50px"
                                          fontSize="20px"
                                          fontWeight="bold"
                                          _hover={{
                                            backgroundColor: '#e6e6e6',
                                          }}
                                          color="#FF6185"
                                          onClick={() => {
                                            window.open(
                                              item.reply.meetLink.includes(
                                                'http://'
                                              )
                                                ? `${item.reply.meetLink}`
                                                : item.reply.meetLink.includes(
                                                    'https://'
                                                  )
                                                ? `${item.reply.meetLink}`
                                                : `https://${item.reply.meetLink}`,
                                              '_blank'
                                            );
                                          }}
                                        >
                                          <Image
                                            src="/assets/images/external-icon.png"
                                            w="25px"
                                            h="25px"
                                            mr={2}
                                            objectFit="contain"
                                          />
                                          Meet
                                        </Button>
                                      )}
                                    </Box>
                                  </Box>
                                </>
                              )
                            ) : (
                              <Text
                                fontWeight="bold"
                                fontSize="20px"
                                color="#6C6C6C"
                              >
                                Menunggu Balasan ⌛
                              </Text>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                </>
              ) : (
                <>
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
                    <Text
                      fontWeight="bold"
                      fontSize="20px"
                      color="#6C6C6C"
                      textAlign={'center'}
                    >
                      Tidak Ada Data Konsultasi 😄
                    </Text>
                    <Link to="/reservasi" display="flex" w="100%">
                      <Button
                        bg="#FFF"
                        mt={3}
                        borderWidth={2}
                        borderColor={'#FF6185'}
                        h="50px"
                        w="100%"
                        fontSize="20px"
                        fontWeight="bold"
                        _hover={{ backgroundColor: '#e6e6e6' }}
                        color="#FF6185"
                      >
                        Buat Reservasi Konsultasi
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Konsultasi;
