import { Button, Heading, Flex } from '@chakra-ui/react';

export function Error(): JSX.Element {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      <Heading>Infelizmente ocorreu um erro =(</Heading>
      <Button py={6} onClick={() => window.location.reload()} mt={4}>
        Clique aqui para tentar novamente
      </Button>
    </Flex>
  );
}
