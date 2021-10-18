import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface CityProps {
  name: string;
  country: string;
  flag: string;
  image: string;
}

export function City({ name, country, flag, image }: CityProps) {
  return (
    <Box borderRadius="4px" overflow="hidden">
      <Image src={image} alt={`${name}, ${country}`} h="170px" w="100%" />
      <Flex
        p="6"
        align="center"
        justify="space-between"
        bg="white"
        border="1px"
        borderColor="yellow.300"
        borderTop="0"
      >
        <Flex direction="column">
          <Heading fontSize="xl" fontWeight="500">
            {name}
          </Heading>
          <Text mt="3" fontSize="md" color="gray.500" fontWeight="500">
            {country}
          </Text>
        </Flex>
        <Image
          src={flag}
          w="30px"
          h="30px"
          borderRadius="50%"
          objectFit="cover"
          alt="Cidade"
        />
      </Flex>
    </Box>
  );
}
