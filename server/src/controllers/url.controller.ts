import { Router, Request, Response } from "express";
import validUrl from "valid-url";
import { URLModel } from "../models/url.model";
import { generateShortId } from "../utils";

const router = Router();
const baseUrl = process.env.BASEURI ?? "http://localhost:3000";

const generateUniqueShortId = async (): Promise<string> => {
  let shortId: string;
  let existingURL: any;

  while (true) {
    shortId = generateShortId();
    existingURL = await URLModel.findOne({ urlCode: shortId }).exec();

    if (!existingURL) {
      break;
    }
  }
  return shortId;
};

router.post("/shorten", async (req: Request, res: Response) => {
  console.log("Request to shorten the url");
  const { longUrl, urlCode } = req.body as {
    longUrl?: string;
    urlCode?: string;
  };

  try {
    if (!longUrl || !validUrl.isUri(longUrl)) {
      return res.status(401).json({ error: "Invalid Url" });
    }

    if (urlCode) {
      const existingCodeBookmark = await URLModel.findOne({ urlCode }).exec();

      if (existingCodeBookmark) {
        return res.status(400).json({
          error: `Code ${urlCode} already in use. Please choose a different code.`,
        });
      }
    }

    const existingURL = await URLModel.findOne({ longUrl }).exec();

    if (existingURL && !urlCode) {
      return res.json({ urlCode: existingURL.urlCode });
    }

    let generatedCode: string;
    if (!urlCode) {
      generatedCode = await generateUniqueShortId();
    } else {
      generatedCode = urlCode;
    }
    const shortUrl = `${baseUrl}/${generatedCode}`;

    const newURL = new URLModel({
      urlCode: generatedCode,
      longUrl,
      shortUrl,
    });
    await newURL.save();
    res.status(201).json({ urlCode: generatedCode });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

export default router;
