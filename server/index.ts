import express from "express";
import puppeteer from "puppeteer";

const app = express();
const port = 8990;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/pdf/:id", async (req, res) => {
  const url = `http://localhost:3000/${req.params.id}`;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const element = await page.$("body");

    if (element) {
      const elementHtml = await page.evaluate((el) => el.outerHTML, element);

      const pdfPage = await browser.newPage();
      await pdfPage.setContent(elementHtml, { waitUntil: "networkidle2" });

      const pdfBuffer = await pdfPage.pdf({ format: "A4" });

      await browser.close();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${req.params.id}.pdf`
      );
      res.send(pdfBuffer);
    } else {
      await browser.close();
      res.send("Element not found");
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});
