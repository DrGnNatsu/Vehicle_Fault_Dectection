import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const DocumentationPage = () => {
  return (
    <div className="h-screen p-40">
      {" "}
      <Card className="h-full text-2xl ">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">Title</CardTitle>
        </CardHeader>
        <div className="h-1/2 flex justify-center bg-red-500">
          <CardContent className="h-1/4">
            <ul>
              <li>Description: blah blah</li>
            </ul>
            <div>
              <Input placeholder="input code here"></Input>
            </div>
          </CardContent>
          <CardContent className="h-1/4">
            <ul>
              <li>Description: blah blah</li>
            </ul>
            <div>
              <Input placeholder="input code here"></Input>
            </div>
          </CardContent>
        </div>
        <CardFooter>
          <Button size={"lg"}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DocumentationPage;
