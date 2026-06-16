# VOV to VNExpress Frontend Transformation

This project contains a local clone of the VOV.vn website with a complete frontend visual transformation to match the UI/UX layout and styling of VNExpress.net.

## Project Structure

* **`index.html`**: The static HTML clone of VOV.vn, injected with the static advertisement layout and transformation scripts.
* **`vnexpress-theme.css`**: Aggressive CSS overrides that re-style the VOV components (typography, widths, headers, grids) to mirror the VNExpress aesthetic.
* **`vnexpress-structure.js`**: DOM manipulation script that dynamically restructures the header and hero layout upon page load to match VNExpress.
* **Python Scripts**: Various utility scripts (`clone.py`, `inject_vne.py`, `inject_static_ad.py`) used to clone the site and inject the transformation layers.

## How to View

1. Open a terminal in the project directory.
2. Start a simple local server (e.g., using Python):
   ```bash
   python -m http.server 8765
   ```
3. Open your browser and navigate to `http://localhost:8765`.
4. (Recommended) Perform a hard refresh (`Ctrl+F5`) to ensure the latest CSS and JS changes are loaded.

