const express = require('express');
const cors = require('cors');
const Jimp = require('jimp');
const uuid = require('uuid');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate-ticket', async (req, res) => {
  try {
    const { experienceName, date, numberOfPersons, customerName } = req.body;
    const bookingId = generateBookingId();
    const ticketImage = await createTicketImage({
      experienceName,
      date,
      numberOfPersons,
      customerName,
      bookingId,
    });
    const base64Image = await ticketImage.getBase64Async(Jimp.MIME_PNG);
    res.json({ image: base64Image, bookingId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

function generateBookingId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters = Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const randomNumber = Math.floor(Math.random() * 10);
  const bookingId = `${randomLetters}${randomNumber}`;
  return bookingId;
}

async function createTicketImage({ experienceName, date, numberOfPersons, customerName, bookingId }) {
  const baseImage = await Jimp.read('./images/base-ticket.png');
  const fontWhite = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
  const fontBlack = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const fontBlackSmall = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

  baseImage.print(fontWhite, 130, 20, `${bookingId}`);
  baseImage.print(fontBlack, 50, 275, `${experienceName}`);
  baseImage.print(fontBlack, 50, 385, `${date}`);
  baseImage.print(fontBlack, 50, 485, `${customerName}`);
  baseImage.print(fontBlack, 370, 485, `${numberOfPersons}`);
  baseImage.print(fontBlackSmall, 200, 750, `${bookingId}`);

  const outputPath = `./images/ticket_${bookingId}.png`;
  await baseImage.writeAsync(outputPath);

  return baseImage;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
