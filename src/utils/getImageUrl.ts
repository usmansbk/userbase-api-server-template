import { btoa } from "buffer";
import type { ImageEditInput } from "types/graphql";

interface ImageRequest {
  bucket: string;
  key: string;
  edits?: ImageEditInput;
}

const getImageUrl = (imageRequest: ImageRequest) =>
  `${process.env.CLOUDFRONT_API_ENDPOINT}${btoa(JSON.stringify(imageRequest))}`;

export default getImageUrl;
