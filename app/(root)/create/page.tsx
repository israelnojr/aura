import { getAuthSession } from "../../../lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import CreateCourseForm from "../../../components/CreateCourseForm";
import { checkSubscription } from "../../../lib/subscription";

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const isPro = await checkSubscription();
  return (
    <main className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0 mt-[120px]"> 
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Learning Journey
      </h1>
      <div className="flex p-4 mt-10 rounded bg-black-200">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-700" />
        <div>
          Enter in a course title, or what you want to learn about. Then enter a
          list of units, which are the specifics you want to learn. And our AI
          will generate a course for you!
        </div>
      </div>

      <CreateCourseForm isPro={isPro} />
    </main>
  );
};

export default CreatePage;
