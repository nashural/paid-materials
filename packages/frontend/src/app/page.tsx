import { createClient } from "@nashural-paid-materials/service-client";
import { PrimaryLogo } from "@/components/PrimaryLogo";

import MaterialGridItem from "./MaterialGridItem";

import classes from "./page.module.css";
import { Shell } from "@/components/Shell";

const serviceClient = createClient(
  process.env["SERVICE_URL"]!,
  process.env["SERVICE_TOKEN"]!,
);

export default async function Home() {
  const materials = await serviceClient.getMaterials();

  return (
    <Shell>
      <div className={classes.materialsGrid}>
        {materials.map(({ id, name, description, price, image_id }) => (
          // @ts-expect-error Server Component
          <MaterialGridItem
            key={id}
            id={id}
            name={name}
            description={description}
            price={price}
            imageId={image_id}
          />
        ))}
      </div>
    </Shell>
  );
}
