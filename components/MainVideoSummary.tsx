import { Chapter, Course, Unit } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
  // nextChapter: Chapter
  // prevChapter: Chapter
  // course: Course
};

const MainVideoSummary = ({
  unit,
  unitIndex,
  chapter,
  // course,
  chapterIndex,
  // nextChapter,
  // prevChapter
}: Props) => {
  return (
    
        <iframe 
          title="chapter video"
          className=" rounded-sm w-full h-[26.5rem] aspect-video"
          src={`https://www.youtube.com/embed/${chapter.videoId}`}
          allowFullScreen
        />
      
    
  );
};

export default MainVideoSummary;
