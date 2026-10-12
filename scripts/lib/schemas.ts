import { z } from "zod";

export const AirportSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  code: z.string().nullable(),
  title: z.string(),
  detailHtml: z.string(),
  mtitle: z.string(),
  mdesc: z.string(),
  mkey: z.string(),
});
export type Airport = z.infer<typeof AirportSchema>;

export const StateSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});
export type State = z.infer<typeof StateSchema>;

export const CountySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  stateId: z.number(),
  detailHtml: z.string(),
  trackingPhone: z.string().nullable(),
});
export type County = z.infer<typeof CountySchema>;

export const CitySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  countyId: z.number(),
  stateId: z.number(),
  detailHtml: z.string(),
  mtitle: z.string(),
  mdesc: z.string(),
  mkey: z.string(),
});
export type City = z.infer<typeof CitySchema>;

export const CarImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});
export type CarImage = z.infer<typeof CarImageSchema>;

export const CarSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  detailHtml: z.string(),
  images: z.array(CarImageSchema),
  brand: z.number().nullable(),
});
export type Car = z.infer<typeof CarSchema>;

export const PageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  detailHtml: z.string(),
  mtitle: z.string(),
  mdesc: z.string(),
  mkey: z.string(),
});
export type Page = z.infer<typeof PageSchema>;

export const BlogPostSchema = z.object({
  id: z.union([z.number(), z.string()]),
  slug: z.string(),
  title: z.string(),
  detailHtml: z.string(),
  mtitle: z.string(),
  mdesc: z.string(),
  mkey: z.string(),
  publishedAt: z.string().nullable(),
  source: z.enum(["legacy", "soro", "original"]),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;
