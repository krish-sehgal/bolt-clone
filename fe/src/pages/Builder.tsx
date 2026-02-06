import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StepsList } from '../components/StepsList';
import { FileExplorer } from '../components/FileExplorer';
import { TabView } from '../components/TabView';
import { CodeEditor } from '../components/CodeEditor';
import { PreviewFrame } from '../components/PreviewFrame';
import { type Step, type FileItem, StepType } from '../types';
import axios from 'axios';
import { parseXml } from '../steps';
// import { FileNode } from '@webcontainer/api';
import { Loader } from '../components/Loader.jsx';
import { ArrowUp } from 'lucide-react';
import useWebContainer from '../hooks/useWebContainer';

export function Builder() {
    const location = useLocation();
    const { prompt } = location.state as { prompt: string };
    const [userPrompt, setPrompt] = useState("");
    const [llmMessages, setLlmMessages] = useState<{ role: "user" | "assistant", content: string; }[]>([]);
    const [loading, setLoading] = useState(false);
    const [templateSet, setTemplateSet] = useState(false);
    const webcontainer = useWebContainer();
    const [currentStep, setCurrentStep] = useState(1);
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
    const [steps, setSteps] = useState<Step[]>([]);
    const [files, setFiles] = useState<FileItem[]>([]);

    useEffect(() => {
        let originalFiles = [...files];
        let updateHappened = false;
        steps.filter(({ status }) => status === "pending").forEach(step => {
            updateHappened = true;
            if (step?.type === StepType.CreateFile) {
                let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
                let currentFileStructure = [...originalFiles]; // {}
                let finalAnswerRef = currentFileStructure;

                let currentFolder = ""
                while (parsedPath.length) {
                    currentFolder = `${currentFolder}/${parsedPath[0]}`;
                    let currentFolderName = parsedPath[0];
                    parsedPath = parsedPath.slice(1);

                    if (!parsedPath.length) {
                        // final file
                        let file = currentFileStructure.find(x => x.path === currentFolder)
                        if (!file) {
                            currentFileStructure.push({
                                name: currentFolderName,
                                type: 'file',
                                path: currentFolder,
                                content: step.code
                            })
                        } else {
                            file.content = step.code;
                        }
                    } else {
                        /// in a folder
                        let folder = currentFileStructure.find(x => x.path === currentFolder)
                        if (!folder) {
                            // create the folder
                            currentFileStructure.push({
                                name: currentFolderName,
                                type: 'folder',
                                path: currentFolder,
                                children: []
                            })
                        }

                        currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
                    }
                }
                originalFiles = finalAnswerRef;
            }
        })

        if (updateHappened) {

            setFiles(originalFiles)
            setSteps(steps => steps.map((s: Step) => {
                return {
                    ...s,
                    status: "completed"
                }

            }))
        }
    }, [steps, files]);

    useEffect(() => {
        const createMountStructure = (files: FileItem[]): Record<string, any> => {
            const mountStructure: Record<string, any> = {};

            const proccessFile = (file: FileItem, isRootFolder: boolean) => {

                if (file.type === 'folder') {
                    mountStructure[file.name] = {
                        directory: file.children ? Object.fromEntries(file.children.map(child => [child.name, proccessFile(child, false)])) : {}
                    };
                } else if (file.type === 'file') {
                    if (isRootFolder) {
                        mountStructure[file.name] = {
                            file: {
                                contents: file.content || ''
                            }
                        };
                    }
                    else {
                        return {
                            file: {
                                contents: file.content || ''
                            }
                        };
                    }
                }
                return mountStructure[file.name];
            };

            files.forEach(file => proccessFile(file, true));
            return mountStructure;
        };
        const mountStructure = createMountStructure(files);
        webcontainer?.mount(mountStructure)
        console.log('structure mounted');
    }, [files, webcontainer]);

    async function init() {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/template`, { prompt: prompt.trim() });
        if (!response.data.success) {
            console.error(`Error: ${response.data.message}`);
            return;
        }
        setTemplateSet(true);

        const { prompts, uiPrompts } = response.data;

        setSteps(parseXml(uiPrompts[0]).map((x: Step) => ({
            ...x,
            status: "pending"
        })));

        setLoading(true);
        const stepsResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
            messages: [...prompts, prompt].map(content => ({
                role: "user",
                content
            }))
        })

        setLoading(false);

        setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
            ...x,
            status: "pending" as "pending"
        }))]);

        setLlmMessages([...prompts, prompt].map(content => ({
            role: "user",
            content
        })));

        setLlmMessages(x => [...x, { role: "assistant", content: stepsResponse.data.response }]);
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-3">
                <h1 className="text-xl font-semibold text-gray-100">Website Builder</h1>
                <p className="text-sm text-gray-400 mt-1">Prompt: {prompt}</p>
            </header>

            <div className="flex-1 overflow-hidden">
                <div className="h-full grid grid-cols-4 p-4">
                    <div className=" space-y-6 overflow-auto">
                        <div>
                            <div className="max-h-[calc(100vh-180px)] overflow-y-scroll">
                                <StepsList
                                    steps={steps}
                                    currentStep={currentStep}
                                    onStepClick={setCurrentStep}
                                />
                            </div>
                            <div>
                                <div className='flex'>
                                    {!(loading || !templateSet) && <div className='relative w-full'>
                                        <textarea
                                            value={userPrompt}
                                            onChange={(e) => {
                                                setPrompt(e.target.value)
                                            }}
                                            className='pl-3 pr-5 py-2 w-full border border-gray-700 rounded-2xl text-white outline-none text-sm h-17 resize-none'
                                            placeholder='Discribe the modifications in your website'>
                                        </textarea>
                                        <button
                                            onClick={async () => {
                                                const newMessage = {
                                                    role: "user" as "user",
                                                    content: userPrompt
                                                };

                                                setLoading(true);
                                                const stepsResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
                                                    messages: [...llmMessages, newMessage]
                                                });
                                                setLoading(false);

                                                setLlmMessages(x => [...x, newMessage]);
                                                setLlmMessages(x => [...x, {
                                                    role: "assistant",
                                                    content: stepsResponse.data.response
                                                }]);

                                                setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
                                                    ...x,
                                                    status: "pending" as "pending"
                                                }))]);

                                            }}
                                            className='bg-purple-400 absolute bottom-4 right-3 w-7 h-7 rounded-2xl flex items-center justify-center text-sm text-white p-1 cursor-pointer'>
                                            {(loading || !templateSet) ? (<Loader />) : (<ArrowUp />)}
                                        </button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex bg-amber-400'>
                        <div className=" max-h-[80vh]">
                            <FileExplorer
                                files={files}
                                onFileSelect={setSelectedFile}
                            />
                        </div>
                        <div className="col-span-2 bg-gray-900 p-2 h-[calc(100vh-7.5rem)]">
                            <TabView activeTab={activeTab} onTabChange={setActiveTab} files={files} />
                            <div className="h-[calc(100%-2rem)]">
                                {activeTab === 'code' ? (
                                    <CodeEditor file={selectedFile} />
                                ) : (
                                    <PreviewFrame webContainer={webcontainer!} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}