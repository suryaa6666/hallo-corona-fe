import { Box, Button, Image, Text } from '@chakra-ui/react';
import NavbarComponent from '../components/NavbarComponent';

function Profil() {
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
        <Box
          w={'80%'}
          display="flex"
          flexDirection={'row'}
          my={10}
          style={{ boxShadow: '1px 1px 30px 1px gainsboro' }}
          borderRadius={10}
        >
          <Box display="flex" flexDirection={'column'} p={10} flex={2}>
            <Text fontWeight={'bold'} fontSize="25px">
              Personal Info
            </Text>
            <Box display="flex" mt={5} flexDirection="row">
              <Box
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/assets/images/name-icon.png"
                  w="30px"
                  h="30px"
                  mr={3}
                  objectFit="contain"
                />
                <Box display="flex" flexDirection={'column'}>
                  <Text fontSize="15px" fontWeight="bold" color="black">
                    Surya Gans
                  </Text>
                  <Text fontSize="10px" color="#8A8C90">
                    Nama Lengkap
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box display="flex" mt={5} flexDirection="row">
              <Box
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/assets/images/email-icon.png"
                  w="30px"
                  h="30px"
                  mr={3}
                  objectFit="contain"
                />
                <Box display="flex" flexDirection={'column'}>
                  <Text fontSize="15px" fontWeight="bold" color="black">
                    suryagans@gmail.com
                  </Text>
                  <Text fontSize="10px" color="#8A8C90">
                    Email
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box display="flex" mt={5} flexDirection="row">
              <Box
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/assets/images/status-icon.png"
                  w="30px"
                  h="30px"
                  mr={3}
                  objectFit="contain"
                />
                <Box display="flex" flexDirection={'column'}>
                  <Text fontSize="15px" fontWeight="bold" color="black">
                    Pasien
                  </Text>
                  <Text fontSize="10px" color="#8A8C90">
                    Status
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box display="flex" mt={5} flexDirection="row">
              <Box
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/assets/images/gender-icon.png"
                  w="30px"
                  h="30px"
                  mr={3}
                  objectFit="contain"
                />
                <Box display="flex" flexDirection={'column'}>
                  <Text fontSize="15px" fontWeight="bold" color="black">
                    Pria
                  </Text>
                  <Text fontSize="10px" color="#8A8C90">
                    Gender
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box display="flex" mt={5} flexDirection="row">
              <Box
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/assets/images/phone-icon.png"
                  w="30px"
                  h="30px"
                  mr={3}
                  objectFit="contain"
                />
                <Box display="flex" flexDirection={'column'}>
                  <Text fontSize="15px" fontWeight="bold" color="black">
                    089514043621
                  </Text>
                  <Text fontSize="10px" color="#8A8C90">
                    No. Telepon
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box display="flex" mt={5} flexDirection="row">
              <Box
                display="flex"
                flexDirection={'row'}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="/assets/images/location-icon.png"
                  w="30px"
                  h="30px"
                  mr={3}
                  objectFit="contain"
                />
                <Box display="flex" flexDirection={'column'}>
                  <Text fontSize="15px" fontWeight="bold" color="black">
                    Jln. Jantera No. 04 Kalimanah
                  </Text>
                  <Text fontSize="10px" color="#8A8C90">
                    Alamat
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Gambar Profil */}
          <Box flex={1} my={10} mr={10}>
            <Image
              src="/assets/images/image-placeholder.png"
              w="100%"
              h="350px"
              objectFit="cover"
            />
            <Button
              bg="#FF6185"
              mt={5}
              w="100%"
              h="50px"
              fontSize="20px"
              color="white"
              fontWeight="bold"
              H
              colorScheme="pink"
            >
              Ganti Foto Profil
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Profil;
