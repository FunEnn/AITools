// This file is auto-generated. Do not edit manually.
export const ai = {
  totalCreations: "Total Creations",
  activePlan: "Active Plan",
  recentCreations: "Recent Creations",
  noCreations: "No creations yet",
  noCreationsDescription:
    "Start using AI tools to create your first masterpiece!",
  loading: "Loading",
  loadingDescription: "Please wait...",
  fetchError: "Failed to fetch creations, please try again",
  fetchErrorDescription:
    "Error occurred while fetching creations, please try again",
  writeArticle: {
    title: "Generated Article",
    placeholder: 'Enter a topic and click "Generate Article" to start',
    promptTemplate:
      'Please write a {length}-word article about "{topic}". The content should be detailed, well-structured, and logically rigorous.',
    successMessage: "Article generated successfully!",
    errorMessage: "Failed to generate article, please try again",
    timeoutMessage:
      "AI generation is taking longer than expected, please try again later",
    inputError: "Please enter an article topic",
    generateError: "Error occurred while generating article, please try again",
  },
  blogTitles: {
    title: "Generated Titles",
    placeholder: 'Enter a topic and click "Generate Titles" to start',
    promptTemplate:
      'Please generate attractive titles for a {category} blog about "{topic}". The titles should be concise and compelling to attract readers.',
    successMessage: "Titles generated successfully!",
    errorMessage: "Failed to generate titles, please try again",
    timeoutMessage:
      "AI generation is taking longer than expected, please try again later",
    inputError: "Please enter a blog topic",
    generateError: "Error occurred while generating titles, please try again",
  },
  community: {
    title: "Community Creations",
    noCreations: "No community creations yet",
    noCreationsDescription: "Be the first to share your creations!",
    fetchError: "Failed to fetch creations, please try again",
    fetchErrorDescription:
      "Error occurred while fetching creations, please try again",
    likeSuccess: "Liked successfully",
    unlikeSuccess: "Unliked successfully",
    likeError: "Like operation failed, please try again",
    likeErrorDescription: "Error occurred while liking, please try again",
  },
  aiTools: {
    backgroundRemoval: {
      title: "Processed Image",
      placeholder: 'Upload an image and click "Remove Background" to start',
      inputError: "Please select an image file",
      successMessage: "Background removed successfully!",
      errorMessage: "Failed to remove background, please try again",
      generateError:
        "Error occurred while removing background, please try again",
    },
    objectRemoval: {
      title: "Processed Image",
      placeholder:
        'Describe objects to remove and click "Remove Objects" to start',
      inputError: "Please describe objects to remove",
      fileError: "Please select an image file",
      successMessage: "Objects removed successfully!",
      errorMessage: "Failed to remove objects, please try again",
      generateError: "Error occurred while removing objects, please try again",
    },
    resumeReview: {
      title: "Resume Review Results",
      placeholder: 'Upload a resume and click "Review Resume" to start',
      inputError: "Please select a resume file",
      successMessage: "Resume review completed!",
      errorMessage: "Failed to review resume, please try again",
      generateError: "Error occurred while reviewing resume, please try again",
    },
    imageGeneration: {
      title: "Generated Image",
      placeholder: 'Enter a description and click "Generate Image" to start',
      inputError: "Please enter an image description",
      successMessage: "Image generated successfully!",
      errorMessage: "Failed to generate image, please try again",
      timeoutMessage:
        "AI generation is taking longer than expected, please try again later",
      generateError: "Error occurred while generating image, please try again",
      publishLabel: "Publish this image",
    },
  },
  aiToolsData: {
    articleWriter: {
      title: "AI Article Writer",
      description:
        "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    },
    blogTitles: {
      title: "Blog Title Generator",
      description:
        "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    },
    imageGeneration: {
      title: "AI Image Generation",
      description:
        "Create stunning visuals with our AI image generation tool, Experience the power of AI.",
    },
    backgroundRemoval: {
      title: "Background Removal",
      description:
        "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    },
    objectRemoval: {
      title: "Object Removal",
      description:
        "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
    },
    resumeReview: {
      title: "Resume Reviewer",
      description:
        "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    },
  },
  formConfigs: {
    article: {
      title: "Article Generator",
      inputLabel: "Article Topic",
      inputPlaceholder: "The future development of artificial intelligence...",
      optionsLabel: "Article Length",
      options: [
        { text: "Short (500-800 words)", value: 800 },
        { text: "Medium (800-1200 words)", value: 1200 },
        { text: "Long (1200+ words)", value: 1600 },
      ],
      buttonText: "Generate Article",
    },
    blogTitles: {
      title: "Blog Title Generator",
      inputLabel: "Blog Topic",
      inputPlaceholder: "The future development of artificial intelligence...",
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
      buttonText: "Generate Titles",
    },
    imageGeneration: {
      title: "AI Image Generator",
      inputLabel: "Image Description",
      inputPlaceholder: "Describe the image content you want to generate...",
      optionsLabel: "Style",
      options: [
        "Realistic Style",
        "Studio Ghibli Style",
        "Anime Style",
        "Cartoon Style",
        "Fantasy Style",
        "Hyperrealistic Style",
        "3D Style",
        "Portrait Style",
      ],
      buttonText: "Generate Image",
    },
    backgroundRemoval: {
      title: "Background Removal",
      inputLabel: "Upload Image",
      inputPlaceholder: "No file selected",
      buttonText: "Remove Background",
    },
    objectRemoval: {
      title: "Object Removal",
      inputLabel: "Describe objects to remove",
      inputPlaceholder: "e.g.: cars in background, trees in image",
      buttonText: "Remove Objects",
    },
    resumeReview: {
      title: "Resume Review",
      inputLabel: "Upload Resume",
      inputPlaceholder: "No file selected",
      buttonText: "Review Resume",
    },
  },
} as const;

export default ai;
