import { Edit, Hash, ImageIcon, Sparkles } from "lucide-react";
import type { FormConfig } from "./AiToolForm";

export const articleFormConfig: FormConfig = {
  icon: Sparkles,
  title: "Article Configuration",
  iconColor: "text-[#4A7AFF]",
  inputLabel: "Article Topic",
  inputPlaceholder: "The future of artificial intelligence is...",
  optionsLabel: "Article Length",
  options: [
    { text: "Short（500-800 words）", value: 800 },
    { text: "Medium（800-1200 words） ", value: 1200 },
    { text: "Long（1200+ words）", value: 1600 },
  ],
  selectedColor: "text-blue-700",
  selectedBgColor: "bg-blue-50",
  buttonIcon: Edit,
  buttonText: "Generate article",
  buttonGradientFrom: "from-[#226BFF]",
  buttonGradientTo: "to-[#65ADFF]",
};

export const blogTitlesFormConfig: FormConfig = {
  icon: Sparkles,
  title: "Blog Title Generator",
  iconColor: "text-[#8E37EB]",
  inputLabel: "Blog Topic",
  inputPlaceholder: "The future of artificial intelligence is...",
  optionsLabel: "Blog Category",
  options: [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ],
  selectedColor: "text-purple-700",
  selectedBgColor: "bg-purple-50",
  buttonIcon: Hash,
  buttonText: "Generate title",
  buttonGradientFrom: "from-[#C341F6]",
  buttonGradientTo: "to-[#8E37EB]",
};

export const imageGenerationFormConfig: FormConfig = {
  icon: Sparkles,
  title: "AI Image Generator",
  iconColor: "text-[#00AD25]",
  inputLabel: "Describe Your Image",
  inputPlaceholder: "Describe what you want to see in the image..",
  inputType: "textarea",
  inputRows: 4,
  optionsLabel: "Style",
  options: [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ],
  selectedColor: "text-green-700",
  selectedBgColor: "bg-green-50",
  buttonIcon: ImageIcon,
  buttonText: "Generate Image",
  buttonGradientFrom: "from-[#00AD25]",
  buttonGradientTo: "to-[#04FF50]",
};
