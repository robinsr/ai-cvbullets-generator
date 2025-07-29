# Resume Bullet Point Generator

An LLM-powered web tool that creates tailored resume bullet points for job applications. This application helps job seekers generate professional, targeted bullet points based on their work experience and the specific job description they're applying for.

## Features

- **Smart Input Form**: Collect job details, company information, job description, and your work experience
- **AI-Powered Generation**: Uses LLM technology to create relevant, tailored bullet points
- **Professional UI**: Clean, modern interface with intuitive navigation
- **Copy to Clipboard**: Easy one-click copying of generated bullet points
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Input Fields

The application collects the following information to generate tailored bullet points:

1. **Job Title** - The position you're applying for
2. **Company** - The company you're applying to
3. **Job Description** - The full job posting description
4. **Work Experience** - Your relevant work experience and achievements
5. **Skills & Technologies** - Your technical skills and tools

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-bullet-point-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### API Configuration

The application supports both Anthropic (Claude) and OpenAI APIs:

- **Anthropic**: Direct browser access (no proxy needed)
- **OpenAI**: Uses CORS proxy for browser compatibility

Configure your API keys in the "API Configuration" section of the app.

### Building for Production

```bash
npm run build
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Hooks

## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global styles and Tailwind imports
└── lib/
    └── utils.ts         # Utility functions
```

## Usage

1. **Fill out the form**: Enter the job details and your work experience
2. **Generate bullet points**: Click the "Generate Bullet Points" button
3. **Review and copy**: Browse through the generated bullet points and copy the ones you like
4. **Customize**: Edit your inputs and regenerate if needed

## Future Enhancements

- Integration with actual LLM APIs (OpenAI, Anthropic, etc.)
- Save and manage multiple job applications
- Export to different resume formats
- A/B testing different bullet point styles
- Industry-specific templates
- Resume scoring and optimization suggestions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository. 