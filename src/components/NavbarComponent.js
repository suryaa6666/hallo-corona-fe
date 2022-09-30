import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaHandsHelping, FaRegUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RiArticleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Success, Error } from '../helpers/toast';
import { API } from '../config/api';

export default function NavbarComponent() {
  const [state, dispatch] = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //storing login data
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  });

  //storing register data
  const [dataRegister, setDataRegister] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    listAs: '',
    gender: '',
    phone: '',
    address: '',
  });

  //buat modal
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  //buat modal
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  function handleChangeLogin(e) {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeRegister(e) {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmitLogin() {
    try {
      const body = {
        email: dataLogin.email,
        password: dataLogin.password,
      };

      await API.post('/login', body, { validateStatus: () => true })
        .then(response => {
          if (response.data.code >= 400) {
            return Error({ message: `Email / password salah!` });
          }
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data,
          });
          console.log(state);
          onCloseLogin();
          setDataLogin({
            email: '',
            password: '',
          });
          Success({ message: `Login berhasil!` });
        })
        .catch(err => {
          Error({ message: `${err.response.data.message}` });
        });
    } catch (err) {
      Error({ message: `${err}` });
    }
  }

  async function handleSubmitRegister() {
    try {
      const body = {
        fullName: dataRegister.fullName,
        email: dataRegister.email,
        username: dataRegister.username,
        password: dataRegister.password,
        listAs: dataRegister.listAs,
        gender: dataRegister.gender,
        phone: dataRegister.phone,
        address: dataRegister.address,
      };

      await API.post('/register', body, { validateStatus: () => true })
        .then(response => {
          console.log(response);

          if (response.data.code === 403) {
            return Error({ message: `${response.data.message}` });
          }

          if (response.data.code >= 400) {
            return Error({
              message: `Mohon isikan form registrasi yang valid!`,
            });
          }

          onCloseRegister();
          onOpenLogin();
          setDataRegister({
            fullName: '',
            email: '',
            username: '',
            password: '',
            listAs: '',
            gender: '',
            phone: '',
            address: '',
          });

          Success({ message: `Register berhasil! Silahkan Login 😁` });
        })
        .catch(err => {
          Error({ message: `${err.response.data.message}` });
        });
    } catch (err) {
      Error({ message: `${err}` });
    }
  }

  function handleLogout() {
    dispatch({
      type: 'LOGOUT_SUCCESS',
    });
    Success({ message: `Logout berhasil!` });
  }

  return (
    <>
      <Box
        bg={'white'}
        px={10}
        py={2}
        boxShadow={'md'}
        position="fixed"
        w={'100%'}
        zIndex={999}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to="/">
              <Box>
                <Image
                  src={`/assets/images/logo-brand.png`}
                  w={'200px'}
                  h={'100%'}
                  objectFit={'contain'}
                />
              </Box>
            </Link>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              {state.isLogin ? (
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'md'}
                    border="3px solid #FF6185"
                    src={
                      'https://i.pinimg.com/736x/b5/90/b5/b590b514aaa50668125f87a200e8854a.jpg'
                    }
                  />
                </MenuButton>
              ) : (
                <Box>
                  <Button
                    bg={'#FFF'}
                    px={5}
                    py={2}
                    color={'#FF6185'}
                    fontWeight={'bold'}
                    borderWidth={2}
                    borderColor={'#FF6185'}
                    mx={2}
                    _hover={{ backgroundColor: '#e6e6e6' }}
                    onClick={onOpenRegister}
                  >
                    Sign Up
                  </Button>
                  <Button
                    bg={'#FF6185'}
                    px={5}
                    py={2}
                    color={'white'}
                    fontWeight={'bold'}
                    mx={2}
                    _hover={{ backgroundColor: '#ed5a7c' }}
                    onClick={onOpenLogin}
                    colorScheme="pink"
                  >
                    Sign In
                  </Button>
                </Box>
              )}
              <MenuList>
                {state.isDoctor ? (
                  <>
                    <Link to="/profil">
                      <MenuItem>
                        <FaRegUser
                          size={24}
                          color={'#FF6185'}
                          style={{ marginRight: '5px' }}
                        />
                        Profil
                      </MenuItem>
                    </Link>
                    <Link to="/tambah-artikel">
                      <MenuItem>
                        <RiArticleLine
                          size={24}
                          color={'#FF6185'}
                          style={{ marginRight: '5px' }}
                        />
                        Tambahkan Artikel
                      </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>
                      <FiLogOut
                        size={24}
                        color={'#FF6185'}
                        style={{ marginRight: '5px' }}
                      />
                      Logout
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <Link to="/profil">
                      <MenuItem>
                        <FaRegUser
                          size={24}
                          color={'#FF6185'}
                          style={{ marginRight: '5px' }}
                        />
                        Profil
                      </MenuItem>
                    </Link>
                    <Link to="/konsultasi">
                      <MenuItem>
                        <FaHandsHelping
                          size={24}
                          color={'#FF6185'}
                          style={{ marginRight: '5px' }}
                        />
                        Konsultasi
                      </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>
                      <FiLogOut
                        size={24}
                        color={'#FF6185'}
                        style={{ marginRight: '5px' }}
                      />
                      Logout
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}></Stack>
          </Box>
        ) : null}
      </Box>

      {/* Modal Login */}
      <Modal isOpen={isOpenLogin} onClose={onCloseLogin}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py={5}>
            <Text textAlign="center" fontSize="30px" fontWeight="bold">
              Sign In
            </Text>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Email
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                type={'email'}
                name="email"
                onChange={handleChangeLogin}
              />
            </Box>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Password
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                type={'password'}
                name="password"
                onChange={handleChangeLogin}
              />
            </Box>
            <Button
              bg="#FF6185"
              mt={5}
              w="100%"
              h="40px"
              fontSize="20px"
              color="white"
              fontWeight="bold"
              _hover={{ backgroundColor: '#e35979' }}
              colorScheme="pink"
              onClick={handleSubmitLogin}
            >
              Sign in
            </Button>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              py={2}
            >
              <Text mr={2}>Don't have account ?</Text>
              <Text
                color="#FF6185"
                cursor="pointer"
                onClick={() => {
                  onCloseLogin();
                  onOpenRegister();
                }}
              >
                Register Here
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal Register */}
      <Modal isOpen={isOpenRegister} onClose={onCloseRegister}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py={5}>
            <Text textAlign="center" fontSize="30px" fontWeight="bold">
              Sign Up
            </Text>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Nama Lengkap
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="fullName"
                onChange={handleChangeRegister}
              />
            </Box>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Username
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="username"
                onChange={handleChangeRegister}
              />
            </Box>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Email
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                type={'email'}
                name="email"
                onChange={handleChangeRegister}
              />
            </Box>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Password
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                type={'password'}
                name="password"
                onChange={handleChangeRegister}
              />
            </Box>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Daftar Sebagai
              </Text>
              <Select
                placeholder="Pilih Peran..."
                h="50px"
                mt={2}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="listAs"
                onChange={handleChangeRegister}
              >
                <option value="doctor">Dokter</option>
                <option value="patient">Pasien</option>
              </Select>
            </Box>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Gender
              </Text>
              <Select
                placeholder="Pilih Gender..."
                h="50px"
                mt={2}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="gender"
                onChange={handleChangeRegister}
              >
                <option value="male">Pria</option>
                <option value="female">Wanita</option>
              </Select>
            </Box>
            <Box display="flex" w="100%" py={1} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                No. Telepon
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="phone"
                onChange={handleChangeRegister}
              />
            </Box>
            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Alamat
              </Text>
              <Textarea
                w="100%"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="address"
                onChange={handleChangeRegister}
              />
            </Box>
            <Button
              bg="#FF6185"
              mt={5}
              w="100%"
              h="50px"
              fontSize="20px"
              color="white"
              fontWeight="bold"
              colorScheme="pink"
              _hover={{ backgroundColor: '#e35979' }}
              onClick={handleSubmitRegister}
            >
              Sign Up
            </Button>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              py={2}
            >
              <Text mr={2}>Already have account ?</Text>
              <Text
                color="#FF6185"
                cursor="pointer"
                onClick={() => {
                  onCloseRegister();
                  onOpenLogin();
                }}
              >
                Login Here
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
