import { Flex, Heading } from "@chakra-ui/react";
import { ContinentProps } from "../../pages/continent/[slug]";

export function ContinentBanner({ continent }: ContinentProps) {
  return (
    <Flex
      w="100%"
      h={["150px", "300px", "500px"]}
      px={["0", "0", "36"]}
      pt={["0", "0", "72"]}
      bgImage={`url('${continent.banner_image}')`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      align="center"
      justify={["center", "center", "flex-start"]}
    >
      <Heading
        textAlign={["center", "left"]}
        fontSize={["1.75rem", "5xl"]}
        color="gray.100"
        fontWeight="500"
      >
        {continent.title}
      </Heading>
    </Flex>
  );
}
