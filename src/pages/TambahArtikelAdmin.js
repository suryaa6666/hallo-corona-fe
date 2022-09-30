import { Box, Button, Image, Input, Text, Textarea } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';

function TambahArtikelAdmin() {
  const [preview, setPreview] = useState(null);
  const [dataArtikel, setDataArtikel] = useState({
    title: '',
    image: '',
    description: '',
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

export default TambahArtikelAdmin;
