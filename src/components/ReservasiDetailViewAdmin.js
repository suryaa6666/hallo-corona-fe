import {
  Box,
  Button,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import { golangDateConvert, milisToDate } from '../helpers/converter';
import LoadingComponent from './LoadingComponent';

function ReservasiDetailViewAdmin({ detailId }) {
  let { data: dataReservasiDetail, isLoading } = useQuery(
    'reservasiDetailViewCaches',
    async () => {
      const response = await API.get(`/consultation/${detailId}`);
      console.log('data detail', response.data.data);
      return response.data.data;
    }
  );

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Box
            w={'100wh'}
            display={'flex'}
            flexDirection="column"
            alignItems="center"
          >
            <Box w={'90%'} display="flex" flexDirection={'row'} my={10}>
              <Box display="flex" flexDirection="column" flex={3} mr={5}>
                <Text fontWeight="bold" fontSize={'25px'} color="black">
                  {dataReservasiDetail?.subject}
                </Text>
                <Text fontSize={'20px'} color="#6C6C6C" mt={5}>
                  {dataReservasiDetail?.description}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" flex={1} mt={5}>
                {/* timeline */}
                <Box display="flex" flexDirection={'row'} mb={5}>
                  <Box
                    borderRadius={'100%'}
                    borderWidth="2px"
                    borderColor="#FF6185"
                    bg="white"
                    w="20px"
                    h="20px"
                    mt={1}
                    mr={2}
                  ></Box>
                  <Box display="flex" flexDirection="column" flex={1}>
                    <Text fontWeight="bold" fontSize={'20px'} color="black">
                      Tanggal Komplain
                    </Text>
                    <Text fontWeight="bold" fontSize={'15px'} color="#6C6C6C">
                      {golangDateConvert(dataReservasiDetail?.createdAt)}
                    </Text>
                  </Box>
                </Box>

                <Box display="flex" flexDirection={'row'} mb={5}>
                  <Box
                    borderRadius={'100%'}
                    borderWidth="2px"
                    borderColor="#FF6185"
                    bg="#FF6185"
                    w="20px"
                    h="20px"
                    mt={1}
                    mr={2}
                  ></Box>
                  <Box display="flex" flexDirection="column" flex={1}>
                    <Text fontWeight="bold" fontSize={'20px'} color="black">
                      Konsultasi Langsung
                    </Text>
                    <Text fontWeight="bold" fontSize={'15px'} color="#6C6C6C">
                      {milisToDate(dataReservasiDetail?.liveConsultation)}
                    </Text>
                  </Box>
                </Box>
                {/* timeline */}
              </Box>
            </Box>
            <TableContainer mb={5} w="90%">
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Nama Lengkap</Th>
                    <Th>Gender</Th>
                    <Th>No. Telepon</Th>
                    <Th>Umur</Th>
                    <Th>Tinggi Badan</Th>
                    <Th>Berat Badan</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{dataReservasiDetail?.fullName}</Td>
                    <Td>{dataReservasiDetail?.gender}</Td>
                    <Td>{dataReservasiDetail?.phone}</Td>
                    <Td>{dataReservasiDetail?.age}</Td>
                    <Td>{dataReservasiDetail?.height}</Td>
                    <Td>{dataReservasiDetail?.weight}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Box display="flex" mb={5} flexDirection="column" w="90%">
              <Text fontWeight={'bold'} fontSize="20px">
                Berikan Tanggapan
              </Text>
              <Textarea
                placeholder="Tanggapan..."
                w="100%"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                value={dataReservasiDetail?.reply?.response}
                disabled
              />
            </Box>
            <Box display="flex" mb={5} flexDirection="column" w="90%">
              <Text fontWeight={'bold'} fontSize="20px">
                Tipe Meet
              </Text>
              <Select
                placeholder="Pilih tipe meet..."
                h="40px"
                mt={2}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                value={dataReservasiDetail?.reply?.meetType}
                disabled
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Other">Lainnya</option>
              </Select>
            </Box>
            <Box display="flex" mb={5} flexDirection="column" w="90%">
              <Text fontWeight={'bold'} fontSize="20px">
                Link Meet
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                value={dataReservasiDetail?.reply?.meetLink}
                disabled
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" w="90%">
              <Button
                bg="#FF0742"
                py={2}
                px={4}
                color="white"
                fontWeight={'bold'}
                colorScheme="red"
                mr={3}
                _hover={{ backgroundColor: '#BD022E' }}
                disabled
              >
                Cancel
              </Button>
              <Button
                bg="#0ACF83"
                py={2}
                px={4}
                color="white"
                fontWeight={'bold'}
                _hover={{ backgroundColor: '#04915B' }}
                colorScheme="whatsapp"
                disabled
              >
                Approve
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default ReservasiDetailViewAdmin;
