# MoodSnap 📊

A simple, privacy-focused daily mood tracking application built with Next.js. Track your emotional well-being with just one click and visualize your mood trends over time.

![MoodSnap](https://moodsnap.me/images/og-image.png)

## ✨ Features

- **One-Click Mood Recording**: Quickly log your daily mood with three simple options: Good 😊, Neutral 😐, or Bad 😞
- **Visual Analytics**: View your mood trends with interactive charts and graphs
- **Monthly Reports**: Detailed monthly breakdowns with calendar views and progress tracking
- **Streak Tracking**: Monitor your mood recording consistency
- **Privacy-First**: All data is stored locally on your device - no cloud storage, no tracking
- **PWA Support**: Install as a Progressive Web App for easy access
- **Shareable Snapshots**: Generate and share beautiful mood snapshots
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Live Demo

Visit [moodsnap.me](https://moodsnap.me) to try the application live.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Jotai
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Heroicons
- **Image Capture**: html2canvas
- **Package Manager**: Bun

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mood-snap.git
   cd mood-snap
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001) to see the application.

## 🏗️ Project Structure

```
mood-snap/
├── app/                    # Next.js App Router
│   ├── _sections/         # Reusable UI components
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── history/           # Mood history and charts
│   ├── report/            # Monthly reports
│   └── settings/          # App settings
├── public/                # Static assets
│   ├── images/           # Mood icons and social images
│   └── manifest.json     # PWA manifest
├── utils/                # Utility functions and atoms
└── package.json
```

## 🎯 Usage

### Recording Your Mood

1. Visit the homepage
2. Click on one of the three mood options: Good, Neutral, or Bad
3. Your mood is instantly saved locally

### Viewing Your History

- Navigate to the **History** page to see your mood trends over the last 28 days
- Switch between line and bar charts
- View summary statistics

### Monthly Reports

- Access detailed monthly reports with calendar views
- Track your positive mood percentage
- Navigate between different months

### Settings & Customization

- Adjust app preferences
- Manage your data
- Configure streak tracking

## 🔒 Privacy

MoodSnap is designed with privacy in mind:

- **Local Storage Only**: All your mood data is stored locally in your browser
- **No Tracking**: No analytics, no user tracking, no data collection
- **No Accounts**: No registration required - just start tracking immediately
- **Offline Capable**: Works without an internet connection

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Deploy on Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Heroicons](https://heroicons.com/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Visit the [contact page](https://moodsnap.me/contact)
- Check out the [about page](https://moodsnap.me/about) for more information

---

Made with ❤️ for better mental health awareness and self-reflection.
