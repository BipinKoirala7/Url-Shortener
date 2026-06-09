import { Router, type Request, type Response } from "express";
import { URLModel } from "../models/url.model";

const router = Router();

router.get("/:code", async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const found = await URLModel.findOne({
      urlCode: code,
    }).exec();
    if (found) {
      return res.redirect(found.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

export default router;
