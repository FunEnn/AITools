import { FileText, Hash, Image, SquarePen } from "lucide-react";
import arrow_icon from "./arrow_icon.svg";
import gradientBackground from "./gradientBackground.png";
import logo from "./logo.svg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.png";
import profile_img_4 from "./profile_img_4.png";
import profile_img_5 from "./profile_img_5.png";
import star_dull_icon from "./star_dull_icon.svg";
import star_icon from "./star_icon.svg";

export const assets = {
  logo,
  star_icon,
  star_dull_icon,
  gradientBackground,
  profile_img_1,
  profile_img_2,
  profile_img_3,
  profile_img_4,
  profile_img_5,
  arrow_icon,
};

export const getAiToolsData = (dict, lang) => [
  {
    title: dict.ai.aiToolsData.articleWriter.title,
    description: dict.ai.aiToolsData.articleWriter.description,
    Icon: SquarePen,
    bg: { from: "#3588F2", to: "#0BB0D7" },
    path: `/${lang}/ai/write-article`,
  },
  {
    title: dict.ai.aiToolsData.blogTitles.title,
    description: dict.ai.aiToolsData.blogTitles.description,
    Icon: Hash,
    bg: { from: "#B153EA", to: "#E549A3" },
    path: `/${lang}/ai/blog-titles`,
  },
  {
    title: dict.ai.aiToolsData.imageGeneration.title,
    description: dict.ai.aiToolsData.imageGeneration.description,
    Icon: Image,
    bg: { from: "#20C363", to: "#11B97E" },
    path: `/${lang}/ai/generate-images`,
  },
  {
    title: dict.ai.aiToolsData.resumeReview.title,
    description: dict.ai.aiToolsData.resumeReview.description,
    Icon: FileText,
    bg: { from: "#12B7AC", to: "#08B6CE" },
    path: `/${lang}/ai/review-resume`,
  },
];
