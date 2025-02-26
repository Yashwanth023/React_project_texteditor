
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Counter = () => {
  const [count, setCount] = useState(0);
  const maxCount = 100; // Maximum count for color intensity

  const getBackgroundStyle = () => {
    const intensity = Math.min((count / maxCount) * 100, 100);
    return {
      background: `linear-gradient(180deg, 
        hsl(var(--background)) ${100 - intensity}%, 
        hsl(var(--primary) / 0.2) 100%)`,
      transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: "calc(100vh - 200px)",
    };
  };

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  const handleReset = () => setCount(0);

  // Save count to localStorage
  useEffect(() => {
    localStorage.setItem("counter", count.toString());
  }, [count]);

  return (
    <div style={getBackgroundStyle()} className="flex items-center justify-center p-8">
      <Card className="w-full max-w-md backdrop-blur-sm bg-background/95">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold">{count}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDecrement}
              className="w-20 h-20 rounded-full text-2xl transition-transform hover:scale-105"
            >
              -
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              className="w-20 h-20 rounded-full text-sm transition-transform hover:scale-105"
            >
              Reset
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleIncrement}
              className="w-20 h-20 rounded-full text-2xl transition-transform hover:scale-105"
            >
              +
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Counter;
