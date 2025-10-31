// This file is auto-generated. Do not edit manually.

export interface Dictionary {
  nav: {
    home: string;
    tools: string;
    community: string;
    pricing: string;
    login: string;
    signup: string;
    dashboard: string;
    writeArticle: string;
    blogTitles: string;
    generateImages: string;
    removeBackground: string;
    removeObject: string;
    reviewResume: string;
    plan: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    getStarted: string;
    learnMore: string;
  };
  tools: {
    blogTitles: {
      name: string;
      description: string;
    };
    imageGeneration: {
      name: string;
      description: string;
    };
    backgroundRemoval: {
      name: string;
      description: string;
    };
    objectRemoval: {
      name: string;
      description: string;
    };
    resumeReview: {
      name: string;
      description: string;
    };
    articleWriter: {
      name: string;
      description: string;
    };
  };
  pricing: {
    free: {
      name: string;
      price: string;
      description: string;
    };
    pro: {
      name: string;
      price: string;
      description: string;
    };
    enterprise: {
      name: string;
      price: string;
      description: string;
    };
  };
  testimonials: {
    title: string;
    description: string;
    data: readonly Array<{
      readonly id: number;
      readonly name: string;
      readonly title: string;
      readonly content: string;
      readonly rating: number;
      readonly image: string;
    }>;
  };
  ai: {
    totalCreations: string;
    activePlan: string;
    recentCreations: string;
    noCreations: string;
    noCreationsDescription: string;
    loading: string;
    loadingDescription: string;
    fetchError: string;
    fetchErrorDescription: string;
    writeArticle: {
      title: string;
      placeholder: string;
      promptTemplate: string;
      successMessage: string;
      errorMessage: string;
      timeoutMessage: string;
      inputError: string;
      generateError: string;
    };
    blogTitles: {
      title: string;
      placeholder: string;
      promptTemplate: string;
      successMessage: string;
      errorMessage: string;
      timeoutMessage: string;
      inputError: string;
      generateError: string;
    };
    community: {
      title: string;
      noCreations: string;
      noCreationsDescription: string;
      fetchError: string;
      fetchErrorDescription: string;
      likeSuccess: string;
      unlikeSuccess: string;
      likeError: string;
      likeErrorDescription: string;
    };
    aiTools: {
      backgroundRemoval: {
        title: string;
        placeholder: string;
        inputError: string;
        successMessage: string;
        errorMessage: string;
        generateError: string;
      };
      objectRemoval: {
        title: string;
        placeholder: string;
        inputError: string;
        fileError: string;
        successMessage: string;
        errorMessage: string;
        generateError: string;
      };
      resumeReview: {
        title: string;
        placeholder: string;
        inputError: string;
        successMessage: string;
        errorMessage: string;
        generateError: string;
      };
      imageGeneration: {
        title: string;
        placeholder: string;
        inputError: string;
        successMessage: string;
        errorMessage: string;
        timeoutMessage: string;
        generateError: string;
        publishLabel: string;
      };
    };
    aiToolsData: {
      articleWriter: {
        title: string;
        description: string;
      };
      blogTitles: {
        title: string;
        description: string;
      };
      imageGeneration: {
        title: string;
        description: string;
      };
      backgroundRemoval: {
        title: string;
        description: string;
      };
      objectRemoval: {
        title: string;
        description: string;
      };
      resumeReview: {
        title: string;
        description: string;
      };
    };
    formConfigs: {
      article: {
        title: string;
        inputLabel: string;
        inputPlaceholder: string;
        optionsLabel: string;
        options: Array<{ text: string; value: number }>;
        buttonText: string;
      };
      blogTitles: {
        title: string;
        inputLabel: string;
        inputPlaceholder: string;
        optionsLabel: string;
        options: string[];
        buttonText: string;
      };
      imageGeneration: {
        title: string;
        inputLabel: string;
        inputPlaceholder: string;
        optionsLabel: string;
        options: string[];
        buttonText: string;
      };
      backgroundRemoval: {
        title: string;
        inputLabel: string;
        inputPlaceholder: string;
        buttonText: string;
      };
      objectRemoval: {
        title: string;
        inputLabel: string;
        inputPlaceholder: string;
        buttonText: string;
      };
      resumeReview: {
        title: string;
        inputLabel: string;
        inputPlaceholder: string;
        buttonText: string;
      };
    };
  };
  notFound: {
    title: string;
    heading: string;
    description: string;
    backToHome: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    mission: {
      title: string;
      content: string;
    };
    vision: {
      title: string;
      content: string;
    };
    features: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    technology: {
      title: string;
      description: string;
      stack: string[];
    };
    team: {
      title: string;
      content: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
}
