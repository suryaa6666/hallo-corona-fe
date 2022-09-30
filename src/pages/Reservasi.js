import { Box, Text, Input, Select, Textarea, Button } from '@chakra-ui/react';
import NavbarComponent from '../components/NavbarComponent';

function Artikel() {
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
        <Box w={'90%'} display="flex" flexDirection={'column'} my={10}>
          <Text fontWeight="bold" fontSize={'30px'} color="#FF6185">
            Reservasi Konsultasi
          </Text>
          <Box display="flex" flexDirection="column" py={5} w="100%">
            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Nama Lengkap
              </Text>
              <Input
                w="100%"
                h="30px"
                p={4}
                mt={2}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
              />
            </Box>
            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Nomor Telepon
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
              />
            </Box>
            <Box display="flex" w="100%" py={3} flexDirection="row">
              <Box display="flex" flex={3} py={3} flexDirection="column" mr={3}>
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Tanggal Lahir
                </Text>
                <Input
                  w="100%"
                  h="30px"
                  mt={2}
                  p={4}
                  bg="#E1E1E1"
                  borderWidth={'2px'}
                  borderColor="#B5B5B5"
                />
              </Box>

              <Box display="flex" flex={1} py={3} flexDirection="column" mr={3}>
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Umur
                </Text>
                <Input
                  w="100%"
                  h="30px"
                  mt={2}
                  p={4}
                  bg="#E1E1E1"
                  borderWidth={'2px'}
                  borderColor="#B5B5B5"
                />
              </Box>

              <Box display="flex" flex={2} py={3} flexDirection="column" mr={3}>
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Tinggi Badan
                </Text>
                <Input
                  w="100%"
                  h="30px"
                  mt={2}
                  p={4}
                  bg="#E1E1E1"
                  borderWidth={'2px'}
                  borderColor="#B5B5B5"
                />
              </Box>

              <Box display="flex" flex={2} py={3} flexDirection="column">
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Berat Badan
                </Text>
                <Input
                  w="100%"
                  h="30px"
                  mt={2}
                  p={4}
                  bg="#E1E1E1"
                  borderWidth={'2px'}
                  borderColor="#B5B5B5"
                />
              </Box>
            </Box>
            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Gender
              </Text>
              <Select
                placeholder="Pilih gender..."
                h="40px"
                mt={2}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
              >
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
              </Select>
            </Box>

            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Subjek
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
              />
            </Box>

            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Tanggal Konsultasi Langsung
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
              />
            </Box>

            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Deskripsi
              </Text>
              <Textarea
                placeholder="Deskripsikan kebutuhanmu untuk berkonsultasi dengan dokter..."
                w="100%"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
              />
            </Box>
          </Box>
          <Button
            bg="#FF6185"
            w="100%"
            h="50px"
            fontSize="20px"
            color="white"
            fontWeight="bold"
            colorScheme="pink"
            _hover={{ backgroundColor: '#e35979' }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Artikel;
