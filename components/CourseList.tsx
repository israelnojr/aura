import { Chapter, Course, Unit } from '@prisma/client'
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { cn } from '../lib/utils';

type Props = {
    course: Course & {
        units: (Unit & {
          chapters: Chapter[];
        })[];
      };
      currentChapterId: string;
}

const CourseList = ({course, currentChapterId}: Props) => {
  return (
    <div className="w-full flex-row rounded-sm">
        {course.units.map((unit, unitIndex) => {
            return (          
            <div className=' flex mb-1 md:mb-[3rem] h-[20vh] pt-10 ' >
                <div className="flex w-full md:h-full items-center md:py-2 md:px-2">
                    <div className="w-[50%] h-[100%] rounded-lg flex items-center ">
                        <Image 
                            src={course.image}
                            width={50}
                            height={50}
                            className='w-full rounded-lg'
                            alt='course title'
                            objectFit='contain'
                        /> 
                    </div>
                    {unit.chapters.map((chapter, chapterIndex) => {
                        return (
                            <Link key={chapter.id} href={`/course/${course.id}/${unitIndex}/${chapterIndex}`} 
                                className={cn("text-secondary-foreground/60 justify-center items-center flex h-[100%] w-[50%] rounded-lg pl-3", {
                                    "text-green-500 font-bold":
                                      chapter.id === currentChapterId,
                                  })}
                            >
                                {chapter.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
            )
        })}
    </div>
  )
}

export default CourseList