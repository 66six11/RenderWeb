# GitHub setup

Repository target:

```txt
66six11/RenderWeb
```

To push this generated source bundle manually:

```bash
git clone git@github.com:66six11/RenderWeb.git
cd RenderWeb
rsync -av /path/to/generated/RenderWeb/ ./
git add .
git commit -m "Add Astro R3F render blog starter"
git push origin main
```

If the repository only contains a README, this commit becomes the first full application baseline.
