import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import ReservasiDetailAdmin from '../components/ReservasiDetailAdmin';

function ReservasiDataAdmin() {
  const [status, setIsStatus] = useState('Live');
  const [selectedDetailId, setSelectedDetailId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            Reservasi Data
          </Text>
          <TableContainer my={10}>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama Lengkap</Th>
                  <Th>Subjek</Th>
                  <Th>Tanggal Komplain</Th>
                  <Th>Status</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Surya Ganteng</Td>
                  <Td>Sakit kepala</Td>
                  <Td>18 April 2022</Td>
                  <Td
                    color={
                      status === 'Pending'
                        ? 'yellow.500'
                        : status === 'Live'
                        ? 'whatsapp.500'
                        : 'red.500'
                    }
                  >
                    {status === 'Pending'
                      ? 'Waiting Approve Live Consultation'
                      : status === 'Live'
                      ? 'Waiting Live Consultation'
                      : 'Canceled'}{' '}
                  </Td>
                  <Td>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onOpen();
                        setSelectedDetailId(1);
                      }}
                    >
                      <Image
                        src="/assets/images/lens-icon.png"
                        w="25px"
                        h="25px"
                      />
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="100%">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={'#FF0742'} />
          <ModalBody py={5}>
            <ReservasiDetailAdmin detailId={selectedDetailId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReservasiDataAdmin;
