# URL Shortener — Quick Pull & Run

These commands let you pull the latest changes and start the app from the parent directory (one level above this repository). Replace "URL Shortener" below with the exact folder name if different.

Quick start (dependencies already installed):

```bash
git -C "URL Shortener" pull
npm --prefix "URL Shortener" run dev
```

Pull, install dependencies, then start (first-time or after dependency changes):

```bash
git -C "URL Shortener" pull && npm --prefix "URL Shortener" run install-all && npm --prefix "URL Shortener" run dev
```

Production build (client build + server start):

```bash
git -C "URL Shortener" pull && npm --prefix "URL Shortener" run build && npm --prefix "URL Shortener" run dev
```

Notes

- `npm run dev` (root) runs both client and server concurrently.
- Environment variables (e.g. `MONGODB_URI`) must be set in the server environment or in a `.env` file under the project when starting the server.
- If your directory name contains spaces keep the quotes as shown, or use the folder's escaped/path form.
