/* eslint-disable */
import {
  Box,
  Text,
  Input,
  Select,
  Textarea,
  Button,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import NavbarComponent from '../components/NavbarComponent';
import { useEffect, useState } from 'react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useNavigate } from 'react-router-dom';
import { Success, Error } from '../helpers/toast';
import { API } from '../config/api';

function Artikel() {
  document.title = `Buat Reservasi - Hallo Corona`;

  const [dataReservasi, setDataReservasi] = useState({
    fullName: '',
    phone: '',
    bornDate: new Date(),
    age: '',
    height: '',
    weight: '',
    gender: '',
    subject: '',
    liveConsultation: new Date(),
    description: '',
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setDataReservasi({
      ...dataReservasi,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeDate(value, name) {
    if (name === 'bornDate') {
      let bornDateToMilis = new Date(value).getTime();
      setDataReservasi({
        ...dataReservasi,
        bornDate: bornDateToMilis,
      });
    }

    if (name === 'liveConsultation') {
      let liveConsultationToMilis = new Date(value).getTime();
      setDataReservasi({
        ...dataReservasi,
        liveConsultation: liveConsultationToMilis,
      });
    }

    console.log(dataReservasi);
  }

  function handleChangeAge() {
    console.log('born date', dataReservasi.bornDate);
    let yearNow = new Date().getFullYear();
    // selisih year lahir dan year sekarang
    let calculateAge = yearNow - new Date(dataReservasi.bornDate).getFullYear();

    setDataReservasi({
      ...dataReservasi,
      age: calculateAge,
    });
  }

  useEffect(() => {
    handleChangeAge();
  }, [dataReservasi.bornDate]);

  async function handleSubmit() {
    console.log('ini data reservasi sekarang', dataReservasi);
    try {
      const body = {
        fullName: dataReservasi.fullName,
        phone: dataReservasi.phone,
        bornDate: dataReservasi.bornDate,
        age: parseInt(dataReservasi.age),
        height: parseInt(dataReservasi.height),
        weight: parseInt(dataReservasi.weight),
        gender: dataReservasi.gender,
        subject: dataReservasi.subject,
        liveConsultation: dataReservasi.liveConsultation,
        description: dataReservasi.description,
      };

      const response = await API.post('/consultation', body);
      console.log(response);
      setDataReservasi({
        fullName: '',
        phone: '',
        bornDate: new Date(),
        age: '',
        height: '',
        weight: '',
        gender: '',
        subject: '',
        liveConsultation: new Date(),
        description: '',
      });
      Success({ message: `Berhasil menambahkan data konsultasi!` });
      navigate('/konsultasi');
    } catch (err) {
      Error({ message: 'Gagal menambahkan data!' });
    }
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
            Reservasi Konsultasi
          </Text>
          <Box display="flex" flexDirection="column" py={5} w="100%">
            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Nama Lengkap
              </Text>
              <Input
                w="100%"
                h="30px"
                p={4}
                mt={2}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="fullName"
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Nomor Telepon
              </Text>
              <NumberInput>
                <NumberInputField
                  maxLength={15}
                  w="100%"
                  h="30px"
                  mt={2}
                  p={4}
                  bg="#E1E1E1"
                  borderWidth={'2px'}
                  borderColor="#B5B5B5"
                  name="phone"
                  onChange={handleChange}
                />
              </NumberInput>
            </Box>
            <Box display="flex" w="100%" py={3} flexDirection="row">
              <Box display="flex" flex={3} py={3} flexDirection="column" mr={3}>
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Tanggal Lahir
                </Text>
                <SingleDatepicker
                  date={dataReservasi.bornDate}
                  onDateChange={value => handleChangeDate(value, 'bornDate')}
                  propsConfigs={{
                    inputProps: {
                      bg: '#E1E1E1',
                      borderWidth: '2px',
                      borderColor: '#B5B5B5',
                      h: '30px',
                      w: '100%',
                      p: 4,
                      mt: 2,
                    },
                  }}
                />
              </Box>

              <Box display="flex" flex={1} py={3} flexDirection="column" mr={3}>
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Umur
                </Text>
                <NumberInput value={dataReservasi.age}>
                  <NumberInputField
                    disabled
                    _disabled={{ bg: '#bdbdbd' }}
                    maxLength={2}
                    w="100%"
                    h="30px"
                    mt={2}
                    p={4}
                    bg="#E1E1E1"
                    borderWidth={'2px'}
                    borderColor="#B5B5B5"
                  />
                </NumberInput>
              </Box>

              <Box display="flex" flex={2} py={3} flexDirection="column" mr={3}>
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Tinggi Badan
                </Text>
                <NumberInput>
                  <NumberInputField
                    maxLength={3}
                    w="100%"
                    h="30px"
                    mt={2}
                    p={4}
                    bg="#E1E1E1"
                    borderWidth={'2px'}
                    borderColor="#B5B5B5"
                    name="height"
                    onChange={handleChange}
                  />
                </NumberInput>
              </Box>

              <Box display="flex" flex={2} py={3} flexDirection="column">
                <Text fontWeight="bold" fontSize={'15px'} color="#000">
                  Berat Badan
                </Text>
                <NumberInput>
                  <NumberInputField
                    maxLength={3}
                    w="100%"
                    h="30px"
                    mt={2}
                    p={4}
                    bg="#E1E1E1"
                    borderWidth={'2px'}
                    borderColor="#B5B5B5"
                    name="weight"
                    onChange={handleChange}
                  />
                </NumberInput>
              </Box>
            </Box>
            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Gender
              </Text>
              <Select
                placeholder="Pilih gender..."
                h="40px"
                mt={2}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="gender"
                onChange={handleChange}
              >
                <option value="male">Pria</option>
                <option value="female">Wanita</option>
              </Select>
            </Box>

            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Subjek
              </Text>
              <Input
                w="100%"
                h="30px"
                mt={2}
                p={4}
                bg="#E1E1E1"
                borderWidth={'2px'}
                borderColor="#B5B5B5"
                name="subject"
                onChange={handleChange}
              />
            </Box>

            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Tanggal Konsultasi Langsung
              </Text>
              <SingleDatepicker
                date={dataReservasi.liveConsultation}
                onDateChange={value =>
                  handleChangeDate(value, 'liveConsultation')
                }
                propsConfigs={{
                  inputProps: {
                    bg: '#E1E1E1',
                    borderWidth: '2px',
                    borderColor: '#B5B5B5',
                    h: '30px',
                    w: '100%',
                    p: 4,
                    mt: 2,
                  },
                }}
              />
            </Box>

            <Box display="flex" w="100%" py={3} flexDirection="column">
              <Text fontWeight="bold" fontSize={'15px'} color="#000">
                Deskripsi
              </Text>
              <Textarea
                placeholder="Deskripsikan kebutuhanmu untuk berkonsultasi dengan dokter..."
                w="100%"
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
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Artikel;
