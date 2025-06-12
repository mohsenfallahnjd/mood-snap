import type { FC } from "react";
// import { languageAtom } from "@/utils/atoms";
import { DonateSection } from "./DonateSection";

export const AboutPage: FC = () => {
  // const language = useAtomValue(languageAtom);

  // useEffect(() => {
  //   document.documentElement.lang = language;
  //   document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  // }, [language]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">About MoodSnap</h1>
      <p>
        MoodSnap helps you track your daily mood with a simple click, visualize your emotional trends, and reflect on
        your feelings over time.
      </p>
      <p>
        Each day, just select an emoji to record how you feel. View monthly reports, weekly trends, and customize your
        settings. All data is stored locally to protect your privacy.
      </p>
      <DonateSection />
    </div>
  );
};

export default AboutPage;
