import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { activityTypes } from "@/constants/values";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FetchedData {
  type: string;
  activity: string;
  participants: number;
}
interface FormData {
  name: string;
  type: string;
}

const RandomActivity = () => {
  const form = useForm<FormData>();
  const [data, setData] = useState<FetchedData>();

  async function fetchData(type: string) {
    const response = await axios.get(
      type === "random"
        ? "https://www.boredapi.com/api/activity"
        : `https://www.boredapi.com/api/activity?type=${type}`
    );
    setData(response.data);
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    fetchData(data.type);
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Ready to take a challenge?</CardTitle>
        <CardDescription>Find something interesting.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} required>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem
                          key={type.toLowerCase()}
                          value={type.toLowerCase()}
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">Generate</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {data && (
          <div className="flex-col item-start">
            <p className="text-[16px] sm:text-[18px] leading-[1.3em]">
              {`Hey ${form.getValues("name")}, ${data.activity.toLowerCase()}.`}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RandomActivity;
