import { Grid, Heading } from "@chakra-ui/react";
import { City } from "./City";

import { ContinentProps } from "../../pages/continent/[slug]";

export function Cities({ continent }: ContinentProps) {
  return (
    <>
      <Heading fontWeight="500" fontSize={["2xl", "4xl"]} mb="10">
        Cidades +100
      </Heading>
      <Grid
        templateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gap={["20px", "45px"]}
        alignItems="center"
        justifyContent="center"
        px={["30px", "0"]}
      >
        {continent.cities100.map((city) => (
          <City
            key={city.city}
            name={city.city}
            country={city.country}
            flag={city.flag}
            image={city.thumbnail}
          />
        ))}
      </Grid>
    </>
  );
}
