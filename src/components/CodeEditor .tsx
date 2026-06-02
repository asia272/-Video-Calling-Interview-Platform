import { CODING_QUESTIONS, LANGUAGES } from '@/app/constants'
import React, { useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircleIcon, BookIcon, LightbulbIcon } from 'lucide-react';
import { ScrollBar, ScrollArea } from './ui/scroll-area';
import Editor from "@monaco-editor/react";
import { Button } from './ui/button';

const CodeEditor = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0])
    const [language, setLanguage] = useState<"javascript" | "python" | "java">(LANGUAGES[0].id);
    const [code, setCode] = useState(selectedQuestion.starterCode[language]);
    const [output, setOutput] = useState("")

    const handleQuestionChange = (questionId: string | null) => {
        const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
        setSelectedQuestion(question);
        setCode(question.starterCode[language]);
    };

    const handleLanguageChange = (newLanguage: "javascript" | "python" | "java" | null) => {
        if (!newLanguage) return;
        setLanguage(newLanguage);
        setCode(selectedQuestion.starterCode[newLanguage]);
    };
    const runCode = () => {
        if (language !== "javascript") {
            setOutput("Only JavaScript execution is supported right now.");
            return;
        }

        let logs: string[] = [];

        const originalLog = console.log;

        try {
            console.log = (...args) => {
                logs.push(args.join(" "));
            };

            eval(code);

            setOutput(logs.join("\n") || "Code executed successfully.");
        } catch (error: any) {
            setOutput(error.message);
        } finally {
            console.log = originalLog;
        }
    };

    return (
        <ResizablePanelGroup orientation="vertical">
            {/* QUESTION SECTION */}
            <ResizablePanel defaultSize={40}>
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* HEADER */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            {selectedQuestion.title}
                                        </h2>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Choose your language and solve the problem
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">

                                    {/* QUESTION SELECT */}
                                    <Select value={selectedQuestion.id} onValueChange={handleQuestionChange}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select question" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {CODING_QUESTIONS.map((q) => (
                                                <SelectItem key={q.id} value={q.id}>
                                                    {q.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {/* LANGUAGE SELECT */}
                                    <Select value={language} onValueChange={handleLanguageChange}>
                                        <SelectTrigger className="w-[150px]">

                                            <SelectValue>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={`/${language}.png`}
                                                        alt={language}
                                                        className="w-5 h-5 object-contain"
                                                    />

                                                    {LANGUAGES.find((l) => l.id === language)?.name}
                                                </div>
                                            </SelectValue>
                                        </SelectTrigger>

                                        <SelectContent>
                                            {LANGUAGES.map((lang) => (
                                                <SelectItem key={lang.id} value={lang.id}>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={`/${lang.id}.png`}
                                                            alt={lang.name}
                                                            className="w-5 h-5 object-contain"
                                                        />

                                                        {lang.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {/* RUN BUTTON */}
                                    <Button onClick={runCode}>
                                        Run Code
                                    </Button>
                                </div>
                            </div>
                            {/* Question Descrption */}
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <BookIcon className="h-5 w-5 text-primary/80" />
                                    <CardTitle>Problem Description</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm leading-relaxed">
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <p className="whitespace-pre-line">{selectedQuestion.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Question Exampls */}
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                                    <CardTitle>Examples</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-full w-full rounded-md border">
                                        <div className="p-4 space-y-4">
                                            {selectedQuestion.examples.map((example, index) => (
                                                <div key={index} className="space-y-2">
                                                    <p className="font-medium text-sm">Example {index + 1}:</p>
                                                    <ScrollArea className="h-full w-full rounded-md">
                                                        <pre className="bg-muted/50 p-3 rounded-lg text-sm font-mono">
                                                            <div>Input: {example.input}</div>
                                                            <div>Output: {example.output}</div>
                                                            {example.explanation && (
                                                                <div className="pt-2 text-muted-foreground">
                                                                    Explanation: {example.explanation}
                                                                </div>
                                                            )}
                                                        </pre>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                </div>
                                            ))}
                                        </div>
                                        <ScrollBar />
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                            {/* Constrain */}
                            {selectedQuestion.constraints && (
                                <Card>
                                    <CardHeader className="flex flex-row items-center gap-2">
                                        <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                                        <CardTitle>Constraints</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground">
                                            {selectedQuestion.constraints.map((constraint, index) => (
                                                <li key={index} className="text-muted-foreground">
                                                    {constraint}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={60}>
                <div className="h-full flex flex-col">

                    {/* EDITOR */}
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 18,
                                lineNumbers: "on",
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                                wordWrap: "on",
                                wrappingIndent: "indent",
                            }}
                        />
                    </div>

                    {/* OUTPUT */}
                    <div className="h-40 border-t bg-black text-green-400 p-4 overflow-auto font-mono text-sm">
                        <p>{output}</p>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default CodeEditor 