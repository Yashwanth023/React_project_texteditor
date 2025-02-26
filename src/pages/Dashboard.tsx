
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

type ChartType = "line" | "bar" | "pie";

const Dashboard = () => {
  const { user } = useAuth();
  const [chartType, setChartType] = useState<ChartType>("line");

  // Mock data for the charts
  const counterData = [
    { name: "Mon", value: 4 },
    { name: "Tue", value: 3 },
    { name: "Wed", value: 7 },
    { name: "Thu", value: 5 },
    { name: "Fri", value: 8 },
    { name: "Sat", value: 12 },
    { name: "Sun", value: 9 },
  ];

  const pieColors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart data={counterData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={counterData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={counterData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {counterData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
    }
  };

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 via-sky-50 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 backdrop-blur-sm bg-white/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Counter Interactions</CardTitle>
              <CardDescription>Your counter usage over time</CardDescription>
            </div>
            <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle>Form Submissions</CardTitle>
            <CardDescription>Your recent form activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle>Text Editor Usage</CardTitle>
            <CardDescription>Words written this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">
              Average of 335 words per day
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
