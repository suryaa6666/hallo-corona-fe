import { Badge, Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function CardArticle({ id, title, image, description, category }) {
  function cutSentence(sentence, maxCharacter) {
    return sentence.length > maxCharacter
      ? sentence.substring(0, maxCharacter) + '...'
      : sentence;
  }

  return (
    <Box
      bg="white"
      h="450px"
      w="300px"
      borderRadius="5px"
      boxShadow={'md'}
      my={5}
    >
      <Image
        src={image ? image : `/assets/images/image-placeholder.png`}
        w={'100%'}
        h="200px"
        objectFit={'cover'}
        borderRadius="5px"
      />
      <Box w="100%" p={3}>
        <Link to={`/artikel/${id}`}>
          <Text fontWeight="bold" fontSize={'20px'} color="black" mt="5px">
            {cutSentence(title, 50)}
          </Text>
        </Link>
        <Text fontSize={'20px'} color="#6C6C6C" mt="5px">
          {cutSentence(description, 70)}
        </Text>
        {/* Category Section */}
        <Box display="flex" flexDirection="row" w="100%" py={3}>
          <Badge
            variant="outline"
            borderRadius={'20px'}
            borderColor="#6C6C6C"
            p={2}
            mr={3}
            mt="5px"
          >
            Category
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default CardArticle;
