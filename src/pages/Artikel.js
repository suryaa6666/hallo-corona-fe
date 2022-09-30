import { Badge, Box, Image, Text } from '@chakra-ui/react';
import NavbarComponent from '../components/NavbarComponent';

function Artikel() {
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
          <Text fontWeight="bold" fontSize={'30px'} color="black" mt="5px">
            Ini Alasan Buah dan Sayur dari Supermarket Harus Dicuci
          </Text>
          <Text fontSize={'15px'} color="#6C6C6C" mt="5px">
            17 April 2022
          </Text>
          <Box
            display="flex"
            w="100%"
            flexDirection="row"
            alignItems={'center'}
            mt="5px"
          >
            <Text fontSize={'15px'} color="#6C6C6C" mr={2}>
              Author :
            </Text>
            <Text fontSize={'15px'} color="#FF6185">
              Dr. Anto Ariza
            </Text>
          </Box>
          <Box w={'100%'} boxShadow="md" mt={5} p={10}>
            <Image
              src={`/assets/images/image-placeholder.png`}
              w="100%"
              h="400px"
              objectFit="cover"
            />
            {/* Category Section */}
            <Box display="flex" flexDirection="row" w="100%" py={10}>
              <Badge
                variant="outline"
                borderRadius={'20px'}
                borderColor="#6C6C6C"
                p={2}
                mr={3}
                mt="5px"
              >
                Hidup Sehat
              </Badge>
              <Badge
                variant="outline"
                borderRadius={'20px'}
                borderColor="#6C6C6C"
                p={2}
                mr={3}
                mt="5px"
              >
                Kebersihan
              </Badge>
            </Box>
            {/* Article Section */}
            <Text>
              Hallo Corona, Jakarta - Dengan adanya wabah yang menyerang, banyak
              orang diharuskan untuk tetap tinggal di rumah. Namun, setiap orang
              diperbolehkan untuk keluar rumah hanya untuk belanja bahan makanan
              di supermarket atau pasar. Banyak orang yang lebih memperhatikan
              kebersihan tangannya, tetapi bagaimana dengan virus yang menempel
              pada makanan, termasuk sayur dan buah?
            </Text>
            <br />
            <Text>
              Kamu pasti tidak dapat memastikan jika orang lain yang menyentuh
              buah dan sayur yang ingin dibeli tidak memiliki virus di
              tangannya. Maka dari itu, penting untuk mencuci sayur dan buah
              untuk menjaga kebersihan agar dapat menjaga tubuhmu tetap sehat.
              Berikut adalah beberapa alasan yang harus diketahui kenapa kamu
              harus mencuci sayur dan buah yang dibeli dari supermarket!
            </Text>
            <br />
            <Text fontWeight="bold" fontSize="20px">
              Penyebab Sayur dan Buah Harus Dicuci Sebelum Dikonsumsi
            </Text>
            <br />
            <Text>
              Kebersihan makanan harus selalu terjaga agar tidak tertempel oleh
              berbagai penyebab penyakit. Diketahui virus corona dapat menempel
              pada bahan makanan, seperti sayur dan buah yang kamu beli di
              supermarket. Maka dari itu, penting untuk menjaga kebersihannya
              dengan cara memastikan untuk mencuci sayur dan buah sebelum
              dikonsumsi atau setelah dibeli.
            </Text>
            <br />
            <Text>
              Kamu dapat mencucinya dengan air yang mengalir agar memastikan
              jika makanan tersebut benar-benar aman untuk dikonsumsi. Hal
              tersebut dapat efektif untuk menghindari beberapa penyakit yang
              disebabkan oleh kuman dan bakteri, termasuk virus corona. Jangan
              menggunakan sabun saat mencucinya, karena zat-zat tertentu dapat
              meresap ke dalamnya dan menimbulkan gangguan lainnya.
            </Text>
            <br />
            <Text>
              Setelah dicuci, kamu dapat merendamnya selama beberapa saat agar
              dapat mengurangi suhu panas yang ada di dalam sayur dan buah. Cara
              tersebut dipercaya dapat mengurangi efek samping yang buruk pada
              tubuh, seperti sembelit, sakit kepala, diare, hingga masalah pada
              kulit. Dengan begitu, hanya manfaat baiknya saja yang akan
              diterima tubuh.
            </Text>
            <br />
            <Text>
              Membasuh dan merendam bahan makanan dengan air juga dapat
              menghilangkan pestisida dan insektisida yang digunakan. Jika zat
              tersebut masuk ke tubuh, beberapa masalah kesehatan dapat terjadi
              dan mungkin saja membahayakan, seperti iritasi pernapasan, alergi
              kulit, dan lainnya.
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Artikel;
