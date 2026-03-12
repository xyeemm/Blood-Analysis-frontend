// import { useState, useEffect } from "react";
// import "@/App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Toaster, toast } from "sonner";
// import {
//   Activity,
//   Upload,
//   FileText,
//   TrendingUp,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   ChevronRight,
//   Plus,
//   Trash2,
//   Download
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// const COMMON_TESTS = [
//   { name: "Hemoglobin", unit: "g/dL" },
//   { name: "WBC", unit: "10^3/μL" },
//   { name: "RBC", unit: "10^6/μL" },
//   { name: "Platelets", unit: "10^3/μL" },
//   { name: "Glucose", unit: "mg/dL" },
//   { name: "Cholesterol", unit: "mg/dL" },
//   { name: "HDL", unit: "mg/dL" },
//   { name: "LDL", unit: "mg/dL" },
//   { name: "Triglycerides", unit: "mg/dL" },
//   { name: "Creatinine", unit: "mg/dL" },
//   { name: "ALT", unit: "U/L" },
//   { name: "AST", unit: "U/L" },
//   { name: "TSH", unit: "mIU/L" },
//   { name: "HbA1c", unit: "%" },
// ];

// const ResultGauge = ({ testResult }) => {
//   const getPosition = () => {
//     // Simple positioning logic
//     if (testResult.status === "low") return "15%";
//     if (testResult.status === "high") return "85%";
//     return "50%";
//   };

//   const getColor = () => {
//     if (testResult.severity === "severe") return "#DC2626";
//     if (testResult.severity === "moderate") return "#F59E0B";
//     if (testResult.severity === "mild") return "#FBBF24";
//     return "#10B981";
//   };

//   return (
//     <div className="result-gauge">
//       <div
//         className="result-gauge-zone bg-blue-200"
//         style={{ left: "0%", width: "33%" }}
//       />
//       <div
//         className="result-gauge-zone bg-green-200"
//         style={{ left: "33%", width: "34%" }}
//       />
//       <div
//         className="result-gauge-zone bg-red-200"
//         style={{ left: "67%", width: "33%" }}
//       />
//       <div
//         className="result-gauge-marker"
//         style={{
//           left: getPosition(),
//           backgroundColor: getColor()
//         }}
//       />
//     </div>
//   );
// };

// const DoctorNote = ({ children }) => (
//   <div className="doctor-note p-6 rounded-lg font-mono text-sm leading-relaxed text-slate-700">
//     {children}
//   </div>
// );

// const Home = () => {
//   const [activeTab, setActiveTab] = useState("manual");
//   const [tests, setTests] = useState([{ test_name: "", value: "", unit: "" }]);
//   const [selectedTest, setSelectedTest] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [pdfFile, setPdfFile] = useState(null);

//   // Load history from localStorage on mount
//   useEffect(() => {
//     const savedHistory = localStorage.getItem("hemocheck_history");
//     if (savedHistory) {
//       setHistory(JSON.parse(savedHistory));
//     }
//   }, []);

//   // Save to localStorage
//   const saveToHistory = (analysisResult) => {
//     const newHistory = [analysisResult, ...history].slice(0, 20); // Keep last 20
//     setHistory(newHistory);
//     localStorage.setItem("hemocheck_history", JSON.stringify(newHistory));
//   };

//   const addTest = () => {
//     setTests([...tests, { test_name: "", value: "", unit: "" }]);
//   };

//   const removeTest = (index) => {
//     setTests(tests.filter((_, i) => i !== index));
//   };

//   const updateTest = (index, field, value) => {
//     const newTests = [...tests];
//     newTests[index][field] = value;
//     setTests(newTests);
//   };

//   const selectCommonTest = (testName) => {
//     const test = COMMON_TESTS.find(t => t.name === testName);
//     if (test && tests.length > 0) {
//       const lastIndex = tests.length - 1;
//       updateTest(lastIndex, "test_name", test.name);
//       updateTest(lastIndex, "unit", test.unit);
//     }
//   };

//   const handleManualSubmit = async (e) => {
//     e.preventDefault();

//     // Validate
//     const validTests = tests.filter(t => t.test_name && t.value);
//     if (validTests.length === 0) {
//       toast.error("Please add at least one test with values");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         tests: validTests.map(t => ({
//           test_name: t.test_name,
//           value: parseFloat(t.value),
//           unit: t.unit || "N/A"
//         }))
//       };

//       const response = await axios.post(`${API}/analyze`, payload);
//       setResult(response.data);
//       saveToHistory(response.data);
//       toast.success("Analysis complete!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Analysis failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePDFUpload = async (e) => {
//     e.preventDefault();

//     if (!pdfFile) {
//       toast.error("Please select a PDF file");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Mock upload
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       const response = await axios.post(`${API}/upload-pdf`, {
//         filename: pdfFile.name
//       });

//       setResult(response.data);
//       saveToHistory(response.data);
//       toast.success("PDF analyzed successfully!");
//     } catch (error) {
//       console.error(error);
//       toast.error("PDF analysis failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewHistoryItem = (item) => {
//     setResult(item);
//     setShowHistory(false);
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("hemocheck_history");
//     toast.success("History cleared");
//   };

//   if (showHistory) {
//     return (
//       <div className="min-h-screen py-12">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8 flex items-center justify-between"
//           >
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-900 mb-2">
//                 Analysis History
//               </h1>
//               <p className="text-slate-600">View your past blood report analyses</p>
//             </div>
//             <Button
//               onClick={() => setShowHistory(false)}
//               variant="outline"
//               className="rounded-full"
//               data-testid="back-to-home-button"
//             >
//               Back to Home
//             </Button>
//           </motion.div>

//           {history.length === 0 ? (
//             <Card className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
//               <CardContent className="p-12 text-center">
//                 <Clock className="w-16 h-16 mx-auto mb-4 text-slate-300" />
//                 <p className="text-slate-600">No analysis history yet</p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="space-y-4">
//               <div className="flex justify-end mb-4">
//                 <Button
//                   onClick={clearHistory}
//                   variant="destructive"
//                   size="sm"
//                   className="rounded-full"
//                   data-testid="clear-history-button"
//                 >
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Clear History
//                 </Button>
//               </div>

//               {history.map((item, index) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card
//                     className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] card-interactive cursor-pointer"
//                     onClick={() => viewHistoryItem(item)}
//                     data-testid={`history-item-${index}`}
//                   >
//                     <CardContent className="p-6">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-2">
//                             {item.overall_status === "negative" ? (
//                               <CheckCircle className="w-5 h-5 text-green-600" />
//                             ) : (
//                               <AlertCircle className="w-5 h-5 text-amber-600" />
//                             )}
//                             <span className="font-semibold text-slate-800">
//                               {item.overall_status === "negative" ? "Normal" : "Requires Attention"}
//                             </span>
//                           </div>
//                           <p className="text-sm text-slate-500">
//                             {new Date(item.timestamp).toLocaleString()}
//                           </p>
//                           <p className="text-sm text-slate-600 mt-2">
//                             {item.test_results.length} test(s) analyzed
//                           </p>
//                         </div>
//                         <ChevronRight className="w-5 h-5 text-slate-400" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   if (result) {
//     return (
//       <div className="min-h-screen py-12">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <Button
//               onClick={() => setResult(null)}
//               variant="ghost"
//               className="mb-4 text-slate-600 hover:text-emerald-700"
//               data-testid="new-analysis-button"
//             >
//               ← New Analysis
//             </Button>

//             <div className="flex items-center justify-between">
//               <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-900">
//                 Analysis Results
//               </h1>
//               <div className="flex items-center gap-2">
//                 {result.overall_status === "negative" ? (
//                   <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full" data-testid="overall-status-badge">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">Normal</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full" data-testid="overall-status-badge">
//                     <AlertCircle className="w-5 h-5" />
//                     <span className="font-semibold">Requires Attention</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* AI Explanation */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="mb-8"
//           >
//             <Card className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
//                   <FileText className="w-6 h-6 text-emerald-700" />
//                   Doctor's Analysis
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <DoctorNote>
//                   <div data-testid="ai-explanation" className="whitespace-pre-wrap">{result.ai_explanation}</div>
//                   <div className="mt-6 pt-6 border-t border-slate-200">
//                     <strong className="text-emerald-800">Recommendations:</strong>
//                     <div className="mt-2" data-testid="recommendations">{result.recommendations}</div>
//                   </div>
//                 </DoctorNote>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Test Results Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h2 className="text-2xl font-semibold text-slate-800 mb-4">Test Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {result.test_results.map((test, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3 + index * 0.05 }}
//                 >
//                   <Card className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]" data-testid={`test-result-card-${index}`}>
//                     <CardContent className="p-6">
//                       <div className="flex items-start justify-between mb-4">
//                         <div>
//                           <h3 className="font-semibold text-lg text-slate-800">{test.test_name}</h3>
//                           <p className="text-sm text-slate-500">Reference: {test.reference_range}</p>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-2xl font-bold text-emerald-800">
//                             {test.value}
//                           </div>
//                           <div className="text-sm text-slate-500">{test.unit}</div>
//                         </div>
//                       </div>

//                       <ResultGauge testResult={test} />

//                       <div className="mt-4 flex items-center justify-between">
//                         <span className="text-sm font-medium text-slate-600">
//                           Status: <span className="capitalize">{test.status}</span>
//                         </span>
//                         <span className={`text-sm font-semibold capitalize ${
//                           test.severity === "severe" ? "text-red-600" :
//                           test.severity === "moderate" ? "text-amber-600" :
//                           test.severity === "mild" ? "text-yellow-600" :
//                           "text-green-600"
//                         }`}>
//                           {test.severity}
//                         </span>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-transparent py-20">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-12"
//           >
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <Activity className="w-12 h-12 text-emerald-700" />
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-emerald-900">
//                 HemoCheck AI
//               </h1>
//             </div>
//             <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
//               Get instant AI-powered analysis of your blood reports. Upload a PDF or enter values manually for comprehensive health insights.
//             </p>

//             <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
//               <Button
//                 onClick={() => setShowHistory(true)}
//                 variant="outline"
//                 className="rounded-full border-emerald-200 hover:bg-emerald-50"
//                 data-testid="view-history-button"
//               >
//                 <Clock className="w-4 h-4 mr-2" />
//                 View History ({history.length})
//               </Button>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <Card className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
//               <CardContent className="p-6 md:p-8">
//                 <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                   <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1 rounded-full">
//                     <TabsTrigger
//                       value="manual"
//                       className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow"
//                       data-testid="manual-entry-tab"
//                     >
//                       <FileText className="w-4 h-4 mr-2" />
//                       Manual Entry
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="upload"
//                       className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow"
//                       data-testid="upload-pdf-tab"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Upload PDF
//                     </TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="manual">
//                     <form onSubmit={handleManualSubmit} className="space-y-6">
//                       <div className="mb-6">
//                         <Label className="text-sm font-medium text-slate-700 mb-2 block">
//                           Quick Select Common Test
//                         </Label>
//                         <Select onValueChange={selectCommonTest}>
//                           <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-emerald-500 rounded-lg h-12" data-testid="common-test-select">
//                             <SelectValue placeholder="Choose a common test..." />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {COMMON_TESTS.map(test => (
//                               <SelectItem key={test.name} value={test.name}>
//                                 {test.name} ({test.unit})
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>

//                       <div className="space-y-4">
//                         {tests.map((test, index) => (
//                           <motion.div
//                             key={index}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
//                           >
//                             <div className="md:col-span-5">
//                               <Label className="text-sm text-slate-600 mb-1 block">Test Name</Label>
//                               <Input
//                                 placeholder="e.g., Hemoglobin"
//                                 value={test.test_name}
//                                 onChange={(e) => updateTest(index, "test_name", e.target.value)}
//                                 className="bg-white border-slate-200 focus:border-emerald-500 rounded-lg"
//                                 data-testid={`test-name-input-${index}`}
//                               />
//                             </div>
//                             <div className="md:col-span-3">
//                               <Label className="text-sm text-slate-600 mb-1 block">Value</Label>
//                               <Input
//                                 type="number"
//                                 step="0.01"
//                                 placeholder="0.0"
//                                 value={test.value}
//                                 onChange={(e) => updateTest(index, "value", e.target.value)}
//                                 className="bg-white border-slate-200 focus:border-emerald-500 rounded-lg"
//                                 data-testid={`test-value-input-${index}`}
//                               />
//                             </div>
//                             <div className="md:col-span-3">
//                               <Label className="text-sm text-slate-600 mb-1 block">Unit</Label>
//                               <Input
//                                 placeholder="g/dL"
//                                 value={test.unit}
//                                 onChange={(e) => updateTest(index, "unit", e.target.value)}
//                                 className="bg-white border-slate-200 focus:border-emerald-500 rounded-lg"
//                                 data-testid={`test-unit-input-${index}`}
//                               />
//                             </div>
//                             <div className="md:col-span-1 flex items-end">
//                               {tests.length > 1 && (
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => removeTest(index)}
//                                   className="text-red-600 hover:bg-red-50"
//                                   data-testid={`remove-test-button-${index}`}
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>

//                       <div className="flex gap-4">
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={addTest}
//                           className="rounded-full border-emerald-200 hover:bg-emerald-50"
//                           data-testid="add-test-button"
//                         >
//                           <Plus className="w-4 h-4 mr-2" />
//                           Add Another Test
//                         </Button>
//                       </div>

//                       <Button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 rounded-full px-8 py-3 font-medium transition-all hover:-translate-y-0.5"
//                         data-testid="analyze-button"
//                       >
//                         {loading ? (
//                           <span className="flex items-center gap-2">
//                             <TrendingUp className="w-5 h-5 animate-pulse" />
//                             Analyzing...
//                           </span>
//                         ) : (
//                           <span className="flex items-center gap-2">
//                             <TrendingUp className="w-5 h-5" />
//                             Analyze Blood Report
//                           </span>
//                         )}
//                       </Button>
//                     </form>
//                   </TabsContent>

//                   <TabsContent value="upload">
//                     <form onSubmit={handlePDFUpload} className="space-y-6">
//                       <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center hover:border-emerald-300 transition-colors">
//                         <Upload className="w-16 h-16 mx-auto mb-4 text-slate-400" />
//                         <Label htmlFor="pdf-upload" className="cursor-pointer">
//                           <span className="text-lg font-medium text-slate-700 hover:text-emerald-700">
//                             Click to upload blood report PDF
//                           </span>
//                           <p className="text-sm text-slate-500 mt-2">or drag and drop</p>
//                         </Label>
//                         <Input
//                           id="pdf-upload"
//                           type="file"
//                           accept=".pdf"
//                           onChange={(e) => setPdfFile(e.target.files[0])}
//                           className="hidden"
//                           data-testid="pdf-upload-input"
//                         />
//                         {pdfFile && (
//                           <p className="mt-4 text-emerald-700 font-medium" data-testid="pdf-filename">
//                             Selected: {pdfFile.name}
//                           </p>
//                         )}
//                       </div>

//                       <Button
//                         type="submit"
//                         disabled={loading || !pdfFile}
//                         className="w-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 rounded-full px-8 py-3 font-medium transition-all hover:-translate-y-0.5"
//                         data-testid="upload-analyze-button"
//                       >
//                         {loading ? (
//                           <span className="flex items-center gap-2">
//                             <Download className="w-5 h-5 animate-pulse" />
//                             Processing PDF...
//                           </span>
//                         ) : (
//                           <span className="flex items-center gap-2">
//                             <Download className="w-5 h-5" />
//                             Upload & Analyze
//                           </span>
//                         )}
//                       </Button>
//                     </form>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>

//       {/* Noise overlay */}
//       <div className="noise-overlay" />
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </BrowserRouter>
//       <Toaster position="top-right" richColors />
//     </div>
//   );
// }

// export default App;
