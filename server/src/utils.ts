import { nanoid } from "nanoid";

export const generateShortId = (): string => nanoid(6);

export default generateShortId;
