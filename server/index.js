const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
const PORT = 3001;

const genAI = new GoogleGenerativeAI(process.env.GULGUL_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const imagemodel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// ==== Schemas and Models ==== //

const registerSchema = new mongoose.Schema({
  email: { type: String },
  registered: { type: Boolean }
});
const Register = mongoose.model('Register', registerSchema);

const basicInfoSchema = new mongoose.Schema({
  name: String,
  title: String,
  linkedin: String,
  github: String,
  email: String,
  phone: String
});
const BasicInfo = mongoose.model('BasicInfo', basicInfoSchema);

const workSchema = new mongoose.Schema({
  certificationLink: String,
  companyName: String,
  startDate: Date,
  endDate: Date,
  location: String,
  points: [String],
  title: String
});
const Certification = mongoose.model('Certification', workSchema);

const projectSchema = new mongoose.Schema({
  github: String,
  link: String,
  overview: String,
  points: [String],
  title: String
});
const Project = mongoose.model('Project', projectSchema);

const educationSchema = new mongoose.Schema({
  college: String,
  startDate: Date,
  endDate: Date,
  title: String
});
const Education = mongoose.model('Education', educationSchema);

const achievementsSchema = new mongoose.Schema({
  points: [String]
});
const Achievements = mongoose.model('Achievements', achievementsSchema);

const summarySchema = new mongoose.Schema({
  summary: String
});
const Summary = mongoose.model('Summary', summarySchema);

const otherSchema = new mongoose.Schema({
  other: String
});
const Other = mongoose.model('Other', otherSchema);

// ==== File Upload Config ==== //
const uploadDirectory = 'uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, uploadDirectory)),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// ==== Routes ==== //

app.post('/add/basicInfo', async (req, res) => {
  try {
    const { name, title, linkedin, github, email, phone } = req.body.params;
    const newBasicInfo = new BasicInfo({ name, title, linkedin, github, email, phone });
    const savedBasicInfo = await newBasicInfo.save();
    res.json({ success: true, data: savedBasicInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.post('/add/workInfo', async (req, res) => {
  try {
    const { certificationLink, title, startDate, endDate, companyName, location, points } = req.body.params;
    const newWorkInfo = new Certification({ certificationLink, title, startDate, endDate, companyName, location, points });
    const savedWorkInfo = await newWorkInfo.save();
    res.json({ success: true, data: savedWorkInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
});

app.post('/add/projectInfo', async (req, res) => {
  try {
    const { link, title, overview, github, points } = req.body.params;
    const newProjectInfo = new Project({ link, title, overview, github, points });
    const savedProjectInfo = await newProjectInfo.save();
    res.json({ success: true, data: savedProjectInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
});

app.post('/add/eduInfo', async (req, res) => {
  try {
    const { title, college, startDate, endDate } = req.body.params;
    const newEduInfo = new Education({ title, college, startDate, endDate });
    const savedEduInfo = await newEduInfo.save();
    res.json({ success: true, data: savedEduInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
});

app.post('/add/achInfo', async (req, res) => {
  try {
    const { points } = req.body.params;
    const newAchInfo = new Achievements({ points });
    const savedAchInfo = await newAchInfo.save();
    res.json({ success: true, data: savedAchInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
});

app.post('/add/sumInfo', async (req, res) => {
  try {
    const { summary } = req.body.params;
    const newSumInfo = new Summary({ summary });
    const savedSumInfo = await newSumInfo.save();
    res.json({ success: true, data: savedSumInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
});

app.post('/add/otherInfo', async (req, res) => {
  try {
    const { other } = req.body.params;
    const newOtherInfo = new Other({ other });
    const savedOtherInfo = await newOtherInfo.save();
    res.json({ success: true, data: savedOtherInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
});

app.post('/check', async (req, res) => {
  const email = req.body.params.email;
  const user = await Register.findOne({ email });
  if (!user) {
    console.log("Does not Exist");
    res.json({ exists: false });
  } else {
    console.log("Exist");
    res.json({ exists: true });
  }
});

app.post('/test', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const fileName = req.file.originalname;
    console.log("File uploaded:", fileName);
    res.status(200).json({ fileName });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const example = {
  questions: [
    {
      question: "",
      model_ans: "",
      candidate_ans: "",
      score: "",
      feedback: ""
    }
  ],
  overall_feedback: "",
  overall_score: ""
};

app.post("/resumescore", upload.single("image"), async (req, res) => {
  console.log("Calculating Your Score!");
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const imageName = req.file.originalname;
    const imagePath = path.join(__dirname, uploadDirectory, imageName);

    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
        mimeType: "image/png"
      }
    };

    const extractionPrompt = "Extract information from the resume";
    const result = await imagemodel.generateContent([extractionPrompt, image]);
    const resumeInfo = result.response.text();

    const evalPrompt = `Evaluate the resume ${resumeInfo}. Find the flaws in it and write its fix. Ignore inconsistent font and formatting. After finding score give the result in format of JSON strictly follow this ${JSON.stringify(example)}. Do not change even the variable names. Give an overall score out of 100 to the resume.`;
    const feedback = await model.generateContent([evalPrompt]);
    const finalFeedback = feedback.response.text();

    console.log(finalFeedback);
    res.status(200).json({ feedback: finalFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ==== Start Server ==== //
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
