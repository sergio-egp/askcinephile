import z from "zod";

export const getFilmInfoSchema = z.object({
  params: z.object({
    filmName: z.string(),
  }),
});

export type getFilmInfoParams = z.infer<typeof getFilmInfoSchema.shape.params>;
