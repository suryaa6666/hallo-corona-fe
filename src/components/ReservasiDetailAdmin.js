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
} from '@chakra-ui/react';
import { useState } from 'react';

function ReservasiDetailAdmin({ detailId }) {
  return (
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
              Sakit kepala berlebih
            </Text>
            <Text fontSize={'20px'} color="#6C6C6C" mt={5}>
              Dok kenapa ya disetiap malam kepala saya suka sakit kepa berlebih
              terlebih lagi kalau tidak mempunyai uang lalu terkadang
              tenggorokan saya suka sakit gitu dok, dan masih banyak lagi yang
              lain nya dok segera di response dok ya kapan kira-kira bisa
              konsultasinya terimakasih
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
                  28 September 2022
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
                  29 September 2022
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
                <Td>Surya Ganteng</Td>
                <Td>Pria</Td>
                <Td>089514043621</Td>
                <Td>19</Td>
                <Td>170</Td>
                <Td>50</Td>
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
          >
            Approve
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ReservasiDetailAdmin;
