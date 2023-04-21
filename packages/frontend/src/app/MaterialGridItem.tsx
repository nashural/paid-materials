import Link from "next/link";
import { createClient } from "@nashural-paid-materials/service-client";

import classes from "./MaterialGridItem.module.css";

const serviceClient = createClient(
  process.env["SERVICE_URL"]!,
  process.env["SERVICE_TOKEN"]!,
);

export default async function MaterialGridItem({
  id,
  name,
  description,
  price,
  imageId,
}: {
  id: number;
  name: string;
  description: string;
  price: number;
  imageId: number;
}) {
  const { filename, alt } = await serviceClient.getImage(imageId);

  return (
    <div className={classes.materialGridItem}>
      <div className={classes.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={classes.preview}
          src={
            filename
              ? `${process.env["SERVICE_URL"]}/uploads/${filename}`
              : "https://place-hold.it/100x100"
          }
          alt={alt}
        />
      </div>
      <div className={classes.name}>{name}</div>
      <div className={classes.description}>{description}</div>
      <div className={classes.footer}>
        <Link className={classes.more} href={`/materials/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
