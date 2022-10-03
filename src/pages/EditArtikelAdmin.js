/* eslint-disable */
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
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import LoadingComponent from '../components/LoadingComponent';
import NavbarComponent from '../components/NavbarComponent';
import { API } from '../config/api';
import { Error, Success } from '../helpers/toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// buat menampung category id yang ke check
let categoryId = [];

function EditArtikelAdmin() {
  document.title = `Edit Artikel | Hallo Corona`;
  const [preview, setPreview] = useState(null);
  const [dataArtikel, setDataArtikel] = useState({
    title: '',
    description: '',
    image: '',
  });

  const navigate = useNavigate();

  const { id } = useParams();

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
    console.log(
      categoryId.filter((x, i, a) => {
        if (!categoryId.includes(x.id)) {
          return a.indexOf(x) === i;
        }
      })
    );
    try {
      let formData = new FormData();
      formData.set('title', dataArtikel?.title);
      formData.set('description', dataArtikel?.description);
      if (dataArtikel.image) {
        formData.set('image', dataArtikel?.image, dataArtikel?.image.name);
      }
      formData.set(
        'categoryId',
        categoryId.filter((x, i, a) => {
          if (!categoryId.includes(x.id)) {
            return a.indexOf(x) === i;
          }
        })
      );
      const response = await API.patch(`/article/${id}`, formData);
      Success({ message: `Berhasil mengubah artikel 🤩` });
      console.log(response);
      navigate('/list-artikel');
    } catch (err) {
      Error({ message: `Gagal mengubah artikel 😥` });
      console.log(err);
    }
  }

  let { data: dataArticle, isLoading: isLoadingDataArticle } = useQuery(
    'editArticleCaches',
    async () => {
      const response = await API.get(`/article/${id}`);
      return response.data.data;
    },
    {
      cacheTime: 0,
      retry: false,
      refetchOnMount: false,
      retryOnMount: false,
    }
  );

  let { data: dataCategories, isLoading: isLoadingDataCategories } = useQuery(
    'editCategoryCache',
    async () => {
      const response = await API.get('/categories');
      return response.data.data;
    }
  );

  useEffect(() => {
    console.log(categoryId);
    // set default data artikel
    if (!isLoadingDataArticle) {
      // buat fetch data category edit
      // buat fetch default image
      if (dataArticle) {
        categoryId = [];
        dataArticle.category.map(item => {
          if (!categoryId.includes(item.id)) {
            categoryId.push(item.id);
          }
        });
        setDataArtikel({
          ...dataArtikel,
          title: dataArticle.title,
          description: dataArticle.description,
        });
        setPreview(dataArticle?.image);
      }
    }
  }, [isLoadingDataArticle, dataArticle]);

  return (
    <>
      {isLoadingDataCategories || isLoadingDataArticle ? (
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
                Edit Artikel
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
                    key={dataArticle.title}
                    defaultValue={dataArticle.title}
                    value={dataArtikel.title}
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
                    key={dataArticle.description}
                    defaultValue={dataArticle.description}
                    value={dataArtikel.description}
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
                      color="black"
                      value={item.id}
                      key={i}
                      defaultChecked={categoryId.includes(item.id)}
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

export default EditArtikelAdmin;
