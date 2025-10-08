import {
  Eraser,
  FileText,
  Hash,
  Image,
  Scissors,
  SquarePen,
} from "lucide-react";
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
  gradientBackground,
  star_icon,
  star_dull_icon,
  profile_img_1,
  profile_img_2,
  profile_img_3,
  profile_img_4,
  profile_img_5,
  arrow_icon,
};

export const AiToolsData = [
  {
    title: "AI Article Writer",
    description:
      "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    Icon: SquarePen,
    bg: { from: "#3588F2", to: "#0BB0D7" },
    path: "/ai/write-article",
  },
  {
    title: "Blog Title Generator",
    description:
      "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    Icon: Hash,
    bg: { from: "#B153EA", to: "#E549A3" },
    path: "/ai/blog-titles",
  },
  {
    title: "AI Image Generation",
    description:
      "Create stunning visuals with our AI image generation tool, Experience the power of AI ",
    Icon: Image,
    bg: { from: "#20C363", to: "#11B97E" },
    path: "/ai/generate-images",
  },
  {
    title: "Background Removal",
    description:
      "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    Icon: Eraser,
    bg: { from: "#F76C1C", to: "#F04A3C" },
    path: "/ai/remove-background",
  },
  {
    title: "Object Removal",
    description:
      "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
    Icon: Scissors,
    bg: { from: "#5C6AF1", to: "#427DF5" },
    path: "/ai/remove-object",
  },
  {
    title: "Resume Reviewer",
    description:
      "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    Icon: FileText,
    bg: { from: "#12B7AC", to: "#08B6CE" },
    path: "/ai/review-resume",
  },
];

export const dummyTestimonialData = [
  {
    image: assets.profile_img_1,
    name: "Gotoh Hitori",
    title: "Guitar & Vocals, Kessoku Band",
    content:
      "ContentAI helped me overcome my social anxiety by letting me write blog posts about music without having to talk to people directly. It's a lifesaver!",
    rating: 4,
  },
  {
    image: assets.profile_img_2,
    name: "Ijichi Nijika",
    title: "Drummer, Kessoku Band",
    content:
      "As the band's leader, I use ContentAI to manage our band's social media presence. It helps us connect with fans while giving Bocchi her space!",
    rating: 5,
  },
  {
    image: assets.profile_img_4,
    name: "Kita Ikuyo",
    title: "Bass Guitar, Kessoku Band",
    content:
      "ContentAI is starrrr-level amazing! It helps me write engaging posts about our performances and connect with our growing fanbase! ⭐",
    rating: 4,
  },
];
