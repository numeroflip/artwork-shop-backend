import { z } from "zod";

const URL = "https://api.artic.edu/api/v1";
const FIELDS = ["id", "title", "thumbnail", "artist_title"];

const fieldsOption = `fields=${FIELDS.join(",")}`;

export const ArtworksOptionsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});

type FetchArtworksOptions = z.infer<typeof ArtworksOptionsSchema>;

// (partial) Data expected to come from the artic.edu api
const ArtworkRawResponseSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  thumbnail: z
    .object({
      lqip: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      alt_text: z.string().optional(),
    })
    .optional(),
  artist_title: z.string().optional(),
});

type ArtworkRawResponse = z.infer<typeof ArtworkRawResponseSchema>;

// Data we return
type ArtworkResponse = Omit<ArtworkRawResponse, "artist_title"> & {
  author?: string;
};

export async function fetchArtworks(
  options: FetchArtworksOptions
): Promise<ArtworkResponse[] | null> {
  const response = await fetch(
    `${URL}/artworks?page=${options.page}&limit=${options.limit}&${fieldsOption}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  const parsedData = Array.isArray(json.data)
    ? (json.data.map(parseRawResponse).filter(Boolean) as ArtworkResponse[])
    : null;

  return parsedData;
}

export async function fetchArtwork(id: number) {
  const response = await fetch(`${URL}/artworks/${id}?${fieldsOption}`);

  const json = await response.json();

  return parseRawResponse(json.data);
}

function parseRawResponse(data: unknown): ArtworkResponse | null {
  const rawData = ArtworkRawResponseSchema.safeParse(data);
  if (rawData.success) {
    return {
      id: rawData.data.id,
      author: rawData.data.artist_title,
      thumbnail: rawData.data.thumbnail,
      title: rawData.data.title,
    };
  }

  return null;
}
