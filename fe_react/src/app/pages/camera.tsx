import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ReactPlayer from "react-player";
import React, { useRef, useState, useEffect } from "react";

const camera = () => {
  return (
    <div className="h-screen p-4">
      <Card className="border-border h-full">
        <CardHeader>
          <CardTitle>Camera Name</CardTitle>
        </CardHeader>
        <CardContent className="h-4/5">
          <div className=" w-full h-full flex items-center justify-center mb-4">
            <div className="relative w-full h-full">
              <ReactPlayer
                src="https://www.youtube.com/watch?v=eH3giaIzONA"
                className="absolute inset-0"
                width="100%"
                height="100%"
                autoPlay={true}
              />
              <div className="absolute inset-0 z-10 bg-transparent">
                <CanvasDragRect />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {" "}
            <Input placeholder="input code here"></Input>
            <Button>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default camera;

function CanvasDragRect() {
  const canvasRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const onMouseDown = (e) => {
    setDragging(true);
    setStartPos(getMousePos(e));
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    setCurrentPos(getMousePos(e));

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const x = Math.min(startPos.x, currentPos.x);
    const y = Math.min(startPos.y, currentPos.y);
    const w = Math.abs(startPos.x - currentPos.x);
    const h = Math.abs(startPos.y - currentPos.y);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h); // draw selection
  };

  const onMouseUp = () => {
    setDragging(false);
    // rectangle defined by `startPos` -> `currentPos`
    // you can now use these coords however you want
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full  border-border"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
}
