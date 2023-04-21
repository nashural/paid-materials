import { Shell } from "@/components/Shell";
import { createClient } from "@nashural-paid-materials/service-client";
import { Button, Input } from "@nashural-paid-materials/ui-lib";

import classes from "./page.module.css";

const serviceClient = createClient(
  process.env["SERVICE_URL"]!,
  process.env["SERVICE_TOKEN"]!,
);

export default async function Materials({
  params: { material_id },
}: {
  params: { material_id: string };
}) {
  const { name, description, image_id } = await serviceClient.getMaterial(
    material_id,
  );
  const { alt, filename } = await serviceClient.getImage(image_id);

  return (
    <Shell>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={classes.image}
        src={
          filename
            ? `${process.env["SERVICE_URL"]}/uploads/${filename}`
            : "https://place-hold.it/100x100"
        }
        alt={alt}
      />
      <h1>{name}</h1>
      <p>{description}</p>
      <div className={classes.form}>
        <div className={classes.formInner}>
          <div className={classes.formTitle}>Получить материал</div>
          <div className={classes.formText}>
            Оставьте ваш емейл, чтобы мы смогли выслать материал к вам на почту
          </div>
          <form
            className={classes.formControls}
            action={`/api/materials/${material_id}/subscriptions`}
            method="POST"
          >
            <label className={classes.formLabel} htmlFor="email">
              Емейл
            </label>
            <Input
              className={classes.formInput}
              required
              type="email"
              name="email"
              placeholder="nashural@mail.ru"
            />
            <Button type="submit" className={classes.formButton}>
              Получить на почту
            </Button>
          </form>
        </div>
      </div>
    </Shell>
  );
}
