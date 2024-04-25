import CourseList from "../../../../components/CourseList";
import CourseSideBar from "../../../../components/CourseSideBar";
import MainVideoSummary from "../../../../components/MainVideoSummary";
import QuizCards from "../../../../components/QuizCards";
import { prisma } from "../../../../lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const CoursePage = async ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });
  if (!course) {
    return redirect("/gallery");
  }
  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }
  const nextChapter = unit.chapters[chapterIndex + 1]
  const prevChapter = unit.chapters[chapterIndex - 1]
  return (
    <main className="min-h-full  pt-[5rem] " >
      <div className="flex flex-col md:flex-row justify-between md:gap-0 gap-5 md:max-h-[85.5vh]  pt-10 pl-5 pr-5">
        <div className="md:w-[60vw] md:max-h-full h-[60vh] ">
          <div className="flex flex-col w-full">
              <div className="flex flex-col min-w-full h-[100vh] justify-betwween pb-5 items-star" >
                <MainVideoSummary
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                    unit={unit}
                    unitIndex={unitIndex}
                  />  
                  <div className=" flex md:flex-row flex-col w-[100%] max-h-[5vh]">
                    <div className="md:w-[80%] w-full pl-2 pb-1 flex justify-center mt-4 md:mt-10 items-center">
                      <h3 className="text-2xl font-bold">{chapter.name}</h3>
                    </div>
                    <div className="md:w-[50%] flex justify-between md:gap-5 items-center pl-4 pr-8 w-full">
                      {
                        prevChapter && (
                          <div className="cursor-pointer">
                          <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`} className="flex mt-4 mr-auto w-fit">
                              <ChevronLeft className="w-6 h-6" /> Prev
                          </Link>
                        </div>
                        )
                      }
                      {
                        nextChapter && (
                          <div className="cursor-pointer">
                            <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`} className="flex mt-4 mr-auto w-fit">
                                Next <ChevronRight className="w-6 h-6" />
                            </Link>
                          </div>
                        )
                      }
                    </div>
                  </div>  
              </div>
            </div>
        </div>

        <div className=" md:w-[35vw] flex justify-between flex-col gap-5 ">
          <div className="w-[full] md:h-[50vh] overflow-scroll h-scroll flex flex-col justify-between items-center ">
            <CourseList course={course} currentChapterId={chapter.id} />
          </div>
          <div className="bg-rose-400 overflow-scroll h-scroll  w-full md:h-[50vh] ">
            hello again
          </div>

        </div>  
      </div>
    </main>
  );
};

export default CoursePage;
