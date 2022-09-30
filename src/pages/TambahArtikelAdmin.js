import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import LoadingComponent from '../components/LoadingComponent';
import NavbarComponent from '../components/NavbarComponent';
import { API } from '../config/api';
import { Error, Success } from '../helpers/toast';

// buat menampung category id yang ke check
let categoryId = [];

function TambahArtikelAdmin() {
  const [preview, setPreview] = useState(null);
  const [dataArtikel, setDataArtikel] = useState({
    title: '',
    description: '',
    image: '',
  });

  const hiddenFileInput = useRef(null);

  function handleClickFileInput(e) {
    hiddenFileInput.current.click();
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      let image = URL.createObjectURL(e.target.files[0]);
      setPreview(image);
    }

    setDataArtikel({
      ...dataArtikel,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });
  }

  function handleChangeCategory(e, id) {
    let isChecked = e.target.checked;

    if (isChecked) {
      return categoryId.push(id);
    }

    let index = categoryId.indexOf(id);
    categoryId.splice(index, 1);
  }

  async function handleSubmit() {
    console.log('isinya category ID', categoryId);
    try {
      let formData = new FormData();
      formData.set('title', dataArtikel?.title);
      formData.set('description', dataArtikel?.description);
      formData.set('image', dataArtikel?.image, dataArtikel?.image.name);
      formData.set('categoryId', categoryId);
      const response = await API.post('/article', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      Success({ message: `Berhasil menambahkan artikel 🤩` });
      console.log(response);
    } catch (err) {
      Error({ message: `Gagal menambahkan artikel 😥` });
      console.log(err);
    }
  }

  let { data: dataCategories, isLoading } = useQuery(
    'categoryCache',
    async () => {
      const response = await API.get('/categories');
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
            <Box w={'90%'} display="flex" flexDirection={'column'} my={10}>
              <Text fontWeight="bold" fontSize={'30px'} color="#FF6185">
                Tambah Artikel
              </Text>
              <Box display="flex" flexDirection="column" py={5} w="100%">
                <Box display="flex" w="100%" py={3} flexDirection="column">
                  <Text fontWeight="bold" fontSize={'15px'} color="#000">
                    Judul
                  </Text>
                  <Input
                    w="100%"
                    h="30px"
                    p={4}
                    mt={2}
                    bg="#E1E1E1"
                    borderWidth={'2px'}
                    borderColor="#B5B5B5"
                    name="title"
                    onChange={handleChange}
                  />
                </Box>
                <Box display="flex" w="100%" py={3} flexDirection="column">
                  <Text fontWeight="bold" fontSize={'15px'} color="#000">
                    Gambar
                  </Text>
                  {preview && (
                    <Box
                      w="200px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      borderWidth={'3px'}
                      borderColor="#FF6185"
                      borderRadius="10px"
                      my={3}
                      overflow="hidden"
                    >
                      <Image src={preview} w="200px" objectFit="contain" />
                    </Box>
                  )}
                  <Button
                    bg="#FF6185"
                    w="150px"
                    py={2}
                    mt={2}
                    fontSize="15px"
                    color="white"
                    fontWeight="bold"
                    colorScheme="pink"
                    _hover={{ backgroundColor: '#e35979' }}
                    onClick={handleClickFileInput}
                  >
                    Pilih Gambar...
                  </Button>
                  <Input
                    type={'file'}
                    mt={2}
                    display="none"
                    name="image"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                  />
                </Box>
                <Box display="flex" w="100%" py={3} flexDirection="column">
                  <Text fontWeight="bold" fontSize={'15px'} color="#000">
                    Deskripsi
                  </Text>
                  <Textarea
                    placeholder="Deskripsi artikel..."
                    w="100%"
                    h="200px"
                    mt={2}
                    p={4}
                    bg="#E1E1E1"
                    borderWidth={'2px'}
                    borderColor="#B5B5B5"
                    name="description"
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box display="flex" w="100%" py={3} flexDirection="column">
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Category
                </Text>
                <HStack
                  spacing={3}
                  wrap="wrap"
                  bg="gainsboro"
                  p={4}
                  mt={2}
                  borderRadius={10}
                  borderWidth={2}
                  borderColor="#B5B5B5"
                >
                  {dataCategories?.map((item, i) => (
                    <Checkbox
                      key={i}
                      color="black"
                      value={item.id}
                      onChange={e => handleChangeCategory(e, item.id)}
                    >
                      {item.name}
                    </Checkbox>
                  ))}
                </HStack>
              </Box>
              <Button
                bg="#FF6185"
                w="100%"
                h="50px"
                mt={5}
                fontSize="20px"
                color="white"
                fontWeight="bold"
                colorScheme="pink"
                _hover={{ backgroundColor: '#e35979' }}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default TambahArtikelAdmin;
