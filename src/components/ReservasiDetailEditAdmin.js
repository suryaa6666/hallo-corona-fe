import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  Select,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingComponent from '../components/LoadingComponent';
import { API } from '../config/api';
import { golangDateConvert, milisToDate } from '../helpers/converter';
import { Success, Error } from '../helpers/toast';

function ReservasiDetailEditAdmin({ detailId, onClose, refetchDataReservasi }) {
  let {
    data: dataReservasiDetail,
    isLoading,
    refetch: refetchDataReservasiEdit,
  } = useQuery('reservasiDetailEditCaches', async () => {
    const response = await API.get(`/consultation/${detailId}`);
    console.log('data detail', response.data.data);
    return response.data.data;
  });

  const [dataReservasi, setDataReservasi] = useState({
    response: '',
    meetType: '',
    meetLink: '',
  });

  function handleChange(e) {
    setDataReservasi({
      ...dataReservasi,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmitEdit() {
    try {
      const consultationResponse = await API.patch(
        `/reply/${dataReservasiDetail.reply.id}`,
        {
          response: dataReservasi.response,
          meetLink: dataReservasi.meetLink,
          meetType: dataReservasi.meetType,
        }
      );
      console.log('consultation response', consultationResponse);
      Success({ message: `Berhasil mengubah tanggapan 🤩` });
      refetchDataReservasiEdit();
      refetchDataReservasi();
      onClose();
    } catch (err) {
      Error({ message: `Gagal mengubah tanggapan 😥` });
      console.log(err);
    }
  }

  async function handleSubmitStatus(status) {
    try {
      await API.patch(`/consultationstatus/${detailId}`, { status });
      status === 'success'
        ? Success({ message: `Berhasil menyetujui konsultasi user 🤩` })
        : Success({ message: `Berhasil membatalkan konsultasi user 🤩` });
      refetchDataReservasi();
      onClose();
    } catch (err) {
      Error({ message: `Status konsultasi gagal diubah 😥` });
      console.log(err);
    }
  }

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
                defaultValue={dataReservasiDetail.reply.response}
                name="response"
                onChange={handleChange}
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
                defaultValue={dataReservasiDetail.reply.meetType}
                name="meetType"
                onChange={handleChange}
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
                defaultValue={dataReservasiDetail.reply.meetLink}
                name="meetLink"
                onChange={handleChange}
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
                onClick={() => handleSubmitStatus('cancel')}
              >
                Cancel
              </Button>
              <Button
                bg="#0ACF83"
                py={2}
                px={4}
                mr={3}
                color="white"
                fontWeight={'bold'}
                _hover={{ backgroundColor: '#04915B' }}
                colorScheme="whatsapp"
                onClick={() => handleSubmitStatus('success')}
              >
                Approve
              </Button>
              <Button
                bg="orange"
                py={2}
                px={4}
                color="white"
                fontWeight={'bold'}
                _hover={{ bg: 'yellow.500' }}
                colorScheme="yellow"
                onClick={() => handleSubmitEdit()}
              >
                Edit Tanggapan
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default ReservasiDetailEditAdmin;
