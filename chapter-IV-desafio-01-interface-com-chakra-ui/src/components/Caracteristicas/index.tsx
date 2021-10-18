import { Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Caracteristica } from "./Caracteristica";

const caracteristicas = [
  { icon: "cocktail", text: "vida noturna" },
  { icon: "surf", text: "praia" },
  { icon: "building", text: "moderno" },
  { icon: "museum", text: "clássico" },
];

export function Caracteristicas() {
  return (
    <Grid
      templateColumns={["1fr 1fr", "1fr 1fr", "1fr 1fr", "repeat(5, 1fr)"]}
      w="100%"
      justify="space-between"
      align="center"
      mt={["10", "32"]}
      mx="auto"
      maxW="1160px"
      flexWrap="wrap"
      gap={[1, 5]}
    >
      {caracteristicas.map((caracteristica) => (
        <GridItem key="icon">
          <Caracteristica
            icon={caracteristica.icon}
            text={caracteristica.text}
          />
        </GridItem>
      ))}

      <GridItem colSpan={[2, 2, 2, 1]}>
        <Caracteristica icon="earth" text="e mais..." />
      </GridItem>
    </Grid>
  );
}
