import z from "zod";

export const getActorInfoSchema = z.object({
  params: z.object({
    actorName: z.string(),
  }),
});

export type getActorInfoParams = z.infer<
  typeof getActorInfoSchema.shape.params
>;
