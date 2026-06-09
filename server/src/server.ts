import connect from "./configs/db";
import app from "./index";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || "5000";

app.listen(Number(PORT), async () => {
  try {
    await connect();
    console.log(`Server is running on ${PORT}`);
  } catch (error: any) {
    console.log(error.message);
  }
});
