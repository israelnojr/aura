"use client";
import React,{useState} from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { createChaptersSchema } from '../validators/course'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import SubscriptionAction from "./SubscriptionAction";
import Filter from "./Filter";

type Props = { isPro: boolean };

type Input = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = ({ isPro }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isActive, setIsactive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('');
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units, categoryLink }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
        categoryLink
      });
      return response.data;
    },
  });

  const style = "py-5"
 
  const handleCategoryChange = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
    console.log(selectedCategory)
    form.setValue('categoryLink', selectedCategory)
    
  };

  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      categoryLink: "",
      title: "",
      units: ["", "", ""],
    },
  })

  function onSubmit(data: Input) {
    console.log(data);
    if(data.categoryLink === ""){
      setIsactive(true)
      return
    }
    if (data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
      return;
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }

  form.watch();

  return (
    <div className="w-full">
      <div className={`flex-center flex-col justify-between mb-5 mt-5  ${isActive && 'p-5 bg-rose-950 rounded-sm shadow-sm' }`}>
        {isActive && (<span className="text-sm" >kindly double click to enforce selection</span>)}
        <Filter onCategoryChange={handleCategoryChange} style={style} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
              control={form.control}
              name="categoryLink"
              render={({ field }) => {
                return (
                  <FormItem className="hidden flex-col items-start w-full sm:items-center sm:flex-row">
                    {/* <FormLabel className="flex-[1] text-xl mr-5">Category</FormLabel> */}
                    <FormControl className="flex-[6]">
                      <Input className="!ring-0 !ring-offset-0 mb-5 base-regular bg-black-200 border-black-400"
                        placeholder="Enter course category"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                  <FormControl className="flex-[6]">
                    <Input className="!ring-0 !ring-offset-0 mb-10 bg-black-200 border-black-400 base-regular"
                      placeholder="Enter the main topic of the course"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    key={index}
                    control={form.control}
                    name={`units.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                          <FormLabel className="flex-[1] text-xl">
                            Unit {index + 1}
                          </FormLabel>
                          <FormControl className="flex-[6]">
                            <Input className="!ring-0 !ring-offset-0 mb-10 bg-black-200 border-black-400 base-regular"
                              placeholder="Enter subtopic of the course"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("units", form.watch("units").slice(0, -1));
                }}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6 gradient_blue-purple "
            size="lg"
          >
            Lets Go!
          </Button>
        </form>
      </Form>
      {!isPro && <SubscriptionAction />}
    </div>
  );
};

export default CreateCourseForm;
