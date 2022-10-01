import {
  Box,
  Button, Modal,
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
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiEdit, BiSearch } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { useQuery } from 'react-query';
import LoadingComponent from '../components/LoadingComponent';
import NavbarComponent from '../components/NavbarComponent';
import ReservasiDetailAdmin from '../components/ReservasiDetailAdmin';
import ReservasiDetailEditAdmin from '../components/ReservasiDetailEditAdmin';
import ReservasiDetailViewAdmin from '../components/ReservasiDetailViewAdmin';
import { API } from '../config/api';
import { golangDateConvert } from '../helpers/converter';

function ReservasiDataAdmin() {
  const [selectedDetailId, setSelectedDetailId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    data: dataReservasi,
    isLoading,
    refetch: refetchDataReservasi,
  } = useQuery('reservationDataCache', async () => {
    const response = await API.get(`/consultations`);
    console.log(response);
    return response.data.data;
  });

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
                Reservasi Data
              </Text>
              <TableContainer my={10}>
                <Table variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Users</Th>
                      <Th>Subjek</Th>
                      <Th>Tanggal Komplain</Th>
                      <Th>Status</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataReservasi
                      ?.slice()
                      .reverse()
                      .map((item, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{i + 1}</Td>
                            <Td>{item.user.fullName}</Td>
                            <Td>{item.subject}</Td>
                            <Td>{golangDateConvert(item.createdAt)}</Td>
                            <Td
                              color={
                                item.status.toLowerCase() === 'pending'
                                  ? 'yellow.500'
                                  : item.status.toLowerCase() === 'success'
                                  ? 'whatsapp.500'
                                  : 'red.500'
                              }
                            >
                              {item.status.toLowerCase() === 'pending'
                                ? 'Waiting Approve Live Consultation'
                                : item.status.toLowerCase() === 'success'
                                ? 'Waiting Live Consultation'
                                : 'Canceled'}
                            </Td>
                            <Td>
                              {item.status.toLowerCase() === 'pending' ? (
                                <Button
                                  variant="solid"
                                  onClick={() => {
                                    onOpen();
                                    setSelectedDetailId(item.id);
                                  }}
                                  w="50px"
                                  h="50px"
                                >
                                  <BiSearch
                                    color={'#FF6185'}
                                    style={{ width: '100px', height: '100px' }}
                                  />
                                </Button>
                              ) : (
                                <Box display="flex">
                                  <Button
                                    variant="solid"
                                    onClick={() => {
                                      onOpenView();
                                      setSelectedDetailId(item.id);
                                    }}
                                    w="50px"
                                    h="50px"
                                  >
                                    <GrView
                                      color={'#FF6185'}
                                      style={{
                                        width: '100px',
                                        height: '100px',
                                      }}
                                    />
                                  </Button>
                                  <Button
                                    variant="solid"
                                    onClick={() => {
                                      onOpenEdit();
                                      setSelectedDetailId(item.id);
                                    }}
                                    w="50px"
                                    h="50px"
                                  >
                                    <BiEdit
                                      color={'#FF6185'}
                                      style={{
                                        width: '100px',
                                        height: '100px',
                                      }}
                                    />
                                  </Button>
                                </Box>
                              )}
                            </Td>
                          </Tr>
                        );
                      })}
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
                <ReservasiDetailAdmin
                  detailId={selectedDetailId}
                  onClose={onClose}
                  refetchDataReservasi={refetchDataReservasi}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpenView} onClose={onCloseView} size="100%">
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton color={'#FF0742'} />
              <ModalBody py={5}>
                <ReservasiDetailViewAdmin
                  detailId={selectedDetailId}
                  onClose={onCloseView}
                  refetchDataReservasi={refetchDataReservasi}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size="100%">
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton color={'#FF0742'} />
              <ModalBody py={5}>
                <ReservasiDetailEditAdmin
                  detailId={selectedDetailId}
                  onClose={onCloseEdit}
                  refetchDataReservasi={refetchDataReservasi}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default ReservasiDataAdmin;
