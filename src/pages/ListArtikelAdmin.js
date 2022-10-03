import {
  Box,
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { GrView } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import NavbarComponent from '../components/NavbarComponent';
import { API } from '../config/api';
import { golangDateConvert } from '../helpers/converter';
import { Success, Error } from '../helpers/toast';

function ListArtikelAdmin() {
  document.title = `List Artikel - Hallo Corona`;

  const {
    data: dataArticles,
    isLoading,
    refetch: refetchDataArtikel,
  } = useQuery('articlesDataCaches', async () => {
    const response = await API.get(`/articles`);
    console.log(response);
    return response.data.data;
  });

  const [selectedArtikelTitle, setSelectedArtikelTitle] = useState('');
  const [selectedArtikelId, setSelectedArtikelId] = useState();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const navigate = useNavigate();

  async function handleDeleteArtikel() {
    try {
      const response = await API.delete(`/article/${selectedArtikelId}`);
      console.log('response hapus', response);
      refetchDataArtikel();
      Success({ message: 'Berhasil menghapus artikel 😉' });
    } catch (err) {
      Error({ message: 'Gagal menghapus artikel 😥' });
    }
  }

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
                List Artikel
              </Text>
              <TableContainer my={10}>
                <Table variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Judul</Th>
                      <Th>Gambar</Th>
                      <Th>Author</Th>
                      <Th>Tanggal Dibuat</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataArticles
                      ?.slice()
                      .reverse()
                      .map((item, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{i + 1}</Td>
                            <Td>{item.title}</Td>
                            <Td>
                              <Image
                                src={item.image}
                                alt={item.image}
                                w="100px"
                                h="100px"
                                objectFit="cover"
                              />
                            </Td>
                            <Td>{item.user.fullName}</Td>
                            <Td>{golangDateConvert(item.createdAt)}</Td>
                            <Td>
                              <Box display="flex">
                                <Button
                                  variant="solid"
                                  onClick={() => {
                                    navigate(`/artikel/${item.id}`);
                                  }}
                                  w="50px"
                                  h="50px"
                                  mr={2}
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
                                    navigate(`/edit-artikel/${item.id}`);
                                  }}
                                  w="50px"
                                  h="50px"
                                  mr={2}
                                >
                                  <BiEdit
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
                                    onOpenDelete();
                                    setSelectedArtikelTitle(item.title);
                                    setSelectedArtikelId(item.id);
                                  }}
                                  w="50px"
                                  h="50px"
                                  mr={2}
                                >
                                  <BsTrash
                                    color={'#FF6185'}
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                    }}
                                  />
                                </Button>
                              </Box>
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Hapus artikel ini?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Judul : {selectedArtikelTitle}</ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onCloseDelete}>
                  Tutup
                </Button>
                <Button
                  variant="solid"
                  colorScheme={'red'}
                  onClick={() => {
                    handleDeleteArtikel();
                    onCloseDelete();
                  }}
                >
                  Yap!
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default ListArtikelAdmin;
