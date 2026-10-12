# Mallow's Little World

A cozy virtual pet built with React and Vite.

## Run it locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Publish it with GitHub Pages

This repository includes a GitHub Actions workflow at
`.github/workflows/deploy-pages.yml`. It publishes the app whenever the
`main` branch is updated.

1. Create a new empty GitHub repository named `Mallows-world` (do not add a
   README, `.gitignore`, or license if GitHub offers those checkboxes).
2. From this project folder, initialize Git and push the first commit:

   ```bash
   git init
   git add .
   git commit -m "Initial Mallow app"
   git branch -M main
   git remote add origin https://github.com/ayasviniK/Mallows-world.git
   git push -u origin main
   ```

3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish.

The hosted URL will be:

```text
https://ayasviniK.github.io/Mallows-world/
```

After that, each push to `main` redeploys the site automatically.
